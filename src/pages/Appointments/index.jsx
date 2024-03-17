import React, { useState, useEffect } from 'react';
import { Table, message, DatePicker, Tooltip, Popover, Select } from 'antd';
import api from 'components/api/api';
import moment from 'moment';
import './Appointments.css'
import { Modal, Button } from 'antd';
import { BookOutlined, CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, PlusOutlined, ScheduleOutlined, SelectOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AppointmentModal from '../../components/Modals/AppointmentModal';
import ScheduleModal from '../../components/Modals/ScheduleModal';
import { useAuth } from 'context/AuthContext';
import CryptoJS from 'crypto-js';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [professionals, setProfessionals] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [isModalAgendarVisible, setModalAgendarVisible] = useState(false);
    const { authData } = useAuth();
    const companyID = authData.companyID;
    const fetchAppointments = async (date, professionalId) => {
        if (!professionalId) {
            message.error("Por favor, selecione um profissional primeiro.");
            return;
        }
        setLoading(true);
        try {
            const formattedDate = date.format('DD/MM/YYYY');
            const response = await api.get('/agendamentos', {
                params: { data: formattedDate, professional_id: professionalId }
            });
            setAppointments(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar agendamentos", error);
            message.error("Erro ao buscar agendamentos");
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchProfessionals = async () => {
            if (companyID && authData.authToken) {

                try {
                    const response = await api.get(`/professionals?company_id=${companyID}`, {
                        headers: {
                            'Authorization': `Bearer ${authData.authToken}`
                        },
                    });

                    if (response.status !== 200) {
                        throw new Error('Falha ao buscar dados dos profissionais');
                    }
                    const secretKey = process.env.REACT_APP_SECRET_KEY;
                    const bytes = CryptoJS.AES.decrypt(response.data, secretKey);
                    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
              
                    setProfessionals(decryptedData);
                } catch (error) {
                    console.error('Error fetching professionals:', error);
                }
            } else {
                console.error('Company ID or auth token not found in local storage');
            }
   };
    fetchProfessionals();
}, [companyID, authData.authToken]);

    const handleProfessionalChange = (professionalId) => {
        setSelectedProfessional(professionalId);
        if (selectedDate) {
            fetchAppointments(selectedDate, professionalId);
        }
    };

    useEffect(() => {
        if (selectedProfessional && selectedDate) {
            fetchAppointments(selectedDate, selectedProfessional);
        }
    }, [selectedProfessional, selectedDate]);


    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (selectedProfessional) {
            fetchAppointments(date, selectedProfessional);
        }
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);

    const showModal = (appointment) => {
        setCurrentAppointment(appointment);
        setIsModalVisible(true);
    };


    const handleNoteClick = (appointment) => {
        setCurrentAppointment(appointment);
        setAdditionalInfo(appointment.infoadicional || "");
        setIsNoteModalVisible(true);
    };

    const handleSaveAdditionalInfo = async () => {
        if (!additionalInfo) {
            message.error('O campo de informações adicionais está vazio.');
            return;
        }

        try {
            const response = await api.put(`/agendamentos/${currentAppointment.id}`, {
                infoadicional: additionalInfo
            });

            if (response.data && response.data.success) {
                message.success('Informação adicional salva com sucesso!');
                fetchAppointments(selectedDate, selectedProfessional);
            } else {
                message.error('Erro ao salvar a informação adicional.');
            }
        } catch (error) {
            console.error("Erro ao salvar a informação adicional", error);
            message.error("Erro ao salvar a informação adicional");
        }
        setIsNoteModalVisible(false);
    };


    const closeNoteModal = () => {
        setIsNoteModalVisible(false);
        setAdditionalInfo("");
    };

    const sortByTime = (a, b) => {
        const timeA = moment(a.horario, 'HH:mm');
        const timeB = moment(b.horario, 'HH:mm');
        return timeA.isBefore(timeB) ? -1 : timeA.isAfter(timeB) ? 1 : 0;
    };


    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (text, record) => (
                <Popover
                    content={(
                        <div className='baloom'>
                            <div>
                                <Tooltip>
                                    <Button type="primary" style={{ marginRight: 8 }} onClick={() => showModal(record)}>Confirmar/Reagendar</Button>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip>
                                    <Link to={`/client-details/${record.id}`} style={{ marginRight: 8 }}>
                                        <Button type="primary" onClick={() => handleNoteClick(record)} ><BookOutlined />Sobre</Button>
                                    </Link>
                                </Tooltip>
                                <Tooltip title="Informações Adicionais">
                                    <Button type="link" icon={<BookOutlined />} onClick={() => handleNoteClick(record)} />
                                </Tooltip>
                            </div>
                        </div>
                    )}
                    trigger="hover"
                >
                    <span>{text}</span>
                </Popover>
            )
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => (
                <Tooltip title={status === null ? "Pendente" : status === 1 ? "Confirmado" : "Cancelado"}>
                    {status === null ? <ExclamationCircleOutlined style={{ color: "orange" }} /> :
                        status === 1 ? <CheckCircleOutlined style={{ color: "green" }} /> :
                            <CloseCircleOutlined style={{ color: "red" }} />}
                </Tooltip>
            )
        },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
        },
        {
            title: 'Horário',
            dataIndex: 'horario',
            key: 'horario',
        },
        {
            title: 'Convenio',
            dataIndex: 'planodental',
            key: 'planoDental',
        },
        {
            title: 'Contato',
            dataIndex: 'celular',
            key: 'celular',
        },
        {
            title: 'Motivo',
            dataIndex: 'motivo',
            key: 'motivo',
        },
    ];

    const updateAppointments = () => {
        fetchAppointments(selectedProfessional);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setCurrentAppointment(null);
        fetchAppointments(selectedDate, selectedProfessional);
    };


    return (
        <div className='tabela'>
            <h1>Agendamentos Por Tabela <ScheduleOutlined /></h1>
            <div className="">
                <Select
                    showSearch
                    style={{ width: '30%' }}
                    placeholder="Selecione um profissional"
                    optionFilterProp="children"
                    onChange={handleProfessionalChange}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().includes(input.toLowerCase())
                    }
                    value={selectedProfessional}
                >
                    {professionals.map(professional => (
                        <Select.Option key={professional.id} value={professional.id}>
                            {professional.nome}
                        </Select.Option>
                    ))}
                </Select>
                <h3>Selecione a data desejada.</h3>
                <DatePicker
                    onChange={handleDateChange}
                    value={selectedDate}
                    format="DD/MM/YYYY"
                />

            </div>
            <p>Passe o mouse em cima do nome do cliente para mais opções <SelectOutlined /></p>
            <Button style={{ marginBottom: '20px' }} type="primary" onClick={() => setModalAgendarVisible(true)}>
                <PlusOutlined /> Novo Agendamento
            </Button>
            <ScheduleModal
                isModalAgendaVisible={isModalAgendarVisible}
                handleCancel={() => setModalAgendarVisible(false)}
            />
            <Table columns={columns} dataSource={appointments.sort(sortByTime)} rowKey="id" loading={loading} />
            <AppointmentModal
                isModalVisible={isModalVisible}
                handleCancel={() => setIsModalVisible(false)}
                currentAppointment={currentAppointment}
                updateAppointments={updateAppointments}
                handleClose={handleCloseModal}
            />
            <Modal
                title="Informações Adicionais"
                open={isNoteModalVisible}
                onCancel={closeNoteModal}
                onOk={handleSaveAdditionalInfo}
                okText="Salvar"
                cancelText="Cancelar"
            >
                <textarea
                    value={additionalInfo}
                    onChange={e => setAdditionalInfo(e.target.value)}
                    style={{ width: "100%", height: "150px" }}
                    placeholder="Digite informações adicionais aqui..."
                />
            </Modal>

        </div>
    );

};

export default Appointments;

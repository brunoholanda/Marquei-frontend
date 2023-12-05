import React, { useState, useEffect } from 'react';
import { DatePicker, Button, Table, message, Modal, TimePicker, Select } from 'antd';
import api from 'components/api/api';
import moment from 'moment';
import { ControlOutlined, DeleteOutlined, EditOutlined, PlusCircleFilled, WarningFilled, WarningTwoTone } from '@ant-design/icons';
import 'moment/locale/pt-br';
import '../Appointments/Appointments.css';
import WeeklyModal from '../../components/Modals/WeeklyModal ';
import ScheduleLinkModal from 'components/Modals/ScheduleLinkModal';
const { Option } = Select;

const AdminSc = () => {
    moment.locale('pt-br');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [allDay, setAllDay] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [disabledDates, setDisabledDates] = useState([]);
    const [isWeeklyModalVisible, setIsWeeklyModalVisible] = useState(false);
    const [professionals, setProfessionals] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [isLinkModalVisible, setIsLinkModalVisible] = useState(false);
    const companyID = localStorage.getItem('companyID');

    useEffect(() => {
        const fetchProfessionals = async () => {
            const storedCompanyID = localStorage.getItem('companyID');
            const token = localStorage.getItem('authToken');

            if (storedCompanyID && token) {
                try {
                    const response = await api.get(`/professionals?company_id=${storedCompanyID}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });

                    if (response.status !== 200) {
                        throw new Error('Falha ao buscar dados dos profissionais');
                    }
                    setProfessionals(response.data);
                } catch (error) {
                    console.error('Error fetching professionals:', error);
                }
            } else {
                console.error('Company ID or auth token not found in local storage');
            }
        };
        fetchProfessionals();
    }, []);




    const [editingId, setEditingId] = useState(null);

    const handleEdit = (record) => {
        setSelectedDate(moment(record.date, 'DD/MM/YYYY'));
        setAllDay(record.allDay);
        setStartTime(record.startTime ? moment(record.startTime, 'HH:mm') : null);
        setEndTime(record.endTime ? moment(record.endTime, 'HH:mm') : null);
        setEditingId(record.id);
        setIsModalVisible(true);
    };

    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const showDeleteConfirmation = (id) => {
        setIdToDelete(id);
        setConfirmDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        setConfirmDeleteModalVisible(false);
        if (idToDelete) {
            try {
                await api.delete(`/disabledDates/${idToDelete}`);
                setDisabledDates(prevDates => prevDates.filter(dateObj => dateObj.id !== idToDelete));
                message.success('Data excluída com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir data', error);
                message.error('Erro ao excluir data. Tente novamente.');
            }
        }
        setIdToDelete(null);
        setSelectedDate(null);
        setAllDay(false);
        setStartTime(null);
        setEndTime(null);
    };

    const handleDelete = (id) => {
        showDeleteConfirmation(id);
    };


    const columns = [
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date',
            render: (text, record) => moment(record.date, 'DD/MM/YYYY').format('DD [de] MMMM YYYY')
        },
        {
            title: 'Dia da Semana',
            dataIndex: 'weekday',
            key: 'weekday',
            render: (text, record) => moment(record.date, 'DD/MM/YYYY').format('dddd')
        },
        {
            title: 'Intervalo de Tempo',
            dataIndex: 'time',
            key: 'time',
            render: (text, record) => {
                if (record.allday) {
                    return "Todo o dia";
                }
                if (record.starttime && record.endtime) {
                    return `${record.starttime.slice(0, 5)} - ${record.endtime.slice(0, 5)}`; // .slice(0, 5) para pegar apenas HH:mm e não mostrar os segundos
                }
                return "Não especificado";
            }
        }
        ,
        {
            title: 'Ações',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        type="primary"
                        title="Editar horário"
                        style={{ marginLeft: '10px' }}
                    >
                        Editar
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                        type="primary"
                        title="Excluir"
                        style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
                    >Excluir
                    </Button>
                </>
            )
        }

    ];

    const showModal = () => {
        setIsModalVisible(true);
        setEditingId(null);
        setSelectedDate(null);
    };

    const handleOk = () => {
        handleSave();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingId(null);

    };

    const shouldDisableOkButton = () => {
        return !selectedDate || (!allDay && (!startTime || !endTime));
    };

    const handleAllDayChange = (checked) => {
        setAllDay(checked);
        if (checked) {
            setStartTime(null);
            setEndTime(null);
        }
    };

    const showWeeklyModal = () => {
        setIsWeeklyModalVisible(true);
    };

    useEffect(() => {
        const fetchDisabledDates = async () => {
            if (selectedProfessional) {
                try {
                    const response = await api.get(`/disabledDates?professional_id=${selectedProfessional}`);
                    setDisabledDates(response.data);
                } catch (error) {
                    console.error('Erro ao buscar datas desabilitadas', error);
                }
            }
        };

        fetchDisabledDates();
    }, [selectedProfessional]);

    const handleSave = async () => {
        if (selectedDate && selectedProfessional) {
            try {
                const isTimeIntervalProvided = startTime || endTime;

                const payload = {
                    date: selectedDate.format('DD/MM/YYYY'),
                    allDay: isTimeIntervalProvided ? false : allDay,
                    startTime: startTime ? startTime.format('HH:mm') : null,
                    endTime: endTime ? endTime.format('HH:mm') : null,
                    professional_id: selectedProfessional
                };

                let responseData;

                if (editingId) {
                    responseData = await api.put(`/disabledDates/${editingId}`, payload);
                    message.success('Data atualizada com sucesso!');
                } else {
                    responseData = await api.post('/disabledDates', payload);
                    message.success('Data salva com sucesso!');
                }

                setSelectedDate(null);
                setAllDay(false);
                setStartTime(null);
                setEndTime(null);
                setEditingId(null);

            } catch (error) {
                console.error('Erro ao salvar data', error);
                message.error('Erro ao salvar data. Tente novamente.');
            }
        } else {
            message.warning('Selecione um profissional e uma data para prosseguir.');
        }
    };
    return (
        <div className='desabilitar'>
            <h1>Controle da Agenda <ControlOutlined /></h1>
            <p>Aqui você inclui datas ou horários em que não poderá atender seus clientes. <WarningFilled /></p>
            <Select
                showSearch
                style={{ width: 200, marginBottom: 20, marginRight: 20 }}
                placeholder="Selecione um profissional"
                optionFilterProp="children"
                onChange={(value) => setSelectedProfessional(value)}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={selectedProfessional}
            >
                {professionals.map((professional) => (
                    <Option key={professional.id} value={professional.id}>
                        {professional.nome}
                    </Option>
                ))}
            </Select>
            <Button
                type="primary"
                onClick={showWeeklyModal}
                disabled={!selectedProfessional}
            >
                Padrão Semanal
            </Button>

            <Modal
                title="Desabilitar Data ou Horário"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: shouldDisableOkButton() }}
            >
                <p>Ao executar essa ação os seus clientes não conseguirão agendar na data ou horários selecionados <WarningTwoTone twoToneColor="#ff0000" /></p>
                <DatePicker
                    format="DD/MM/YYYY"
                    value={selectedDate}
                    onChange={setSelectedDate}
                    disabled={!!editingId}
                />
                <div>
                    <input type="checkbox" checked={allDay} onChange={e => handleAllDayChange(e.target.checked)} /> Todos os horários.
                </div>
                <p>Escolha Hora Inicial 00:00 para intervalos no inicio do dia <WarningTwoTone twoToneColor="#ff0000" /></p>

                {!allDay && (
                    <div>
                        <TimePicker format="HH:mm" onChange={setStartTime} placeholder="Hora Inicial" />
                        <TimePicker format="HH:mm" onChange={setEndTime} placeholder="Hora Final" />
                    </div>
                )}
            </Modal>
            <Modal
                title="Vai disponibilizar este dia/horário?"
                visible={confirmDeleteModalVisible}
                onOk={confirmDelete}
                onCancel={() => setConfirmDeleteModalVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setConfirmDeleteModalVisible(false)}>
                        Não
                    </Button>,
                    <Button key="submit" type="primary" onClick={confirmDelete}>
                        Sim
                    </Button>
                ]}
            >
                <p>Ao executar esta ação o horário selecionado ficará disponível para os seus clientes, tem certeza que deseja prosseguir? </p>
            </Modal>
            <WeeklyModal
                isVisible={isWeeklyModalVisible}
                setIsVisible={setIsWeeklyModalVisible}
                selectedProfessional={selectedProfessional}
            />
            <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h2 style={{ marginRight: '20px' }} >Datas ou Horário Desabilitadas</h2>
                    <Button type="primary" onClick={showModal} style={{ marginRight: '10px' }}>
                        <PlusCircleFilled />
                        Incluir
                    </Button>
                </div>
                <p>Feriados locais precisam ser incluídos manualmente <WarningTwoTone twoToneColor="#ff0000" /></p>
                <Button style={{ marginBottom: '20px' }} type="primary" onClick={() => setIsLinkModalVisible(true)}>
                    Gerar Link de Agendamento
                </Button>
                {isLinkModalVisible && (
                    <ScheduleLinkModal
                        isLinkModalVisible={isLinkModalVisible}
                        onLinkModalClose={() => setIsLinkModalVisible(false)}
                        companyID={companyID}
                    />
                )}
                <Table dataSource={disabledDates} columns={columns} rowKey="id" />
            </div>
        </div>
    );
}

export default AdminSc;
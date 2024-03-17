import React, { useState, useEffect } from 'react';
import { DatePicker, Button, Table, message, Modal, TimePicker, Select } from 'antd';
import api from 'components/api/api';
import moment from 'moment';
import { ControlOutlined, DeleteOutlined, EditOutlined, LinkOutlined, PlusCircleFilled, WarningFilled, WarningTwoTone } from '@ant-design/icons';
import 'moment/locale/pt-br';
import '../Configs.css'
import WeeklyModal from '../../../components/Modals/WeeklyModal ';
import ScheduleLinkModal from 'components/Modals/ScheduleLinkModal';
import ReactJoyride from 'react-joyride';
import './ControleAgenda.module.css';
import { useAuth } from 'context/AuthContext';
import CryptoJS from 'crypto-js';

const { Option } = Select;

const ControleAgenda = () => {
    moment.locale('pt-br');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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
    const { authData } = useAuth();
    const companyID = authData.companyID;
    const [runTutorial, setRunTutorial] = useState();

    const [steps, setSteps] = useState([
        {
            target: '.select-professional',
            content: 'Primeiro, selecione um profissional da lista.',
        },
        {
            target: '.weekly-pattern-button',
            content: 'Agora, clique aqui para definir o padrão semanal de horários.',
        },
        {
            target: '.generate-link-button',
            content: 'Por fim, clique aqui para gerar um link de agendamento para os clientes, compartilhe o link nas suas redes sociais.',
        }
    ]);

    const customLocale = {
        next: 'Próximo ➡️',
        last: 'Blz 😊',
        skip: 'Fazer depois 😞',
        close: 'Close',
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

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        if (status === 'finished' || status === 'skipped') {
            setRunTutorial(false);
        }
    };

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
        ...(!isMobile ? [{
            title: 'Dia da Semana',
            dataIndex: 'weekday',
            key: 'weekday',
            render: (text, record) => moment(record.date, 'DD/MM/YYYY').format('dddd')
        }] : []),
        {
            title: isMobile ? 'Intervalo' : 'Intervalo de Tempo',
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
                        {isMobile ? '' : 'Editar'}
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                        type="primary"
                        danger
                        title="Excluir"
                        style={{ marginLeft: '10px' }}
                    >
                        {isMobile ? '' : 'Excluir'}
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

    useEffect(() => {
        if (!localStorage.getItem('tutorialShown')) {
            setRunTutorial(true);
            localStorage.setItem('tutorialShown', 'true');
        }
    }, []);

    return (
        <div>

            <h1>Controle da Agenda <ControlOutlined /></h1>
            <p>Aqui você inclui seu padrão de atendiemnto semanal que ficará disponivel no link de agendamento.<WarningFilled /></p>
            <div className='padrao-semanal-mobile'>
                <Select
                    className="select-professional"
                    showSearch
                    style={{ width: 200, marginBottom: 20, marginRight: 20, display: 'flex', flexWrap: 'wrap' }}
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
                    className="weekly-pattern-button"
                    type="primary"
                    onClick={showWeeklyModal}
                    disabled={!selectedProfessional}
                >
                    Padrão Semanal
                </Button>
            </div>
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
            <div className='datadesabilitados'>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <h2 style={{ marginRight: '18px', fontSize: '18px' }} >Datas ou Horário Desabilitadas</h2>
                    <Button type="primary" onClick={showModal} style={{ marginRight: '10px' }}>
                        <PlusCircleFilled />
                        Incluir
                    </Button>
                </div>
                <p>Feriados locais precisam ser incluídos manualmente <WarningTwoTone twoToneColor="#ff0000" /></p>
                <Button className="generate-link-button" style={{ marginBottom: '20px' }} type="primary" onClick={() => setIsLinkModalVisible(true)}>
                    <LinkOutlined /> Gerar Link de Agendamento
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
            <ReactJoyride
                run={runTutorial}
                steps={steps}
                callback={handleJoyrideCallback}
                continuous={true}
                showProgress={true}
                locale={customLocale}
                showSkipButton={true}
                styles={{ options: { zIndex: 10000 } }}
            />
        </div>
    );
}

export default ControleAgenda;
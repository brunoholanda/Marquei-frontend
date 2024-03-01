import React, { useEffect, useRef, useState } from 'react';
import api from 'components/api/api';
import CalendarView from './CalendarView';
import moment from 'moment';
import './calendar.css'
import { CalendarOutlined, WarningFilled } from '@ant-design/icons';
import AppointmentModal from '../../components/Modals/AppointmentModal';
import { Select, message } from 'antd';
import { io } from 'socket.io-client';

const CalendarPage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [professionals, setProfessionals] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAppointmentClick = (appointment) => {
        setCurrentAppointment(appointment);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setCurrentAppointment(null);
        updateAppointments();

    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);


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


    const fetchAppointments = async (professionalId) => {
        if (!professionalId) {
            message.error("Por favor, selecione um profissional primeiro.");
            return;
        }
        setLoading(true);
        try {
            const response = await api.get('/todos-agendamentos', {
                params: { professional_id: professionalId }
            });

            const events = response.data.map(appointment => {
                const startDate = moment(appointment.data + ' ' + appointment.horario, 'DD/MM/YYYY HH:mm').toDate();
                const endDate = appointment.end_time
                ? moment(appointment.data + ' ' + appointment.end_time, 'DD/MM/YYYY HH:mm').toDate()
                : moment(startDate).add(1, 'hours').toDate(); // Fallback para 1 hora depois se não houver end_time
                
                return {
                    title: `${appointment.nome}`,
                    start: startDate,
                    end: endDate,
                    allDay: false,
                    nome: appointment.nome,
                    celular: appointment.celular,
                    data: appointment.data,
                    horario: appointment.horario,
                    planodental: appointment.planodental,
                    id: appointment.id,
                    status: appointment.status
                };
            });

            setAppointments(events);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar agendamentos", error);
            message.error("Erro ao buscar agendamentos");
            setLoading(false);
        }
    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        let backgroundColor = '#FFD700	';
        if (event.status === 2) {
            backgroundColor = '#ef4d27	';
        } else if (event.status === 1) {
            backgroundColor = '#34ab6e	';
        }

        const style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            fontSize: '1px',
            color: 'black',
            border: '5px',
            display: 'block'
        };

        return {
            style: style
        };
    };



    useEffect(() => {
        if (selectedProfessional) {
            fetchAppointments(selectedProfessional);
        }
    }, [selectedProfessional]);



    const handleProfessionalChange = (professionalId) => {
        console.log("Profissional selecionado:", professionalId);
        setSelectedProfessional(professionalId);
        fetchAppointments(professionalId);
    };



    const updateAppointments = () => {
        if (selectedProfessional) {
            fetchAppointments(selectedProfessional);
        } else {
            console.error("Nenhum profissional selecionado ao tentar atualizar agendamentos.");
        }
    };

    const selectedProfessionalRef = useRef(selectedProfessional);
    selectedProfessionalRef.current = selectedProfessional;

    useEffect(() => {
        const socket = io('wss://marquei.com.br', {
            path: "/socket.io",
            transports: ['websocket'],
            secure: true,
        });
    
        socket.on('connect', () => {
            console.log("Conectado ao WebSocket");
            socket.emit('join', 'calendar');
        });
    
        socket.on('connect_error', (error) => {
            console.error('Connection Error:', error);
        });
    
        socket.on('newAppointment', (data) => {
            console.log("Novo agendamento recebido:", data);
    
            // Sempre atualize os agendamentos quando receber uma nova notificação
            // Isso assume que você deseja atualizar a lista completa de agendamentos
            // para o profissional atualmente selecionado, ou realizar outra ação relevante.
            if (selectedProfessional) {
                console.log("Atualizando agendamentos para o profissional atual.");
                fetchAppointments(selectedProfessionalRef.current);
            } else {
                console.log("Nenhum profissional selecionado. Considerar mostrar notificação ou atualizar toda a lista.");
            }
        });
    
        return () => {
            socket.disconnect();
        };
    
    }, [selectedProfessional]); // Dependendo de selectedProfessional para recarregar a lista quando muda
    

    useEffect(() => {
        selectedProfessionalRef.current = selectedProfessional;
      }, [selectedProfessional]);
      

    useEffect(() => {
        if (selectedProfessional) {
            fetchAppointments(selectedProfessional);
        }
    }, [selectedProfessional]);


    return (
        <div className='calendario'>
            {isMobile && (
                <div className='mobileAlert'>
                    Tenha acesso a mais recursos utilizando a versão para computador 🖥️
                </div>
            )}
            <h1>Visualização por Calendário <CalendarOutlined /></h1>
            <div className="status-indicators">
                <div class="indicator">
                    <div class="square yellow"></div>
                    <span>A confirmar</span>
                </div>
                <div class="indicator">
                    <div class="square red"></div>
                    <span>Cancelado</span>
                </div>
                <div class="indicator">
                    <div class="square green"></div>
                    <span>Confirmado</span>
                </div>
            </div>
            <Select
                showSearch
                style={{ width: '200px' }}
                placeholder="Selecione um profissional"
                onChange={handleProfessionalChange}
                value={selectedProfessional}
                className='calendario-profissional'
            >
                {professionals.map(professional => (
                    <Select.Option key={professional.id} value={professional.id}>
                        {professional.nome}
                    </Select.Option>
                ))}
            </Select>
            <p>Selecione como deseja ver o calendário <WarningFilled /></p>
            <CalendarView
                events={appointments}
                onEventClick={handleAppointmentClick}
                eventPropGetter={eventStyleGetter}
            />
            <AppointmentModal
                isModalVisible={isModalVisible}
                handleCancel={() => setIsModalVisible(false)}
                currentAppointment={currentAppointment}
                updateAppointments={updateAppointments}
                handleClose={handleCloseModal}
            />
        </div>
    );
}

export default CalendarPage;

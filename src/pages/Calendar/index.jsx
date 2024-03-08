import React, { useEffect, useRef, useState } from 'react';
import api from 'components/api/api';
import CalendarView from './CalendarView';
import moment from 'moment';
import './calendar.css'
import { CalendarOutlined, WarningFilled } from '@ant-design/icons';
import AppointmentModal from '../../components/Modals/AppointmentModal';
import { Select, message } from 'antd';
import { io } from 'socket.io-client';
import { useAuth } from 'context/AuthContext';
import CryptoJS from 'crypto-js';

const CalendarPage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [professionals, setProfessionals] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [loading, setLoading] = useState(false);
    const { authData, logout } = useAuth(); // Agora também acessa a função logout
    const companyID = authData.companyID;
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

                    if (decryptedData.length === 1) {
                        const singleProfessionalId = decryptedData[0].id;
                        setSelectedProfessional(singleProfessionalId);
                    }

                } catch (error) {
                    console.error('Error fetching professionals:', error);
                    if (error.response && error.response.status === 401) {
                        logout(); // Chama a função de logout em caso de token inválido
                    }
                }
            } else {
                console.error('Company ID or auth token not found in local storage');
            }
        };
        fetchProfessionals();
    }, [companyID, authData.authToken, logout]);


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
                : moment(startDate).add(1, 'hours').toDate();
                
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
            socket.emit('join', 'calendar');
        });
    
        socket.on('connect_error', (error) => {
            console.error('Connection Error:', error);
        });
    
        socket.on('newAppointment', (data) => {
    
            if (selectedProfessional) {
                fetchAppointments(selectedProfessionalRef.current);
            } else {
            }
        });
    
        return () => {
            socket.disconnect();
        };
    
    }, [selectedProfessional]);
    

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

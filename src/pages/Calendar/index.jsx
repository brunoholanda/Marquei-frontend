import React, { useEffect, useState } from 'react';
import api from 'components/api/api';
import CalendarView from './CalendarView';
import moment from 'moment';
import './calendar.css'
import { CalendarOutlined, WarningFilled } from '@ant-design/icons';
import AppointmentModal from '../../components/Modals/AppointmentModal';
import { Select, message } from 'antd';

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
                const endDate = moment(startDate).add(1, 'hours').toDate();

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
        fetchAppointments(selectedProfessional);
    };


    return (
        <div className='calendario'>
            {isMobile && (
                <div className='mobileAlert'>
                    Tenha acesso a mais recursos acessando a versão para computador 🖥️
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
            <p>Selecione como deseja ver o calendario <WarningFilled /></p>
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

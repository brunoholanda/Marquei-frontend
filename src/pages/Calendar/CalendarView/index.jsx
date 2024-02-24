import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../calendar.css';
import { Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import ScheduleModal from 'components/Modals/ScheduleModal';


moment.updateLocale('pt-br', {
    longDateFormat: {
        LT: 'HH:mm ', // Formato de 24 horas
        LTS: 'HH:mm:ss',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY HH:mm',
        LLLL: 'dddd, MMMM D, YYYY HH:mm'
    }
});

const localizer = momentLocalizer(moment)

const Event = ({ event, onEventClick }) => (
    <Tooltip
        title={<CustomTooltip appointment={event} onConfirm={() => onEventClick(event)} />}
        placement="top"
    >
        <span>{event.title}</span>
    </Tooltip>
);

const CustomTooltip = ({ appointment, onConfirm }) => {
    return (
        <div className="custom-tooltip">
            <p>{appointment.nome}</p>
            <Button type='primary' onClick={() => onConfirm()}>Confirmar/Reagendar</Button>
            <Link to={`/client-details/${appointment.id}`}>
                <Button type='primary'>Sobre o Paciente</Button>
            </Link>
        </div>
    );
};


const CalendarView = ({ events, onEventClick }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const [view, setView] = useState(isMobile ? 'day' : 'work_week');
    const [isModalAgendarVisible, setModalAgendarVisible] = useState(false);

    const showWorkWeek = () => setView('work_week');
    const showFullWeek = () => setView('week');
    const showToday = () => setView('day');
    const [timeRange, setTimeRange] = useState({ min: 7, max: 22 }); // Horários padrão

    const setFullDay = () => {
        console.log("Configurando para Dia Inteiro");
        setTimeRange({ min: 0, max: 23 });
    };
    const setDefaultTime = () => setTimeRange({ min: 7, max: 22 });

    const handleSelectEvent = (event) => {
        onEventClick(event);
    };

    const minTime = new Date();
    minTime.setHours(timeRange.min, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(timeRange.max, 0, 0);


    const eventStyleGetter = (event, start, end, isSelected) => {
        let backgroundColor = '#FFD700	';
        if (event.status === 2) {
            backgroundColor = '#ef4d27		';
        } else if (event.status === 1) {
            backgroundColor = '#34ab6e	';
        }

        const style = {
            backgroundColor: backgroundColor,
            borderRadius: '6px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };

        return {
            style: style
        };
    };

    const CustomHeader = ({ label }) => (
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
            {label}
        </div>
    );


    let allViews = ['week', 'work_week', 'day'];


    useEffect(() => {
        function handleResize() {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setView('day'); 
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div style={{ height: 1300 }}>
            <div className="calendar-controls">
                {isMobile ? (
                    <Button
                        type={view === 'day' ? 'primary' : 'default'}
                        onClick={() => setView('day')}
                    >
                        Dias
                    </Button>
                ) : (
                    <>
                        <Button
                            type={view === 'work_week' ? 'primary' : 'default'}
                            onClick={showWorkWeek}
                        >
                            Dias Úteis
                        </Button>
                        <Button
                            type={view === 'week' ? 'primary' : 'default'}
                            onClick={showFullWeek}
                        >
                            Semana Inteira
                        </Button>
                        <Button
                            type={view === 'day' ? 'primary' : 'default'}
                            onClick={showToday}
                        >
                            Dia Atual
                        </Button>
                    </>
                )}
            </div>
            <div className="calendar-controls">
                <Button
                    type={timeRange.min === 7 && timeRange.max === 22 ? 'primary' : 'default'}
                    onClick={setDefaultTime}
                >
                    Das 07:00 às 20:00
                </Button>
                <Button
                    type={timeRange.min === 0 && timeRange.max === 23 ? 'primary' : 'default'}
                    onClick={setFullDay}
                >
                    Dia Inteiro
                </Button>
            </div>
            <div className="calendar-controls">
                <Button type="primary" onClick={() => setModalAgendarVisible(true)}>
                    <PlusOutlined /> Novo Agendamento
                </Button>
                <ScheduleModal
                    isModalAgendaVisible={isModalAgendarVisible}
                    handleCancel={() => setModalAgendarVisible(false)}
                />
            </div>


            <Calendar
                localizer={localizer}
                events={events}
                onSelectEvent={handleSelectEvent}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter}
                defaultDate={moment().toDate()}
                view={view}
                views={isMobile ? ['day'] : ['day', 'work_week', 'week']} // Configura as vistas disponíveis com base no dispositivo
                components={{
                    header: CustomHeader,
                    event: ({ event }) => (
                        <Event event={event} onEventClick={onEventClick} />
                    ),
                }}
                min={minTime} // Horário de início do calendário
                max={maxTime} // Horário de encerramento do calendário
                timeslots={1} // Intervalo de tempo para cada slot
                step={60} // Intervalo entre os slots
                timeGutterFormat={{ format: 'HH:mm' }} // Formato da coluna de tempo
                messages={{
                    next: "Próximo",
                    previous: "Anterior",
                    today: "Hoje",
                    month: "Mês",
                    week: "Semana",
                    work_week: "Semana de Trabalho",
                    day: "Dia",
                    agenda: "Agenda",
                    date: "Data",
                    time: "Hora",
                    event: "Evento",
                  }}
            />
        </div>
    );
}

export default CalendarView;

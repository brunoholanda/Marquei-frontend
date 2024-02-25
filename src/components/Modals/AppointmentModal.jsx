import React, { useEffect, useState } from 'react';
import { Modal, Button, DatePicker, TimePicker, message, notification } from 'antd';
import api from 'components/api/api'; 

const AppointmentModal = ({
    isModalVisible,
    setIsModalVisible,
    currentAppointment,
    handleClose,
}) => {
    const [rescheduleDate, setRescheduleDate] = useState(null);
    const [rescheduleTime, setRescheduleTime] = useState(null);
    const [isRescheduling, setIsRescheduling] = useState(false);
    const [nomeConsultorio, setNomeConsultorio] = useState('');


    const resetModal = () => {
        setIsRescheduling(false);
        setRescheduleDate(null);
        setRescheduleTime(null);
    };

    const handleConfirm = async () => {
        try {
            const response = await api.put(`/agendamentos/${currentAppointment.id}`, { status: 1 });
            if (response.data && response.data.success) {
                message.success('Agendamento confirmado com sucesso!');

            } else {
                message.error('Erro ao confirmar o agendamento.');
            }
        } catch (error) {
            console.error("Erro ao confirmar o agendamento", error);
            message.error("Erro ao confirmar o agendamento");
        }

        handleClose();
    };

    const handleCancelAppointment = async () => {
        try {
            const response = await api.put(`/agendamentos/${currentAppointment.id}`, {
                status: 2
            });

            if (response.data && response.data.success) {
                message.success('Agendamento cancelado com sucesso!');
            } else {
                message.error('Erro ao cancelar o agendamento.');
            }
        } catch (error) {
            console.error("Erro ao cancelar o agendamento", error);
            message.error("Erro ao cancelar o agendamento");
        }

        handleClose();
    };

    const handleReschedule = () => {
        setIsRescheduling(true);
    };

    const submitReschedule = async () => {
        if (!rescheduleDate || !rescheduleTime) {
            message.error("Por favor, selecione a data e horário para reagendar.");
            return;
        }
        try {
            const response = await api.put(`/agendamentos/${currentAppointment.id}`, {
                data: rescheduleDate.format('DD/MM/YYYY'),
                horario: rescheduleTime.format('HH:mm')
            });

            if (response.data && response.data.success) {
                message.success('Agendamento reagendado com sucesso!');
                resetModal();
            } else {
                message.error('Erro ao reagendar.');
            }
        } catch (error) {
            console.error("Erro ao reagendar", error);
            message.error("Erro ao reagendar");
        }
        handleClose();
    };

    const showNotification = (type, message) => {
        notification[type]({
            message: message,
        });
    };

    useEffect(() => {
        const fetchNomeConsultorio = async () => {
            const companyID = localStorage.getItem('companyID');
            if (companyID) {
                try {
                    const response = await api.get(`/companies/${companyID}`);
                    setNomeConsultorio(response.data.nome);
                } catch (error) {
                    console.error('Erro ao buscar nome do consultório:', error);
                    showNotification('error', 'Erro ao buscar nome do consultório.');
                }
            }
        };

        fetchNomeConsultorio();
    }, []);

    return (
        <Modal
            title="O que você gostaria de fazer com este agendamento?"
            visible={isModalVisible}
            onCancel={handleClose}
            footer={[
                isRescheduling ? null : (
                    <Button
                        key="cancelAppointment"
                        className="button-red modal-btn"
                        onClick={handleCancelAppointment}>
                        Cancelar Agendamento
                    </Button>
                ),
                isRescheduling ? null : (
                    <Button
                        key="reschedule"
                        className="button-orange modal-btn"
                        onClick={handleReschedule}>
                        Reagendar
                    </Button>
                ),
                isRescheduling ? (
                    <Button
                        key="submitReschedule"
                        type="primary"
                        onClick={submitReschedule}>
                        Salvar Reagendamento
                    </Button>
                ) : (
                    <Button
                        key="submit"
                        type="primary"
                        className="button-green modal-btn"
                        onClick={handleConfirm}>
                        Confirmar
                    </Button>
                ),
            ]}
        >
            {isRescheduling ? (
                <div>
                    <DatePicker
                        format="DD/MM/YYYY"
                        value={rescheduleDate}
                        onChange={setRescheduleDate}
                    />
                    <TimePicker
                        format="HH:mm"
                        value={rescheduleTime}
                        onChange={setRescheduleTime}
                        minuteStep={15}
                    />
                </div>
            ) : (
                currentAppointment && (
                    <div className='modalConfirm'>
                        <p>
                            <b>Nome:</b> {currentAppointment.nome}<br />
                            <b>Telefone:</b> {currentAppointment.celular}<br />
                            <b>Data:</b> {currentAppointment.data}<br />
                            <b>Horário:</b> {currentAppointment.horario}<br />
                            <b>Plano:</b> {currentAppointment.planodental}
                        </p>
                        <Button
                            key="whatsapp"
                            className="button-whats modal-btn"
                            onClick={() => {
                                const message = `Oi, sou do consultório ${nomeConsultorio} e estou falando aqui para saber se você deseja confirmar sua consulta agendada para ${currentAppointment.data} às ${currentAppointment.horario}?`;
                                const phoneNumber = currentAppointment.celular.replace(/[^0-9]/g, "");
                                window.open(`https://api.whatsapp.com/send?phone=+55${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
                            }}>
                            Enviar WhatsApp
                        </Button>
                    </div>
                )
            )}
        </Modal>
    );
}

export default AppointmentModal;

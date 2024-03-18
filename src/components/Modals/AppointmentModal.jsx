import React, { useEffect, useState } from 'react';
import { Modal, Button, DatePicker, TimePicker, message, notification } from 'antd';
import api from 'components/api/api';
import { DividerLine, StyledButtonsAgendamento, StyledContainerReagendar, StyledFooterAgendamento, StyledModalContent } from './Styles';
import { DeleteOutlined } from '@ant-design/icons';
import { useAuth } from 'context/AuthContext';

const AppointmentModal = ({
    isModalVisible,
    setIsModalVisible,
    currentAppointment,
    handleClose,
}) => {
    const [rescheduleDate, setRescheduleDate] = useState(null);
    const [rescheduleTime, setRescheduleTime] = useState(null);
    const [nomeConsultorio, setNomeConsultorio] = useState('');
    const [isDeleteConfirmModalVisible, setIsDeleteConfirmModalVisible] = useState(false);
    const [isRescheduleModalVisible, setIsRescheduleModalVisible] = useState(false);
    const { authData } = useAuth();
    const companyID = authData.companyID;
    const showDeleteConfirmModal = () => {
        setIsDeleteConfirmModalVisible(true);
    };

    const handleReschedule = () => {
        setIsRescheduleModalVisible(true);
    };

    const closeDeleteConfirmModal = () => {
        setIsDeleteConfirmModalVisible(false);
    };

    const handleDeleteAppointment = async () => {
        try {
            const response = await api.delete(`/agendamentos/${currentAppointment.id}`);
            if (response.data && response.data.success) {
                notification.success({ message: 'Agendamento excluído com sucesso!' });

                closeDeleteConfirmModal();
                handleClose();
            } else {
                message.error('Erro ao excluir o agendamento.');
            }
        } catch (error) {
            console.error("Erro ao excluir o agendamento", error);
            message.error("Erro ao excluir o agendamento");
        }
    };

    const resetModal = () => {
        setIsRescheduleModalVisible(null);
        setRescheduleDate(null);
        setRescheduleTime(null);
    };

    const handleConfirm = async () => {
        try {
            const response = await api.put(`/agendamentos/${currentAppointment.id}`, { status: 1 });
            if (response.data && response.data.success) {
                notification.success({ message: 'Agendamento confirmado com sucesso!' });
            } else {
                notification.error({ message: 'Erro ao confirmar o agendamento.' });
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
                notification.success({ message: 'Agendamento cancelado com sucesso!' });
            } else {
                message.error('Erro ao cancelar o agendamento.');
            }
        } catch (error) {
            console.error("Erro ao cancelar o agendamento", error);
            message.error("Erro ao cancelar o agendamento");
        }

        handleClose();
    };

    const submitReschedule = async () => {
        if (!rescheduleDate || !rescheduleTime) {
            notification.error({ message: 'Por favor, selecione a data e horário para reagendar.' });
            return;
        }
        try {
            const response = await api.put(`/agendamentos/${currentAppointment.id}`, {
                data: rescheduleDate.format('DD/MM/YYYY'),
                horario: rescheduleTime.format('HH:mm')
            });

            if (response.data && response.data.success) {
                notification.success({ message: 'Agendamento reagendado com sucesso!' });
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
    }, [companyID]);

    return (
        <>
            <Modal
                title="O que você gostaria de fazer com este agendamento?"
                open={isModalVisible}
                onCancel={handleClose}
                footer={[
                    <StyledFooterAgendamento>
                        <Button
                            key="reschedule"
                            className="button-orange modal-btn"
                            onClick={handleReschedule}>
                            Reagendar
                        </Button>

                        <Button
                            key="submit"
                            type="primary"
                            className="button-green modal-btn"
                            onClick={handleConfirm}>
                            Confirmar
                        </Button>
                        <Button
                            key="cancelAppointment"
                            className="button-red modal-btn"
                            onClick={handleCancelAppointment}>
                            Cancelar Agendamento
                        </Button>
                    </StyledFooterAgendamento>
                ]}
            >
                {currentAppointment && (
                    <StyledModalContent>
                        <p>
                            <b>Nome:</b> {currentAppointment.nome}<br />
                            <b>Telefone:</b> {currentAppointment.celular}<br />
                            <b>Data:</b> {currentAppointment.data}<br />
                            <b>Horário:</b> {currentAppointment.horario}<br />
                            <b>Plano:</b> {currentAppointment.planodental}
                        </p>
                        {/*   <Button key="delete" title="Excluir agendamento" className="button-red modal-btn" onClick={showDeleteConfirmModal}>
                            <DeleteOutlined />
                        </Button>*/}
                    </StyledModalContent>
                )}
                <StyledButtonsAgendamento>
                    {currentAppointment && (
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
                    )}
                </StyledButtonsAgendamento>
            </Modal>
            <Modal
                title="Tem certeza de que deseja excluir este agendamento? 😱"
                open={isDeleteConfirmModalVisible}
                onOk={handleDeleteAppointment}
                onCancel={closeDeleteConfirmModal}
                okText="Sim"
                cancelText="Não"
                footer={[
                    <StyledFooterAgendamento>
                        <Button
                            key="cancel"
                            onClick={closeDeleteConfirmModal}
                        >
                            Não
                        </Button>
                        <Button
                            key="submit"
                            type="primary"
                            onClick={handleDeleteAppointment}
                            style={{ backgroundColor: 'red', borderColor: 'red', color: 'white' }}
                        >
                            Sim
                        </Button>
                    </StyledFooterAgendamento>
                ]}
            >
                <DividerLine />
                <p>Após esta ação você não poderá recuperar os dados desse agendamento!</p>
                <p>Caso seja um novo cliente, seus dados continuaram salvos no Menu Clientes.</p>
                <DividerLine />
            </Modal>
            <Modal
                title="Reagendar Agendamento ⚠️"
                open={isRescheduleModalVisible}
                onCancel={() => setIsRescheduleModalVisible(false)}
                footer={[
                    <StyledFooterAgendamento>
                        <Button key="back" onClick={() => setIsRescheduleModalVisible(false)}>
                            Voltar
                        </Button>
                        <Button key="submit" type="primary" onClick={submitReschedule}>
                            Salvar Reagendamento
                        </Button>
                    </StyledFooterAgendamento>
                ]}
            >
                <p>Como administrador da clinica você pode reagendar para qualquer horário, portanto certifique-se de que jé não existe alguem para a data e horários selecionados !</p>
                <DividerLine />
                <StyledContainerReagendar>
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
                </StyledContainerReagendar>
                <DividerLine />

            </Modal>
        </>

    );
}

export default AppointmentModal;

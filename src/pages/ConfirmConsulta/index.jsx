import React, { useState, useEffect } from 'react';
import { Button, message, Modal } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import api from 'components/api/api';
import { StyledConfirmConsult, StyledContentButtons, StyledContentContainer, StyledSaveButton } from './styles';
import Btn from 'components/Btn';
import { LoadingOverlay } from 'pages/ContactPage/styles';
import Loading from 'components/Loading';
import CryptoJS from 'crypto-js';

const ConfirmAppointmentPage = () => {
    const [loading, setLoading] = useState(false);
    const [appointmentData, setAppointmentData] = useState(null);
    const [userChoice, setUserChoice] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();


    function decryptText(encryptedText) {
        const secretKey = import.meta.env.VITE_APP_SECRET_KEY;
        const bytes  = CryptoJS.AES.decrypt(encryptedText, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
      }
    

      useEffect(() => {
        const fetchAppointmentData = async () => {
          try {
            const { data } = await api.get(`/confirma-agendamento/${id}`);
            const decryptedData = JSON.parse(decryptText(data.data)); 
            setAppointmentData({
              dataConsulta: decryptedData.data,
              horarioConsulta: decryptedData.horario,
              professionalNome: decryptedData.professional_nome
            });
          } catch (error) {
                console.error('Erro ao buscar detalhes do agendamento:', error);
                message.error('Erro ao buscar detalhes do agendamento');
            }
        };
    
        fetchAppointmentData();
    }, [id]);
    
    const handleUserChoice = (choice) => {
        setUserChoice(choice);
    };

    const saveUserChoice = async () => {
        if (userChoice === null) {
            message.error('Por favor, faça uma escolha antes de salvar.');
            return;
        }
        setLoading(true);
        const status = userChoice ? 1 : 2;

        try {
            await api.put(`/confirma-agendamento/${id}`, { status });
            setIsModalVisible(true);
        } catch (error) {
            console.error('Erro ao atualizar o status do agendamento:', error);
            message.error('Erro ao atualizar o status do agendamento');
        } finally {
            setLoading(false);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
        navigate('/');
    };

    if (!appointmentData) {
        return <LoadingOverlay><Loading /></LoadingOverlay>;
    }

    return (
        <StyledConfirmConsult>
            <StyledContentContainer>
                <h2>Confirmação de Consulta...</h2>
                <p>Você deseja confirmar sua consulta para o dia {appointmentData.dataConsulta} às {appointmentData.horarioConsulta} com {appointmentData.professionalNome}?</p>
                <StyledContentButtons>
                    <Button
                        type={userChoice === true ? "primary" : "default"}
                        loading={loading}
                        onClick={() => handleUserChoice(true)}
                    >
                        Sim
                    </Button>
                    <Button
                        style={{ marginLeft: 8, marginRight: 8 }}
                        type={userChoice === false ? "primary" : "default"}
                        onClick={() => handleUserChoice(false)}
                    >
                        Não
                    </Button>
                </StyledContentButtons>
                <StyledSaveButton>
                    <Button
                        type="primary"
                        loading={loading}
                        onClick={saveUserChoice}
                    >
                        Salvar
                    </Button>
                </StyledSaveButton>
            </StyledContentContainer>
            <Modal
                title="Confirmação Recebida!"
                open={isModalVisible}
                onOk={handleOk}
                cancelButtonProps={{ style: { display: 'none' } }}
                footer={null}
            >
                <p style={{ textAlign: 'center', fontSize: '18px' }}>Resposta enviada com sucesso, obrigado !</p>
                <div style={{ fontSize: '50px', color: 'green', display: 'flex', justifyContent: 'center', }}>
                    ✓
                </div>
                <Btn
                    style={{ textAlign: 'center', width: '100%', marginTop: '1rem' }}
                    type="primary" onClick={handleOk}>
                    Conheça o Marquei 😃
                </Btn>
            </Modal>
        </StyledConfirmConsult>
    );
};

export default ConfirmAppointmentPage;

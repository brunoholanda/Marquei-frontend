import React, { useState } from 'react';
import { Modal, Select, Input, message, Button } from 'antd';
import api from '../api/api';
import ReactInputMask from 'react-input-mask';
import { useAuth } from 'context/AuthContext';

const { Option } = Select;

const RecommendationModal = ({ modalRecommendationisVisible, modalRecommendationisClose }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputName, setInputName] = useState('');
    const [inputPhone, setInputPhone] = useState('');
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { authData } = useAuth();
    const companyID = authData.companyID;
    const handleRecommend = async () => {
        setIsLoading(true);
        try {
            const companyId = companyID;
            if (!selectedOption || !inputName.trim() || !inputPhone.trim()) {
                message.error('Por favor, preencha todos os campos!');
                setIsLoading(false);
                return;
            }

            await api.post('/recommendations', {
                companyId,
                indicated: inputName,
                especialidade: selectedOption,
                telefone: inputPhone
            });

            setSelectedOption(null);
            setInputName('');
            setInputPhone('');

            modalRecommendationisClose(); 
            setIsSuccessModalVisible(true); 
        } catch (error) {
            message.error(error.response?.data?.message || 'Ocorreu um erro ao enviar os dados!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Modal
                title="Indique um amigo(a) 🤝"
                open={modalRecommendationisVisible}
                onCancel={() => {
                    setSelectedOption(null);
                    setInputName('');
                    setInputPhone('');
                    modalRecommendationisClose();
                }}
                footer={null}
            >
                <Select
                    placeholder="Para quem você esta indicando"
                    style={{ width: '100%' }}
                    onChange={(value) => setSelectedOption(value)}
                    value={selectedOption}
                >
                    <Option value="medico">Médico</Option>
                    <Option value="dentista">Dentista</Option>
                    <Option value="psicologo">Psicólogo</Option>
                    <Option value="fisioterapeuta">Fisioterapeuta</Option>
                    <Option value="nutricionista">Nutricionista</Option>
                </Select>
                {selectedOption && (
                    <>
                        <Input
                            placeholder="Nome do Amigo"
                            style={{ marginTop: '16px' }}
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}
                        />
                        <ReactInputMask
                            mask="(99) 9 9999-9999"
                            value={inputPhone}
                            onChange={(e) => setInputPhone(e.target.value)}
                        >
                            {(inputProps) => <Input {...inputProps} style={{ marginTop: '16px' }} placeholder="Telefone do Amigo" />}
                        </ReactInputMask>
                    </>
                )}

                <Button
                    loading={isLoading}
                    style={{ textAlign: 'center', width: '100%', marginTop: '1rem' }}
                    type="primary" onClick={handleRecommend}>
                    Recomendar
                </Button>
            </Modal>

            <Modal
                title="Indicação Efetivada"
                open={isSuccessModalVisible}
                onCancel={() => setIsSuccessModalVisible(false)}
                footer={null}
            >
                <p>Muito obrigado pela indicação, vamos entrar em contato com seu amigo(a) logo mais! Não se esqueça de reivindicar seu desconto especial por indicação!</p>
            </Modal>

        </>
    );
};

export default RecommendationModal;

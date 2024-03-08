import React, { useEffect, useState } from 'react';
import api from 'components/api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Modal, Rate, notification } from 'antd';
import { RateContainer, RateLabel, RateWrapper, StyledResearchPage } from '../styles';
import Btn from 'components/Btn';
import { useAuth } from 'context/AuthContext';
import ReactInputMask from 'react-input-mask';

function CustomRate({ count, onChange, value }) {
    const [rateValue, setRateValue] = useState(value || 0);




    const handleChange = (value) => {
        let adjustedValue = value - 1;

        if (adjustedValue < 0) {
            adjustedValue = 0;
        }

        if (value === 1 && rateValue === 0) {
            adjustedValue = -1;
        }

        setRateValue(adjustedValue);
        if (onChange) {
            onChange(adjustedValue >= 0 ? adjustedValue : null);
        }
    };



    return (
        <RateContainer>
            <Rate count={count} onChange={handleChange} value={rateValue >= 0 ? rateValue + 1 : 0} />
            <RateWrapper>
                {Array.from({ length: count }, (_, i) => (
                    <RateLabel key={i}>{i}</RateLabel>
                ))}
            </RateWrapper>
        </RateContainer>
    );
}

function ClientResearch() {
    const { company_id } = useParams();
    const [form] = Form.useForm();
    const [companyName, setCompanyName] = useState(''); // Novo estado para armazenar o nome da empresa
    const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
    const navigate = useNavigate()

    const removePhoneMask = (phone) => phone.replace(/[^\d]/g, '');


    useEffect(() => {
        // Função para buscar os detalhes da empresa
        const fetchCompanyDetails = async () => {
            try {
                const response = await api.get(`/companies-by-id/${company_id}`); // Substitua '/companies/' pelo endpoint correto se necessário
                setCompanyName(response.data.nome); // Assumindo que a resposta tem um campo 'nome'
            } catch (error) {
                console.error('Erro ao buscar detalhes da empresa:', error);
                notification.error({
                    message: 'Erro ao Buscar Empresa',
                    description: 'Não foi possível buscar os detalhes da empresa. Tente novamente mais tarde.',
                });
            }
        };

        fetchCompanyDetails();
    }, [company_id]);

    const onFinish = (values) => {
        const formattedValues = {
            ...values,
            telefone: removePhoneMask(values.telefone),
        };

        api.post('nps-systems', { ...formattedValues, company_id })
            .then(response => {
                form.resetFields();
                setIsModalVisible(true);
                notification.success({
                    message: 'Feedback Enviado',
                    description: 'Agradecemos pelo seu feedback!',
                });
            })
            .catch(error => {
                notification.error({
                    message: 'Erro no Envio',
                    description: 'Não foi possível enviar o seu feedback. Tente novamente mais tarde.',
                });
                console.error('There was an error submitting the form:', error);
            });
    };

    const handleOk = () => {
        setIsModalVisible(false); // Fecha o modal
        navigate('/'); // Redireciona para a página inicial
    };

    return (
        <StyledResearchPage>
            <h2>Em uma escala de 0 a 10, o quanto você recomendaria {companyName || 'a Empresa'} para um amigo ou colega?</h2>
            <Form form={form} onFinish={onFinish} layout="vertical" className='pesquisa-form'>
                <Form.Item
                    name="nome"
                    label="Nome"
                    rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
                >
                    <Input placeholder="Digite seu nome" />
                </Form.Item>

                <Form.Item
                    name="telefone"
                    label="Telefone (Opcional)"
                >
                    <ReactInputMask mask="(99) 9 9999-9999" maskChar={null}>
                        {(inputProps) => <Input {...inputProps} />}
                    </ReactInputMask>
                </Form.Item>

                <Form.Item
                    name="nota"
                    label="Nota"
                    rules={[{ required: true, message: 'Por favor, avalie de 0 a 10!' }]}
                >
                    <CustomRate count={11} onChange={(value) => form.setFieldsValue({ nota: value })} />
                </Form.Item>

                <Form.Item>
                    <Btn htmlType="submit">
                        Enviar Feedback
                    </Btn>
                </Form.Item>
            </Form>
            <Modal title="Feedback Recebido" visible={isModalVisible} onOk={handleOk} cancelButtonProps={{ style: { display: 'none' } }}>
                <p>Seu feedback foi enviado com sucesso. Agradecemos pela sua contribuição!</p>
            </Modal>
        </StyledResearchPage>
    );
}

export default ClientResearch;

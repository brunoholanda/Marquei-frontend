import React, { useState, useEffect } from 'react';
import api from '../../components/api/api';
import { useLocation } from 'react-router-dom';
import { Col, Form, Input, Row, Select } from 'antd';
import { StyledCard, StyledForm, StyledInput, StyledButton } from './styles';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Option } from 'antd/es/mentions';

const CheckoutPage = () => {
    const location = useLocation();
    const { planPrice } = location.state || { planPrice: 0 };
    const [form] = Form.useForm();
    const [preferenceId, setPreferenceId] = useState(null);

    useEffect(() => {
        initMercadoPago('TEST-c12efe3e-56fd-49b6-a560-dd5d3b700102', { locale: 'pt-BR' });
    }, []);
    

    const onFinish = async (values) => {
        try {
            // Aqui você pode adicionar a validação do cliente ou a criação do token de cartão do MercadoPago se necessário
    
            const paymentData = {
                cardNumber: values.cardNumber.replace(/\s+/g, ''), // Remove espaços em branco
                cardExpirationMonth: values.expiryDate.split('/')[0],
                cardExpirationYear: `20${values.expiryDate.split('/')[1]}`, // Adiciona '20' para o formato do ano
                cardCVV: values.cvv,
                transactionAmount: planPrice, // Ou o valor que você precisa cobrar
                // Adicione outros campos necessários para a API do MercadoPago aqui
            };
    
            // Envie os dados do cartão para o servidor
            const response = await api.post('/process_payment', paymentData);
    
            if (response.data.status === 'approved') {
                alert('Pagamento aprovado!');
            } else {
                alert('Pagamento não aprovado: ' + response.data.status_detail);
            }
    
        } catch (error) {
            console.error('Falha ao processar pagamento:', error);
            alert('Erro ao processar o pagamento.');
        }
    };
    
    const installmentOptions = [1, 2, 3, 6, 12].map(installment => (
        <Option key={installment} value={installment}>
            {installment}x
        </Option>
    ));
    
    return (
        <StyledCard title="Método de pagamento" bordered={false}>
        <StyledForm form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={8}>
                <Col span={16}>
                    <Form.Item
                        name="cardNumber"
                        rules={[{ required: true, message: 'Por favor, insira o número do cartão!' }]}
                    >
                        <Input placeholder="Número do cartão" />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name="expiryDate"
                        rules={[{ required: true, message: 'Insira a validade!' }]}
                    >
                        <Input placeholder="MM/YY" />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name="cvv"
                        rules={[{ required: true, message: 'Insira o CVV!' }]}
                    >
                        <Input placeholder="CVC" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                    name="cardholderName"
                    rules={[{ required: true, message: 'Por favor, insira o nome do titular!' }]}
                >
                    <Input placeholder="Nome do Titular" />
                </Form.Item>
                <Form.Item
                    name="identificationNumber"
                    rules={[{ required: true, message: 'Por favor, insira o CPF!' }]}
                >
                    <Input placeholder="CPF" />
                </Form.Item>
                <Form.Item
                    name="cardholderEmail"
                    rules={[
                        { required: true, message: 'Por favor, insira o e-mail!' },
                        { type: 'email', message: 'Por favor, insira um e-mail válido!' }
                    ]}
                >
                    <Input placeholder="E-mail" />
                </Form.Item>
                <Form.Item
                    name="installments"
                    rules={[{ required: true, message: 'Por favor, selecione o número de parcelas!' }]}
                >
                    <Select placeholder="Número de parcelas">
                        {installmentOptions}
                    </Select>
                </Form.Item>
                <StyledButton type="primary" htmlType="submit">
                    Pagar R${planPrice}
                </StyledButton>
        </StyledForm>
    </StyledCard>
        
    );
};

export default CheckoutPage;

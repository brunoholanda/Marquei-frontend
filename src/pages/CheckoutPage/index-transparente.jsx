import React, { useState, useEffect } from 'react';
import api from '../../components/api/api';
import { useLocation } from 'react-router-dom';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { StyledCard, StyledForm, StyledInput, StyledButton, StyledContainerButton, StyledPlanContainer, StyledPlanCard } from './styles';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Option } from 'antd/es/mentions';

const CheckoutPage = () => {
    const location = useLocation();
    const { serviceId } = location.state || { serviceId: null };
    const [form] = Form.useForm();
    const [paymentType, setPaymentType] = useState(null); // Estado para o tipo de pagamento (mensal ou anual)
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [serviceDetails, setServiceDetails] = useState({ plan: '', monthlyPrice: 0, anualPrice: 0 });

    useEffect(() => {
        initMercadoPago('TEST-c12efe3e-56fd-49b6-a560-dd5d3b700102', { locale: 'pt-BR' });
        if (serviceId) {
            loadServiceDetails(serviceId);
        }
    }, [serviceId]);


    const loadServiceDetails = async (id) => {
        try {
            const response = await api.get(`/service_details/${id}`);
            setServiceDetails({
                plan: response.data.plan,
                monthlyPrice: response.data.price, // agora corresponde ao nome 'price' da API
                anualPrice: response.data.anualPrice, // corrigido de 'anualPrice' para 'annualPrice'
                persons: response.data.persons, // adicione isto para carregar a quantidade de pessoas
            });
        } catch (error) {
            console.error('Erro ao carregar detalhes do serviço:', error);
        }
    };

    const onPaymentMethodChange = method => {
        setPaymentMethod(method);
    };

    const onSelectPaymentType = (type) => {
        setPaymentType(type);
        // Reiniciar o método de pagamento selecionado sempre que o tipo de pagamento mudar
        setPaymentMethod(null);
    };


    const calculateAnualSavings = () => {
        const monthlyCost = serviceDetails.monthlyPrice * 12;
        return monthlyCost - serviceDetails.anualPrice;
    };

    const onFinish = async (values) => {
        try {

            const transaction_amount = paymentType === 'anual'
                ? serviceDetails.anualPrice // Para pagamentos anuais, use o preço total anual
                : serviceDetails.monthlyPrice; // Para pagamentos mensais, use o preço mensal

            const paymentData = {
                // ...
                cardNumber: values.cardNumber.replace(/\s+/g, ''), // Remove espaços em branco
                cardExpirationMonth: values.expiryDate.split('/')[0],
                cardExpirationYear: `20${values.expiryDate.split('/')[1]}`, // Adiciona '20' para o formato do ano
                cardCVV: values.cvv,
                transaction_amount: Number(transaction_amount), // Use o valor determinado acima
                payment_method_id: 'cartao',
                issuer_id: 'visa',
                description: 'teste',

                payer: {
                    email: 'holanda_rodrigues@hotmail.com',
                    identification: {
                      type: 'cpf',
                      number: '08554708440'
                    }
                }
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
        <StyledCard title={`Finalizar Compra - Plano ${serviceDetails.plan}`} bordered={false}>
            <StyledForm form={form} layout="vertical" onFinish={onFinish}>
                <StyledPlanContainer>
                    <StyledPlanCard
                        selected={paymentType === 'monthly'}
                        onClick={() => onSelectPaymentType('monthly')}
                    >
                        <div><strong>Plano {serviceDetails.plan} Mensal 💸</strong></div>
                        <div>R$ {serviceDetails.monthlyPrice} por mês</div>
                        <div>{serviceDetails.persons} profissional(is)</div>
                    </StyledPlanCard>
                    <StyledPlanCard
                        selected={paymentType === 'anual'}
                        onClick={() => onSelectPaymentType('anual')}
                    >
                        <div><strong>Plano {serviceDetails.plan} Anual 🤩</strong></div>
                        <p>Use 12 meses pagando por 10 e Economize R$ {calculateAnualSavings().toFixed(2)} ao ano !</p>
                        <div>Pagando Apenas R$ {(serviceDetails.anualPrice / 12).toFixed(2)} por mês</div>
                        <div>{serviceDetails.persons} profissional(is)</div>
                    </StyledPlanCard>
                </StyledPlanContainer>

                {paymentType && (
                    <StyledContainerButton>
                        <Button type="default" onClick={() => onPaymentMethodChange('creditCard')}>
                            Cartão de Crédito
                        </Button>
                        <Button type="default" onClick={() => onPaymentMethodChange('pix')}>
                            PIX
                        </Button>
                        <Button type="default" onClick={() => onPaymentMethodChange('mercadoPago')}>
                            Mercado Pago
                        </Button>
                    </StyledContainerButton>
                )}

                {paymentMethod === 'creditCard' && (
                    <div>
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
                            Pagar {paymentType === 'anual' ? `R$ ${(serviceDetails.anualPrice / 12).toFixed(2)} por mês (Total Anual: R$${serviceDetails.anualPrice})` : `R$${serviceDetails.monthlyPrice}`}
                        </StyledButton>
                    </div>
                )}

            </StyledForm>

        </StyledCard>

    );
};

export default CheckoutPage;

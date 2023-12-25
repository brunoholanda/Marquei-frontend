import React, { useState, useEffect } from 'react';
import api from '../../components/api/api';
import { useLocation } from 'react-router-dom';
import { Form } from 'antd';
import { StyledCard, StyledForm, StyledPlanCard, StyledPlanContainer } from './styles';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Option } from 'antd/es/mentions';

const CheckoutPage = () => {
    const location = useLocation();
    const { serviceId } = location.state || { serviceId: null };
    const [form] = Form.useForm();
    const [paymentType, setPaymentType] = useState(null); // Estado para o tipo de pagamento (mensal ou anual)
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [serviceDetails, setServiceDetails] = useState({ plan: '', monthlyPrice: 0, anualPrice: 0 });
    const [preferenceId, setPreferenceId] = useState(null);

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

    const onSelectPaymentType = (type, itemDetails) => {
        const details = {
            title: `Plano ${serviceDetails.plan}`, // Garanta que serviceDetails.plan existe
            unit_price: type === 'monthly' ? serviceDetails.monthlyPrice : serviceDetails.anualPrice, // Verifique se monthlyPrice e anualPrice estão definidos
            description: `Plano ${serviceDetails.plan} - ${type === 'monthly' ? 'Mensal' : 'Anual'}` // Novamente, assegure-se que serviceDetails.plan existe
        };
        setPaymentType(type);
        setPaymentMethod(null);
        createPreference(details);
    };

    const calculateAnualSavings = () => {
        const monthlyCost = serviceDetails.monthlyPrice * 12;
        return monthlyCost - serviceDetails.anualPrice;
    };

    const onFinish = async (values) => {

    };

    const createPreference = async (itemDetails) => {
        try {
            const response = await api.post('/create_preference', {
                itemDetails: itemDetails // Envie os detalhes do plano selecionado
            });
            const preferenceId = response.data.id;
            setPreferenceId(preferenceId);
        } catch (error) {
            console.error('Erro ao criar a preferência de pagamento:', error);
        }
    };



    return (
        <StyledCard title={`Finalizar Compra - Plano ${serviceDetails.plan}`} bordered={false}>
            <h3>Com o {serviceDetails.plan} você terá acesso a todas as funcionalidades do sistemas ja existentes, recebera atualizações constantes e ainda terá suporte garantido, você ainda pode optar pelo pagamento anual e garantir uma oferta de desconto imperdivel !</h3>
            <StyledForm form={form} layout="vertical" onFinish={onFinish}>
                <StyledPlanContainer>
                <StyledPlanCard
                        selected={paymentType === 'anual'}
                        onClick={() => onSelectPaymentType('anual')}
                    >
                        <h2><strong>Plano {serviceDetails.plan} Anual 🤩</strong></h2>
                        <h3>Use 12 meses pagando por 10 e Economize R$ {calculateAnualSavings().toFixed(2)} ao ano !</h3>
                        <h2>Pagando Apenas R$ {(serviceDetails.anualPrice / 12).toFixed(2)} por mês</h2>
                        <div>{serviceDetails.persons} profissional(is) teram acesso a plataforma</div>
                    </StyledPlanCard>
                    <StyledPlanCard
                        selected={paymentType === 'monthly'}
                        onClick={() => onSelectPaymentType('monthly')}
                    >
                        <h2><strong>Plano {serviceDetails.plan} Mensal 💸</strong></h2>
                        <h3>Pagamento sem desconto mês a mês</h3>
                        <h2>R$ {serviceDetails.monthlyPrice} por mês</h2>
                        <div>{serviceDetails.persons} profissional(is) teram acesso a plataforma</div>
                    </StyledPlanCard>

                </StyledPlanContainer>
                {paymentType && preferenceId && (
                    <Wallet
                        initialization={{
                            preferenceId: preferenceId
                        }}
                    />
                )}
            </StyledForm>
        </StyledCard>

    );
};

export default CheckoutPage;

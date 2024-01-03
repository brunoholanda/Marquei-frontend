// AuthModal.jsx
import React, { useEffect, useState } from 'react';
import { Modal, Input, Button, message, Spin } from 'antd';
import { BASE_URL } from 'config';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import { StyledPlanCard, StyledPlanContainer, StyledTextCard } from './Styles';
import api from '../../components/api/api';
import { WarningOutlined } from '@ant-design/icons';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const commonDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com"];


const AuthModal = ({ isVisible, onClose, onLoginSuccess, selectedService }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUserExist, setIsUserExist] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [paymentType, setPaymentType] = useState(null);
    const location = useLocation();
    const { serviceId } = location.state || { serviceId: null };
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [serviceDetails, setServiceDetails] = useState({ plan: '', monthlyPrice: 0, anualPrice: 0 });
    const [preferenceId, setPreferenceId] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [emailSuggestions, setEmailSuggestions] = useState([]);
    const [preapprovalPlanId, setPreapprovalPlanId] = useState('');
    const [showTrialModal, setShowTrialModal] = useState(false);  // Novo estado para controlar a visibilidade do modal de teste grátis

    const validateEmail = (username) => {
        return emailRegex.test(username);
    }

    const updateEmailSuggestions = (inputText) => {
        if (inputText.includes('@')) {
            const parts = inputText.split('@');
            const domainPart = parts[1];
            const filteredDomains = commonDomains.filter((domain) =>
                domain.startsWith(domainPart)
            ).map((domain) => parts[0] + "@" + domain);
            setEmailSuggestions(filteredDomains);
        } else {
            setEmailSuggestions([]);
        }
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setUsername(newEmail);
        updateEmailSuggestions(newEmail);
    };

    // Handler para selecionar uma sugestão
    const selectSuggestion = (suggestion) => {
        setUsername(suggestion);
        setEmailSuggestions([]);
    };


    const checkEmailExists = async (username) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/check-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });
            const data = await response.json();
            setIsUserExist(data.exists);

            if (!data.exists) {
                message.info("Seu email não existe em nosso cadastro, por favor faça seu cadastro e aproveite 7 dias grátis para testar o Marquei");
                setShowTrialModal(true);
            }
        } catch (error) {
            message.error('Error checking email: ' + error.message);
        }
    };

    const handleFreeTrial = () => {
        // Aqui você pode implementar a lógica para iniciar o teste grátis
        // Por exemplo, pode redirecionar o usuário para uma página de cadastro
        navigate('/cadastro');
        setShowTrialModal(false); // Fecha o modal após a ação
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(username)) {
            message.error('Please enter a valid email.');
            return;
        }
        setIsLoading(true);
        await checkEmailExists(username);
        setIsLoading(false);
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                setIsLoggedIn(true);
                onLoginSuccess(data);
                loadServiceDetails(selectedService.serviceId);
            } else {
                message.error(data.message || 'Failed to login. Please check your credentials.');
            }
        } catch (error) {
            message.error('An error occurred while trying to log in: ' + error.message);
        }
        setIsLoading(false);
    };


    useEffect(() => {
        if (selectedService.serviceId) {
            loadServiceDetails(selectedService.serviceId);
        }
    }, [selectedService.serviceId]);

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
                monthlyPrice: response.data.price,
                anualPrice: response.data.anualPrice,
                persons: response.data.persons,
            });
            setPreapprovalPlanId(response.data.preapproval_plan_id);

        } catch (error) {
            console.error('Erro ao carregar detalhes do serviço:', error);
        }
    };

    const createPreference = async (itemDetails) => {
        try {
            const response = await api.post('/create_preference', {
                itemDetails: itemDetails
            });
            const preferenceId = response.data.id;
            setPreferenceId(preferenceId);
            setLoading(false);
            onPayClick();

        } catch (error) {
            console.error('Erro ao criar a preferência de pagamento:', error);
            setLoading(false);

        }
    };

    const onSelectPaymentType = async (type, itemDetails) => {
        const authToken = localStorage.getItem('authToken'); // Supondo que o token de autenticação esteja armazenado no localStorage

        if (type === 'monthly') {
            if (!preapprovalPlanId) {
                message.error('ID de plano de aprovação prévia não encontrado. Por favor, tente novamente mais tarde.');
                return;
            }

            // Dados que serão enviados para a API
            const paymentData = {
                payment_type: 'mensal',
                payment_email: username, // ou o e-mail do usuário autenticado
                service_id: selectedService.serviceId, // ou outro identificador relevante do serviço
                payment_confirm: false,
            };

            try {
                // Enviando dados de pagamento para a API
                const response = await fetch(`${BASE_URL}/companies/updatePaymentInfo`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                    body: JSON.stringify(paymentData),
                });

                const responseData = await response.json();

                if (response.ok) {
                    // Se a atualização foi bem-sucedida, redireciona para o pagamento mensal
                    const monthlyPaymentUrl = `https://www.mercadopago.com/mlb/debits/new?preapproval_plan_id=${preapprovalPlanId}`;
                    window.location.href = monthlyPaymentUrl;
                } else {
                    // Lidar com erros na atualização de informações de pagamento
                    message.error(`Erro ao atualizar informações de pagamento: ${responseData.error || 'Erro desconhecido'}`);
                }
            } catch (error) {
                console.error('Erro ao enviar dados de pagamento:', error);
                message.error('Erro ao enviar informações de pagamento.');
            }
        } else {
            // Processo para outros tipos de pagamento (ex: anual)
            const details = {
                title: `Plano ${serviceDetails.plan}`,
                unit_price: type === 'anual' ? serviceDetails.anualPrice : serviceDetails.monthlyPrice,
                description: `Plano ${serviceDetails.plan} - ${type === 'anual' ? 'Anual' : 'Mensal'}`
            };
            setPaymentType(type);
            setLoading(true);
            createPreference(details);
        }
    };



    const calculateAnualSavings = () => {
        const monthlyCost = serviceDetails.monthlyPrice * 12;
        return monthlyCost - serviceDetails.anualPrice;
    };

    const onPayClick = async () => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            message.error("Você precisa estar logado para realizar o pagamento.");
            return;
        }

        const mappedPaymentType = paymentType === 'monthly' ? 'mensal' : 'anual';

        const paymentData = {
            payment_type: mappedPaymentType,
            payment_email: username,
            service_id: selectedService.serviceId, // serviceId do serviço selecionado
            payment_confirm: false,
        };

        try {
            const response = await fetch(`${BASE_URL}/companies/updatePaymentInfo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(paymentData),
            });

            const responseData = await response.json();
            if (response.ok) {
            } else {
                message.error(`Erro: ${responseData.error}`);
            }
        } catch (error) {
            console.error('Erro ao enviar dados de pagamento:', error);
            message.error('Erro ao enviar informações de pagamento.');
        }
    };

    const handlePaymentSuccess = (paymentData) => {
        onPayClick(paymentData);
    };

    const customization = {
        visual: {
            borderRadius: '6px',
            color: 'white',

        },
        texts: {
            action: 'pay',
            valueProp: 'security_details',
        },
    }

    const renderContent = () => {
        if (!isLoggedIn) {
            return (
                <div>
                    <form onSubmit={handleEmailSubmit}>
                        <Input
                            type="email"
                            value={username}
                            onChange={handleEmailChange}
                            placeholder="Insira seu E-mail"
                            required
                        />
                        {emailSuggestions.length > 0 && (
                            <div style={{ marginTop: '0.5rem', background: '#f7f7f7', padding: '0.5rem' }}>
                                {emailSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        style={{ cursor: 'pointer', padding: '0.5rem' }}
                                        onClick={() => selectSuggestion(suggestion)}
                                    >
                                        {suggestion}
                                    </div>
                                ))}
                            </div>
                        )}
                        {isUserExist && (
                            <>
                                <Input
                                    style={{ marginTop: '1rem' }}
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Insira sua senha"
                                    required
                                />
                                <Button style={{ textAlign: 'center', width: '100%', marginTop: '1rem' }} type="primary" onClick={handleLogin} loading={isLoading}>
                                    Login
                                </Button>
                            </>
                        )}
                        {!isUserExist && !isLoading && (
                            <Button style={{ textAlign: 'center', width: '100%', marginTop: '1rem' }} type="primary" htmlType="submit" loading={isLoading}>
                                Continue
                            </Button>
                        )}
                    </form>
                </div>
            );
        } else if (!paymentType) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <h2>Escolha o tipo de pagamento</h2>
                    <StyledPlanContainer>
                        <StyledPlanCard
                            selected={paymentType === 'anual'}
                            onClick={() => onSelectPaymentType('anual')}
                        >
                            <h2><strong>Plano Anual 🤩</strong></h2>
                            <h3>Use 12 meses pagando por 10 e Economize R$ {calculateAnualSavings().toFixed(2)} ao ano!</h3>
                            <h2>Pagando Apenas R$ {(serviceDetails.anualPrice / 12).toFixed(2)} por mês</h2>
                            <div>{serviceDetails.persons} profissional(is) teram acesso a plataforma</div>
                        </StyledPlanCard>
                        <StyledPlanCard
                            selected={paymentType === 'monthly'}
                            onClick={() => onSelectPaymentType('monthly')}
                        >
                            <h2><strong>Plano Mensal 💸</strong></h2>
                            <h3>Pagamento sem desconto mês a mês</h3>
                            <h2>R$ {serviceDetails.monthlyPrice} por mês</h2>
                            <div>{serviceDetails.persons} profissional(is) teram acesso a plataforma</div>
                        </StyledPlanCard>
                    </StyledPlanContainer>
                    <p><WarningOutlined /> Ao pagar utilize o mesmo e-mail logado !</p>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>Você selecionou o {paymentType === 'monthly' ? 'Plano Mensal' : 'Plano Anual'} de pagamento</h2>
                    {loading ? (
                        <Spin size="large" />
                    ) : (
                        paymentType && preferenceId && (
                            <Wallet
                                customization={customization}
                                initialization={{
                                    preferenceId: preferenceId
                                }}

                                onPaymentSuccess={handlePaymentSuccess} // Exemplo, o nome do prop real depende do SDK

                            />
                        )
                    )}
                    <StyledTextCard>
                        <p>Ao clicar em Pagar você será redirecionado para o ambiente seguro do Mercado Pago, o valor a ser pago no plano anual será  <b>R$ {serviceDetails.anualPrice}</b> e pode ser parcelado*</p>
                        <p>Utilize o mesmo e-mail logado no pagamento !</p>
                    </StyledTextCard>
                    <Button
                        style={{ textAlign: 'center', width: '100%', marginTop: '1rem' }}
                        onClick={() => setPaymentType(null)}
                    >
                        Alterar Plano de Pagamento
                    </Button>
                </div>
            );
        }
    };


    return (
        <>

            <Modal
                title="Cadastre-se / Entrar"
                visible={isVisible}
                onCancel={onClose}
                footer={null}
            >
                <p>Plano {selectedService.servicePlan}</p>
                <div style={{ textAlign: 'center' }}>
                    {isLoading ? <Spin size="large" /> : renderContent()}
                </div>
            </Modal>
            <Modal
                title="Teste Grátis 😮"
                visible={showTrialModal}
                onCancel={() => setShowTrialModal(false)}
                footer={null}
            >
                <p>Seu e-mail não existe em nosso cadastro, por favor faça seu cadastro e aproveite 7 dias grátis para testar o Marquei !</p>
                <Button
                    style={{ textAlign: 'center', width: '100%', marginTop: '1rem' }}
                    type="primary" onClick={handleFreeTrial}>
                    Testar Grátis Por 7 Dias 😃
                </Button>
            </Modal>
        </>

    );
};

export default AuthModal;

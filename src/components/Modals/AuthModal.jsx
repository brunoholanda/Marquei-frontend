// AuthModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Input, Button, message, Spin } from 'antd';
import { BASE_URL } from 'config';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import { StyledPlanCard, StyledPlanContainer, StyledTextCard } from './Styles';
import api from '../../components/api/api';
import { WarningOutlined } from '@ant-design/icons';
import Btn from 'components/Btn';
import { useAuth } from 'context/AuthContext';
import ReCAPTCHAUtil from 'utils/ReCAPTCHAUtil';

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
    const [serviceDetails, setServiceDetails] = useState({ plan: '', monthlyPrice: 0, anualPrice: 0 });
    const [preferenceId, setPreferenceId] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [emailSuggestions, setEmailSuggestions] = useState([]);
    const [preapprovalPlanId, setPreapprovalPlanId] = useState('');
    const [showTrialModal, setShowTrialModal] = useState(false);  // Novo estado para controlar a visibilidade do modal de teste grátis
    const { authData } = useAuth();
    const companyID = authData.companyID;
    const [loginError, setLoginError] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const recaptchaRef = useRef(null);
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
                body: JSON.stringify({ username, company_id: companyID }),
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
        navigate('/cadastro');
        setShowTrialModal(false);
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(username)) {
            message.error('Por favor, insira um email valido');
            return;
        }
        setIsLoading(true);
        await checkEmailExists(username);
        setIsLoading(false);
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        if (!recaptchaToken) {
            // Altere para definir uma mensagem de erro mais amigável e genérica, se necessário
            setLoginError('Por favor, confirme que você não é um robô.');
            setIsLoading(false); // Certifique-se de parar o carregamento se não passar no ReCAPTCHA
            return;
        }
    
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, recaptchaToken }),
            });
    
            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem('authToken', data.token);
                setIsLoggedIn(true);
                onLoginSuccess(data);
                loadServiceDetails(selectedService.serviceId);
            } else {
                if (data.message === "Token inválido ou expirado") {
                    setIsLoggedIn(true);
                    setPaymentType(null); 
                } else {
                    setLoginError('Não foi possível entrar. Verifique suas credenciais ou tente novamente mais tarde.');
                }
                setRecaptchaToken('');
            }
        } catch (error) {
            setLoginError('Ocorreu um problema. Por favor, tente novamente mais tarde.');
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
            }
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
        const authToken = sessionStorage.getItem('authToken');

        if (type === 'monthly') {
            if (!preapprovalPlanId) {
                message.error('ID de plano de aprovação prévia não encontrado. Por favor, tente novamente mais tarde.');
                return;
            }

            const paymentData = {
                payment_type: 'mensal',
                payment_email: username,
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
                    const monthlyPaymentUrl = `https://www.mercadopago.com/mlb/debits/new?preapproval_plan_id=${preapprovalPlanId}`;
                    window.location.href = monthlyPaymentUrl;
                } else {
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
        const authToken = sessionStorage.getItem('authToken');

        if (!authToken) {
            message.error("Você precisa estar logado para realizar o pagamento.");
            return;
        }

        const mappedPaymentType = paymentType === 'monthly' ? 'mensal' : 'anual';

        const paymentData = {
            payment_type: mappedPaymentType,
            payment_email: username,
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
                            style={{ marginBottom: '1rem' }}

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
                                {loginError && <div>{loginError}</div>}

                                <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0 10px 0' }}>
                                    <ReCAPTCHAUtil
                                        ref={recaptchaRef}
                                        onChange={(token) => setRecaptchaToken(token)}
                                    />
                                </div>
                                <Btn style={{ textAlign: 'center', width: '100%', marginTop: '1rem' }} type="primary" onClick={handleLogin} loading={isLoading}>
                                    Login
                                </Btn>
                            </>
                        )}
                        {!isUserExist && !isLoading && (
                            <Btn style={{ textAlign: 'center', width: '100%', height: '20px' }} htmlType="submit" loading={isLoading}>
                                Continue
                            </Btn>
                        )}
                    </form>
                </div>
            );
        } else if (!paymentType) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <h2>Escolha o tipo de pagamento</h2>
                    <p><WarningOutlined /> Ao pagar utilize o mesmo e-mail logado !</p>
                    <StyledPlanContainer>
                        <StyledPlanCard
                            selected={paymentType === 'anual'}
                            onClick={() => onSelectPaymentType('anual')}
                        >
                            <h2><strong>Plano Anual 🤩</strong></h2>
                            <h3>Use 12 meses pagando por 10 e Economize R$ {calculateAnualSavings().toFixed(2)} ao ano!</h3>
                            <h2>Pagando Apenas R$ {(serviceDetails.anualPrice / 12).toFixed(2)} por mês</h2>
                            <div>{serviceDetails.persons} profissional(is) teram acesso a plataforma</div>
                            <Btn onClick={(e) => {
                                e.stopPropagation();
                                onSelectPaymentType('anual');
                            }}>Contratar  🤝</Btn>
                        </StyledPlanCard>
                        <StyledPlanCard
                            selected={paymentType === 'monthly'}
                            onClick={() => onSelectPaymentType('monthly')}
                        >
                            <h2><strong>Plano Mensal 💸</strong></h2>
                            <h3>Pagamento mês a mês...</h3>
                            <h2>R$ {serviceDetails.monthlyPrice} por mês</h2>
                            <div>{serviceDetails.persons} profissional(is) teram acesso a plataforma</div>
                            <Btn onClick={(e) => {
                                e.stopPropagation();
                                onSelectPaymentType('monthly');
                            }}>Contratar  🤝</Btn>
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
                open={isVisible}
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
                open={showTrialModal}
                onCancel={() => setShowTrialModal(false)}
                footer={null}
            >
                <p>Seu e-mail não existe em nosso cadastro, por favor faça seu cadastro e aproveite 7 dias grátis para testar o Marquei !</p>
                <Btn
                    style={{ textAlign: 'center', width: '100%', marginTop: '1rem' }}
                    type="primary" onClick={handleFreeTrial}>
                    Testar Grátis Por 7 Dias 😃
                </Btn>
            </Modal>
        </>

    );
};

export default AuthModal;
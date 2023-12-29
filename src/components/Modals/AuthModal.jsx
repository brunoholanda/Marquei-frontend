// AuthModal.jsx
import React, { useEffect, useState } from 'react';
import { Modal, Input, Button, message, Checkbox, Select, Form } from 'antd';
import { BASE_URL } from 'config';
import ReactInputMask from 'react-input-mask';
import { Option } from 'antd/es/mentions';
import styles from '../../pages/RegisterScreen/RegisterScreen.css';
import { useNavigate } from 'react-router-dom';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex for validation


const AuthModal = ({ isVisible, onClose, onLoginSuccess }) => {
    const [form] = Form.useForm();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUserExist, setIsUserExist] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Additional state hooks for registration
    const [isAgreed, setIsAgreed] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [documentType, setDocumentType] = useState('cpf');
    const [documentTypeLabel, setDocumentTypeLabel] = useState('Digite o CPF');
    const [namePlaceholder, setNamePlaceholder] = useState('Nome completo');
    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const validateEmail = (username) => {
        return emailRegex.test(username);
    }

    const handleSpecialtyChange = selected => {
        setSelectedSpecialties(selected);
    };

    const checkEmailExists = async (username) => {
        if (!validateEmail(username)) {
            message.error('Please enter a valid email.');
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/auth/check-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });
            const data = await response.json();
            setIsUserExist(data.exists); // Assuming the API responds with a boolean `exists` field
        } catch (error) {
            message.error('Error checking email: ' + error.message);
        }
        setIsLoading(false);
    };


    const onAgreementChange = (e) => {
        setIsAgreed(e.target.checked);
    };
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        await checkEmailExists(username);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                throw new Error('Failed to login. Please check your credentials.');
            }
            const data = await response.json();
            localStorage.setItem('authToken', data.token); // Store the token in local storage or context
            onLoginSuccess(data); // Call the onLoginSuccess function with the user data
            navigate('/planos');

        } catch (error) {
            message.error(error.message);
        }
        setIsLoading(false);
    };

    function buildUserData(email, password, nome, phone, address, profession) {
        return {
            email,
            password,
            nome,
            phone,
            address,
            profession,
        };
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        // Assuming you have a function to build the user data object
        const userData = buildUserData(username, password, /* other fields */);
        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed.');
            }
            const data = await response.json();
            message.success('Registration successful!');
            onLoginSuccess(data); // You might want to log the user in immediately after registration
        } catch (error) {
            message.error(error.message);
        }
        setIsLoading(false);
    };

    const specialtyOptions = {
        'medico': 1,
        'dentista': 2,
        'psicologo': 3,
        'fisioterapeuta': 4,
        'nutricionista': 5,
    };


    const formItemLayout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };


    const getDocumentMask = (type) => {
        return type === 'cnpj' ? '99.999.999/9999-99' : '999.999.999-99';
    };

    function validateCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        let sum = 0, remainder;

        for (let i = 1; i <= 9; i++)
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++)
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    function validateCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj.length !== 14) return false;

        if (/^(\d)\1+$/.test(cnpj)) return false;

        let size = cnpj.length - 2;
        let numbers = cnpj.substring(0, size);
        const digits = cnpj.substring(size);
        let sum = 0;
        let pos = size - 7;

        for (let i = size; i >= 1; i--) {
            sum += numbers.charAt(size - i) * pos--;
            if (pos < 2) pos = 9;
        }

        let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== parseInt(digits.charAt(0))) return false;

        size = size + 1;
        numbers = cnpj.substring(0, size);
        sum = 0;
        pos = size - 7;
        for (let i = size; i >= 1; i--) {
            sum += numbers.charAt(size - i) * pos--;
            if (pos < 2) pos = 9;
        }

        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== parseInt(digits.charAt(1))) return false;

        return true;
    }

    const validateDocument = (type, number) => {
        const cleanNumber = number.replace(/[^\d]/g, '');
        if (type === 'cnpj') {
            return validateCNPJ(cleanNumber);
        } else {
            return validateCPF(cleanNumber);
        }
    };

    useEffect(() => {
        if (documentType === 'cnpj') {
            setDocumentTypeLabel('Digite o CNPJ');
            setNamePlaceholder('Razão a Social da sua Empresa');
        } else {
            setDocumentTypeLabel('Digite o número do seu CPF');
            setNamePlaceholder('Nome completo');
        }
    }, [documentType]);




    const validatePassword = async (_, value) => {
        if (value.length < 8) {
            return Promise.reject(new Error('A senha deve ter no mínimo 8 caracteres.'));
        }
        if (!/[A-Z]/.test(value)) {
            return Promise.reject(new Error('A senha deve conter pelo menos uma letra maiúscula.'));
        }
        if (!/[^A-Za-z0-9]/.test(value)) {
            return Promise.reject(new Error('A senha deve conter pelo menos um caractere especial.'));
        }
        return Promise.resolve();
    };

    const associateSpecialtiesToUser = async (userId, specialties) => {
        const response = await fetch(`${BASE_URL}/user-specialty/associate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, specialties }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao associar especialidades');
        }
    };


    const onFinish = async (values) => {
        const { idNumber, nome, email, phone, address, password, confirmPassword, profession } = values;
        const specialtiesIds = profession.map(p => specialtyOptions[p]);

        const companyData = {
            nome: nome,
            cnpj: idNumber,
            telefone: phone,
            endereco: address,
            service_id: 4, //sempre o id do plano teste da coluna, ajustar em producao
        };

        const userData = {
            email,
            password,
        };

        try {
            if (password !== confirmPassword) {
                throw new Error('As senhas não coincidem.');
            }
            if (!validateEmail(email)) {
                message.error('Por favor, insira um email válido.');
                return;
            }

            const response = await fetch(`${BASE_URL}/companies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ companyData, userData }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error || 'Erro no registro';
                throw new Error(errorMessage);
            }

            const userResponse = await response.json();
            const userId = userResponse.user.id; // Ajuste a chave para corresponder à estrutura da sua resposta

            await associateSpecialtiesToUser(userId, specialtiesIds);

            message.success('Registro bem-sucedido!');

            // Requisição para gerar token temporário
            const tokenResponse = await fetch(`${BASE_URL}/auth/generate-temp-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userData.email }),
            });

            if (!tokenResponse.ok) {
                const tokenErrorData = await tokenResponse.json();
                const tokenErrorMessage = tokenErrorData.error || 'Erro ao obter o Token de Acesso Temporário';
                throw new Error(tokenErrorMessage);
            }

            form.resetFields();
            setModalVisible(true);

        } catch (error) {
            message.error(error.message);
        }
    };



    return (
        <Modal
            title="Cadastre-se / Entrar"
            visible={isVisible}
            onCancel={onClose}
            footer={null}
        >
            <form>
                <Input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Insira seu Email"
                    required
                />
                {isUserExist !== null && (
                    <>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                        {isUserExist === false && (
                            <>
                                <Form form={form} onFinish={onFinish}>
                                    <Form.Item
                                        name="profession"
                                        label=""
                                        rules={[{ required: true, message: 'Por favor, selecione sua profissão!' }]}
                                    >
                                        <p style={{ fontSize: '1rem' }}>Você ou sua clínica é composta por?</p>
                                        <Select
                                            mode="multiple"
                                            placeholder="Selecione a especialidade"
                                            onChange={handleSpecialtyChange}
                                            maxTagCount={5} // Número máximo de itens visíveis
                                            className="dynamic-width-select"
                                            style={{ minHeight: 'auto' }}
                                        >
                                            <Option value="medico">Médico</Option>
                                            <Option value="dentista">Dentista</Option>
                                            <Option value="psicologo">Psicólogo</Option>
                                            <Option value="fisioterapeuta">Fisioterapeuta</Option>
                                            <Option value="nutricionista">Nutricionista</Option>
                                            {/* Adicione mais opções conforme necessário */}
                                        </Select>
                                    </Form.Item>


                                    <Form.Item
                                        {...formItemLayout}
                                        name="idType"
                                        label="Tipo de documento"
                                        rules={[{ required: true, message: 'Por favor, selecione o tipo de documento!' }]}
                                    >
                                        <Select
                                            placeholder="Selecione um tipo"
                                            onChange={(value) => setDocumentType(value)}
                                        >
                                            <Option value="cnpj">CNPJ</Option>
                                            <Option value="cpf">CPF</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        {...formItemLayout}
                                        name="idNumber"
                                        label={documentTypeLabel}
                                        rules={[
                                            { required: true, message: `Por favor, insira o número do ${documentType.toUpperCase()}!` },
                                            () => ({
                                                validator(_, value) {
                                                    if (validateDocument(documentType, value)) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error(`O número do ${documentType.toUpperCase()} é inválido.`));
                                                },
                                            }),
                                        ]}
                                    >
                                        <ReactInputMask
                                            mask={getDocumentMask(documentType)}
                                            placeholder={documentType === 'cnpj' ? '00.000.000/0000-00' : '000.000.000-00'}
                                        >
                                            {(inputProps) => <Input {...inputProps} />}
                                        </ReactInputMask>
                                    </Form.Item>

                                    <Form.Item
                                        {...formItemLayout}
                                        name="nome"
                                        label={namePlaceholder}
                                        rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
                                    >
                                        <Input placeholder={namePlaceholder} />
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout}
                                        name="phone"
                                        label="Telefone"
                                        rules={[{ required: true, message: 'Por favor, insira seu telefone!' }]}
                                    >
                                        <Input placeholder="Telefone" />
                                    </Form.Item>

                                    <Form.Item
                                        {...formItemLayout}
                                        name="address"
                                        label="Endereço Basico"
                                        rules={[{ required: true, message: 'Por favor, insira seu endereço!' }]}
                                    >
                                        <Input placeholder="Endereço" />
                                    </Form.Item>

                                    <Form.Item
                                        {...formItemLayout}
                                        name="password"
                                        label="Senha"
                                        rules={[
                                            { required: true, message: 'Por favor, insira sua senha!' },
                                            { validator: validatePassword },
                                        ]}
                                    >
                                        <Input.Password placeholder="Senha" />
                                    </Form.Item>

                                    <Form.Item
                                        {...formItemLayout}
                                        name="confirmPassword"
                                        label="Confirmar Senha"
                                        dependencies={['password']}
                                        rules={[
                                            { required: true, message: 'Por favor, confirme sua senha!' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('As senhas não coincidem.'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password placeholder="Confirme sua senha" />
                                    </Form.Item>

                                    <Form.Item name="agreement" valuePropName="checked">
                                        <Checkbox checked={isAgreed} onChange={onAgreementChange}>
                                            Li e aceito os <a href="/terms-of-service" className={styles.link}>Termos de Uso</a> e
                                            <a href="/privacy-policy" className={styles.link}> Política de Privacidade</a>
                                        </Checkbox>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" disabled={!isAgreed}>
                                            Testar Agora
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </>
                        )}
                        <Button
                            type="primary"
                            onClick={isUserExist ? handleLogin : handleRegister}
                            loading={isLoading}
                        >
                            {isUserExist ? 'Login' : 'Register'}
                        </Button>
                    </>
                )}
                {isUserExist === null && (
                    <Button
                        type="primary"
                        onClick={handleEmailSubmit}
                        loading={isLoading}
                    >
                        Continue
                    </Button>
                )}
            </form>
        </Modal>
    );
};

export default AuthModal;

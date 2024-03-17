import React, { useEffect, useRef, useState } from 'react';
import { Input, Button, DatePicker, Select, Form, message } from 'antd';
import ReactSignatureCanvas from 'react-signature-canvas';
import ReactInputMask from 'react-input-mask';
import { useForm } from 'antd/es/form/Form';
import api from '../api/api';
import { StyledFormItem, StyledModal, StyledTextLine } from './Styles';
import { WarningOutlined } from '@ant-design/icons';
import { useAuth } from 'context/AuthContext';
import { suggestEmails } from 'utils/commonMailDomains';

function ProfessionalModal({ isVisible, onClose, initialData, onProfessionalSaved }) {
    const [isEditMode, setIsEditMode] = useState(false);

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setDataNascimento] = useState(null);
    const [registro, setRegistro] = useState("");
    const [numeroRegistro, setNumeroRegistro] = useState("");
    const [estados, setEstados] = useState([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState(null);
    const [estadoProffisionalSelecionado, setEstadoProffisionalSelecionado] = useState(null);
    const [titulo, setTitulo] = useState(null);
    const [celular, setCelular] = useState('');
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
    const [planosDeSaude, setPlanosDeSaude] = useState([]);
    const [selectedPlanosIds, setSelectedPlanosIds] = useState([]);
    const [loginExistente, setLoginExistente] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(isVisible);
    const [form] = useForm();
    const [emailSuggestions, setEmailSuggestions] = useState([]);

    const { authData } = useAuth();
    const companyID = authData.companyID;
    const userSpecialties = authData.userSpecialties || [];

    const handleEmailChange = (event) => {
        const emailInput = event.target.value;
        const suggestions = suggestEmails(emailInput);
        setEmailSuggestions(suggestions);
    };

    const handleEmailSelect = (email) => {
        form.setFieldsValue({ email });
        setEmailSuggestions([]);
    };


    const getRegistroOptions = () => {
        const options = [];
        if (userSpecialties?.includes(1)) {
            options.push(<Select.Option value="CRM">CRM</Select.Option>);
        }
        if (userSpecialties?.includes(2)) {
            options.push(<Select.Option value="CRO">CRO</Select.Option>);
        }
        if (userSpecialties?.includes(3)) {
            options.push(<Select.Option value="CRP">CRP</Select.Option>);
        }
        if (userSpecialties?.includes(4)) {
            options.push(<Select.Option value="CREFITO">CREFITO</Select.Option>);
        }
        if (userSpecialties?.includes(5)) {
            options.push(<Select.Option value="CRN">CRN</Select.Option>);
        }
        if (userSpecialties?.includes(6)) {
            options.push(<Select.Option value="CFFA">CFFA</Select.Option>);
        }
        return options;
    };
    
    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const validateFieldsAndNextStep = async () => {
        try {
            await form.validateFields();
            nextStep();
        } catch (error) {
            message.error('Por favor, preencha todos os campos.');
        }
    }

    const validarCPF = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);

        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    };

    const verificarLoginExistente = async (login) => {
        if (!login) {
            setLoginExistente(false);
            return;
        }

        try {
            const response = await api.get(`/professionals/check-login/${login}`);
            setLoginExistente(response.data.existe);
        } catch (error) {
            console.error('Erro ao verificar o login:', error);
        } finally {
            form.validateFields(['login']);
        }
    };


    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <>
                        <StyledFormItem
                            name="nome"
                            label="Nome"
                            rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                        >
                            <Input value={nome} onChange={e => setNome(e.target.value)} />
                        </StyledFormItem>
                        <Form.Item
                            name="cpf"
                            label="CPF"
                            rules={[
                                { required: true, message: 'Por favor, insira o CPF!' },
                                {
                                    validator: (_, value) =>
                                        validarCPF(value) ? Promise.resolve() : Promise.reject(new Error('CPF inválido!')),
                                },
                            ]}
                        >
                            <ReactInputMask
                                mask="999.999.999-99"
                                value={cpf}
                                onChange={e => setCpf(e.target.value)}
                                beforeMaskedValueChange={(newState, oldState, userInput) => {
                                    var { value } = newState;
                                    var selection = newState.selection;
                                    var cursorPosition = selection ? selection.start : null;
                                    if (value.endsWith('-') && userInput !== '-' && cursorPosition === value.length - 1) {
                                        cursorPosition = value.length - 2;
                                    }

                                    return {
                                        value,
                                        selection: { start: cursorPosition, end: cursorPosition },
                                    };
                                }}
                            >
                                {(inputProps) => <Input {...inputProps} />}
                            </ReactInputMask>
                        </Form.Item>
                        <Form.Item
                            name="dataNascimento"
                            label="Data de Nascimento"
                            rules={[{ required: true, message: 'Por favor, insira a data de nascimento!' }]}
                        >
                            <DatePicker format="DD/MM/YYYY" onChange={setDataNascimento} />
                        </Form.Item>
                        <Form.Item
                            name="celular"
                            label="Celular"
                            rules={[{ required: true, message: 'Por favor, insira seu número de celular!' }]}
                        >
                            <ReactInputMask
                                mask="(99) 9 9999-9999"
                                value={celular}
                                onChange={e => setCelular(e.target.value)}
                                placeholder="(99) 9 9999-9999"
                            >
                                {(inputProps) => <Input {...inputProps} type="tel" />}
                            </ReactInputMask>
                        </Form.Item>
                        <Form.Item name="email" label="E-Mail"
                            rules={[{ required: true, message: 'Por favor, insira o email!' }]}
                        >
                            <Input onChange={handleEmailChange} />
                        </Form.Item>
                        {emailSuggestions.length > 0 && (
                            <div style={{ marginTop: '0.5rem', background: '#f7f7f7', padding: '0.5rem' }}>
                                {emailSuggestions.map((suggestion, index) => (
                                    <div key={index} onClick={() => handleEmailSelect(suggestion)} style={{ cursor: 'pointer', padding: '0.5rem' }}>
                                        {suggestion}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                );
            case 1:
                return (
                    <>
                        <Form.Item
                            name="registro"
                            label="Registro"
                            rules={[{ required: true, message: 'Por favor, selecione o registro!' }]}
                        >
                            <Select onChange={setRegistro} placeholder="Selecione Tipo de Registro">
                                {getRegistroOptions()}
                            </Select>
                        </Form.Item>

                        {registro && (
                            <Form.Item
                                name="numeroRegistro"
                                label={`Número do ${registro}`}
                                rules={[{ required: true, message: `Por favor, insira o número do ${registro}!` }]}
                            >
                                <Input value={numeroRegistro} onChange={e => setNumeroRegistro(e.target.value)} />
                            </Form.Item>
                        )}

                        <Form.Item
                            name="estadoProfissional"
                            label="Estado"
                            rules={[{ required: true, message: 'Por favor, selecione um estado!' }]}
                        >
                            <Select value={estadoProffisionalSelecionado} onChange={setEstadoProffisionalSelecionado} placeholder="Selecione um estado">
                                {estados.map(estado => (
                                    <Select.Option key={estado.id} value={estado.sigla}>{estado.sigla}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="titulo"
                            label="Título"
                            rules={[{ required: true, message: 'Por favor, insira um Título, Ex. Cirugião Plástico' }]}
                        >
                            <Input value={titulo} onChange={e => setTitulo(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name="planosSaude"
                            label="Planos de Saúde"
                            rules={[{ required: true, message: 'Por favor, selecione pelo menos um plano de saúde!' }]}
                        >
                            <Select
                                mode="multiple"
                                showSearch
                                placeholder="Selecione os planos de saúde"
                                optionFilterProp="label"
                                filterOption={(input, option) =>
                                    option.label.toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={(value) => setSelectedPlanosIds(value)}
                                options={planosDeSaude.map((plano) => ({ label: plano.nome, value: plano.id }))}
                            />
                        </Form.Item>
                    </>
                );

            case 2:
                return (
                    <>
                        <StyledTextLine>
                            <WarningOutlined style={{ color: 'red', fontSize: '18px' }} />
                            <p> O login e senha criados a seguir serão usados para emitir atestados e declarações em seu nome, portanto não compartilhe essa senha!</p>
                        </StyledTextLine>
                        <Form.Item
                            name="login"
                            label="Login"
                            rules={[
                                { required: true, message: 'Por favor, insira um login!' },
                                () => ({
                                    validator(_, value) {
                                        if (!loginExistente) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Nome de usuário já está em uso, por favor escolha outro !'));
                                    },
                                }),
                            ]}
                        >
                            <Input
                                value={login}
                                onChange={e => {
                                    setLogin(e.target.value);
                                    setLoginExistente(false);
                                    form.validateFields(['login']);
                                }}
                                onBlur={() => verificarLoginExistente(login)}
                            />

                        </Form.Item>


                        <Form.Item
                            name="senha"
                            label="Senha"
                            rules={[
                                { required: true, message: 'Por favor, insira uma senha!' },
                                { min: 6, message: 'A senha deve ter pelo menos 6 caracteres' }
                            ]}
                        >
                            <Input.Password value={senha} onChange={e => setSenha(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name="confirmacaoSenha"
                            label="Confirmação da Senha"
                            dependencies={['senha']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'Por favor, confirme sua senha!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('senha') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('As senhas não correspondem!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password value={confirmacaoSenha} onChange={e => setConfirmacaoSenha(e.target.value)} />
                        </Form.Item>
                    </>
                );
            case 3:
                return (
                    <>
                        <Form.Item label="Assinatura">
                            <div style={{ border: '1px solid black', width: 500, marginBottom: '10px' }}>
                                <ReactSignatureCanvas
                                    ref={sigCanvas}
                                    canvasProps={{
                                        width: 500,
                                        height: 200,
                                        className: 'signatureCanvas'
                                    }}
                                />
                            </div>
                            <Button onClick={clearSignature}>Limpar</Button>
                            <Button onClick={saveSignature} style={{ marginLeft: '10px' }}>Salvar Assinatura</Button>
                        </Form.Item>
                    </>
                );

            default:
                return null;
        }
    };

    const handleSubmit = async () => {
        try {
            if (!companyID) {
                message.error('ID da empresa não encontrado. Faça o login novamente.');
                return;
            }

            const registroProfissional = `${registro} ${estadoProffisionalSelecionado} - ${numeroRegistro}`;
            const signatureWithPrefix = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
            const signatureBase64 = signatureWithPrefix.split(',')[1];

            const professionalData = {
                nome,
                cpf,
                data_de_nascimento: dataNascimento.format('DD/MM/YYYY'),
                celular,
                registro_profissional: registroProfissional,
                titulo,
                assinatura: signatureBase64,
                estado: estadoSelecionado,
                planosaude_id: selectedPlanosIds,
                company_id: companyID,
                login,
                senha,
                email: form.getFieldValue('email')
            };

            let savedProfessional;
            if (isEditMode && initialData) {
                const response = await api.put(`/professionals/${initialData.id}`, professionalData);
                message.success('Profissional atualizado com sucesso!');
                savedProfessional = response.data;
                onProfessionalSaved(savedProfessional);
            } else {
                const response = await api.post('/professionals', professionalData);
                if (response.status === 400 && response.data.error === 'Nome de usuário não está disponível!') {
                    message.error('Nome de usuário não está disponível!');
                } else {
                    message.success('Profissional salvo com sucesso!');
                    savedProfessional = response.data;
                    onProfessionalSaved(savedProfessional);
                }
            }
            onClose();
        } catch (error) {
            console.error("Erro ao salvar profissional:", error);
            if (error.response) {
                message.error(`Erro ao salvar profissional: ${error.response.status} ${error.response.statusText}`);
            } else {
                message.error('Erro ao salvar profissional');
            }
        }
    };



    const [signatureData, setSignatureData] = useState("");
    const sigCanvas = useRef(null);

    const clearSignature = () => {
        if (sigCanvas.current) {
            sigCanvas.current.clear();
            setSignatureData("");
        }
    };

    const saveSignature = () => {
        if (sigCanvas.current) {
            const signatureWithPrefix = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
            const signatureBase64 = signatureWithPrefix.split(',')[1];
            setSignatureData(signatureBase64);
            message.success('Assinatura salva com sucesso!');
        }
    };


    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => response.json())
            .then(data => setEstados(data))
            .catch(error => console.error('Erro ao buscar estados:', error));
    }, []);

    useEffect(() => {
        setIsModalVisible(isVisible);
    }, [isVisible]);

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
        } else {
            form.resetFields();
        }
    }, [initialData, form]);

    useEffect(() => {
        const fetchPlanosDeSaude = async () => {
            try {
                const response = await api.get('/planos_medicos');
                if (response.data && response.data.length > 0) {
                    const planosOrdenados = response.data.sort((a, b) => {
                        if (a.nome === 'Particular') return -1;
                        if (b.nome === 'Particular') return 1;
                        return 0;
                    });
                    setPlanosDeSaude(planosOrdenados);
                }
            } catch (error) {
                console.error('Erro ao buscar planos de saúde:', error);
            }
        };

        fetchPlanosDeSaude();
    }, []);

    useEffect(() => {
        if (!isModalVisible) {
            form.resetFields();
            setNome("");
            setCpf("");
            setDataNascimento(null);
            setRegistro("");
            setNumeroRegistro("");
            setEstadoSelecionado(null);
            setEstadoProffisionalSelecionado(null);
            setTitulo(null);
            setCelular('');
            setLogin("");
            setSenha("");
            setConfirmacaoSenha("");
            setSelectedPlanosIds([]);
            setLoginExistente(false);
            setCurrentStep(0);
        }
    }, [isModalVisible, form]);

    return (
        <StyledModal
            title={initialData ? 'Editar Profissional' : 'Adicionar Profissional'}
            open={isModalVisible}
            onCancel={onClose}
            footer={null}
            width={800}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        handleSubmit(values);
                    })
                    .catch((info) => {
                    });
            }}        >
            <Form layout="vertical" form={form}>

                {renderStepContent()}

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    {currentStep > 0 && (
                        <Button onClick={prevStep}>
                            Anterior
                        </Button>
                    )}
                    {currentStep < 3 ? (
                        <Button type="primary" onClick={validateFieldsAndNextStep}>
                            Próxima
                        </Button>
                    ) : (
                        <Button type="primary" onClick={handleSubmit}>
                            Salvar Cadastro
                        </Button>
                    )}
                </div>
            </Form>
        </StyledModal>
    );
}

export default ProfessionalModal;
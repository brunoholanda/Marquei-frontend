import React, { useEffect, useState } from 'react';
import { Select, Input, DatePicker, notification, message, Button } from 'antd';
import api from '../api/api';
import { Form } from 'antd';
import ReactInputMask from 'react-input-mask';
import { validaCpf } from 'utils/validadeDocs';
import { suggestEmails } from 'utils/commonMailDomains';
import { ActionsButtonsModal, DividerLine, ModalClientRow, ModalTitle, StyledClientModal, StyledFormClient } from './Styles';

const { Option } = Select;

const AddClientsModal = ({ isModalAddClientsVisible, onCloseAddClients, onClientAdded }) => {
    const [form] = Form.useForm();
    const [planosSaude, setPlanosSaude] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [emailSuggestions, setEmailSuggestions] = useState([]);

    const handleEmailChange = (event) => {
        const emailInput = event.target.value;
        const suggestions = suggestEmails(emailInput);
        setEmailSuggestions(suggestions);
    };

    const handleEmailSelect = (email) => {
        form.setFieldsValue({ email });
        setEmailSuggestions([]);
    };

    const handleCancel = () => {
        onCloseAddClients();
    };

    const limparCPF = (cpf) => cpf.replace(/[^\d]/g, "");

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            let planoNome = values.planodental;

            const planoExistente = planosSaude.find(plano => plano.nome === planoNome);

            if (!planoExistente) {
                await api.post(`/planos_medicos`, { nome: planoNome });
            }
            const cpfLimpo = limparCPF(values.cpf);

            const response = await api.post('/clients', {
                ...values,
                planodental: planoNome,
                cpf: cpfLimpo,
                company_id: localStorage.getItem('companyID'),
            });

            onClientAdded(response.data); // Callback to update clients list in Pacientes component

            notification.success({ message: 'Cliente cadastrado com sucesso!' });
            onCloseAddClients();
            form.resetFields();
        } catch (error) {
            console.error("Erro ao tentar salvar o cliente:", error);
            console.log("Campos com erro:", error.errorFields);
            notification.error({ message: 'CPF do Cliente já cadastrado !' });
        }
    };

    useEffect(() => {
        const fetchPlanos = async () => {
            try {
                console.log("Buscando planos de saúde");
                const response = await api.get(`/planos_medicos`);
                console.log("Resposta da API (planos de saúde):", response);

                if (response.status === 200) {
                    setPlanosSaude(response.data);
                    setFilteredOptions(response.data);
                } else {
                    throw new Error('Falha ao buscar planos de saúde');
                }
            } catch (error) {
                console.error('Erro ao buscar planos de saúde', error);
                message.error('Erro ao buscar planos de saúde');
            }
        };

        fetchPlanos();
    }, []);

    const onSearch = (value) => {
        setInputValue(value);
        if (!value) {
            setFilteredOptions(planosSaude);
        } else {
            const filtered = planosSaude.filter((plano) =>
                plano.nome.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
    };

    const onSelect = (value) => {
        setInputValue(value);
    };

    return (
        <StyledClientModal
            title={<ModalTitle>Cadastrar Novo Cliente</ModalTitle>}
            visible={isModalAddClientsVisible}
            onCancel={onCloseAddClients}
            footer={null}
            width={750}
        >
            <DividerLine />
            <StyledFormClient form={form} layout="vertical">
                <Form.Item name="nome" label="Nome"
                    rules={[{ required: true, message: 'Por favor, insira o Nome!' }]}
                >
                    <Input />
                </Form.Item>
                <ModalClientRow>
                    <Form.Item name="data_nascimento" label="Data de Nascimento"
                        rules={[{ required: true, message: 'Por favor, insira a data de nasciemnto!' }]}
                    >
                        <DatePicker format="DD/MM/YYYY" />
                    </Form.Item>
                    <Form.Item name="celular" label="Telefone"
                        rules={[{ required: true, message: 'Por favor, insira seu telefone!' }]}
                    >
                        <ReactInputMask mask="(99) 9 9999-9999" >
                            {(inputProps) => <Input {...inputProps} placeholder="(99) 9 9999-9999" />}
                        </ReactInputMask>
                    </Form.Item>
                </ModalClientRow>
                <ModalClientRow>

                    <Form.Item name="client_email" label="E-Mail"
                        rules={[{ required: true, message: 'Por favor, insira o email!' }]}
                        className='emailinput'
                    >
                        <Input onChange={handleEmailChange} />
                    </Form.Item>
                    {emailSuggestions.length > 0 && (
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {emailSuggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => handleEmailSelect(suggestion)} style={{ cursor: "pointer" }}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                    <Form.Item name="planodental" label="Plano"
                        rules={[{ required: true, message: 'Por favor, insira a forma de pagamento!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Selecione ou digite o plano"
                            onSearch={onSearch}
                            onSelect={onSelect}
                            filterOption={false}
                        >
                            {filteredOptions.map((plano) => (
                                <Option key={plano.id} value={plano.nome}>
                                    {plano.nome}
                                </Option>
                            ))}
                            {inputValue && !planosSaude.find((plano) => plano.nome === inputValue) && (
                                <Option key="new" value={inputValue}>{inputValue}</Option>
                            )}
                        </Select>
                    </Form.Item>
                </ModalClientRow>
                <Form.Item name="cpf" label="CPF"
                    rules={[
                        { required: true, message: 'Por favor, insira o CPF!' },
                        () => ({
                            validator(_, value) {
                                const cpfUnmasked = value?.replace(/[^\d]/g, "");
                                if (!value || validaCpf(cpfUnmasked)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('CPF inválido!'));
                            },
                        }),
                    ]}
                >
                    <ReactInputMask mask="999.999.999-99" >
                        {(inputProps) => <Input {...inputProps} placeholder="999.999.999-99" />}
                    </ReactInputMask>
                </Form.Item>
            </StyledFormClient>
            <DividerLine />
            <ActionsButtonsModal>
                <Button onClick={handleCancel}>Cancelar</Button>
                <Button onClick={handleOk} type='primary'>Salvar Cadastro</Button>
            </ActionsButtonsModal>
        </StyledClientModal >
    );
};

export default AddClientsModal;

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message, Checkbox, AutoComplete, Modal } from 'antd';
import moment from 'moment';
import ReactInputMask from 'react-input-mask';
import api from 'components/api/api';
import Holidays from 'date-holidays';
import {
    StyledModal,
    StyledFormItem,
    StyledSelect,
    StyledDatePicker,
    StyledTimePicker,
    StyledDateTime,
    StyledFormItemName,
} from './Styles';
import { PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import ProfessionalModal from './registerModal';
import { Navigate } from 'react-router-dom';
import PlanCard from 'components/SelerCads';
import AddClientsModal from './AddClientsModal';

const { Option } = Select;
const { TextArea } = Input;

const ScheduleModal = ({ isModalAgendaVisible, handleCancel, start }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [diasSemana, setDiasSemana] = useState([]);
    const [disabledHours, setDisabledHours] = useState([]);
    const [bookedHours, setBookedHours] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [ignoreDisabledHours, setIgnoreDisabledHours] = useState(false);
    const [patientSuggestions, setPatientSuggestions] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [planosSaude, setPlanosSaude] = useState([]);
    const [isModalProfessionalVisible, setIsModalProfessionalVisible] = useState(false);
    const [upgradeModalVisible, setUpgradeModalVisible] = useState(false); // Novo estado para controlar a visibilidade do modal de upgrade
    const [maxProfessionals, setMaxProfessionals] = useState(null);
    const [showAddClientModal, setShowAddClientModal] = useState(false);

    const userSpecialties = JSON.parse(localStorage.getItem('userSpecialties') || '[]');

    const handleOpenAddClientsModal = () => {
        setShowAddClientModal(true);
    };

    const onSearchPatientName = async (searchText) => {
        if (searchText.length < 4) {
            setPatientSuggestions([]);
            return;
        }

        try {
            const companyID = localStorage.getItem('companyID'); // Substitua 'companyID' pela chave correta se for diferente
            const response = await api.get('/clients', {
                params: {
                    company_id: companyID,
                },
            })
            const filteredPatients = response.data.filter(patient =>
                patient.nome.toLowerCase().includes(searchText.toLowerCase())
            );
            const suggestions = filteredPatients.map(patient => ({
                label: patient.nome,
                value: patient.nome,
                data: patient
            }));
            setPatientSuggestions(suggestions);
        } catch (error) {
            console.error('Erro ao buscar pacientes', error);
            message.error('Erro ao buscar pacientes');
        }
    };


    const onSelectPatient = (value, option) => {
        setSelectedPatient(option.data);
        form.setFieldsValue({
            cpf: option.data.cpf,
            celular: option.data.celular,
            planodental: option.data.planodental,
        });
    };


    const hd = new Holidays();
    hd.init('BR');

    const isHoliday = (date) => {
        const holidays = hd.getHolidays(date.year());
        return holidays.some(holiday => {
            const holidayDate = new Date(holiday.date);
            return holidayDate.getDate() === date.date() &&
                holidayDate.getMonth() === date.month() &&
                holidayDate.getFullYear() === date.year();
        });
    }

    const DAY_MAPPING = {
        'Segunda': 1,
        'Terça': 2,
        'Quarta': 3,
        'Quinta': 4,
        'Sexta': 5,
        'Sábado': 6,
        'Domingo': 0
    };

    useEffect(() => {
        if (start) {
            form.setFieldsValue({
                data: moment(start),
                horario: moment(start)
            });
        }
    }, [start, form]);


    useEffect(() => {
        if (selectedProfessional) {
            const fetchDiasSemana = async () => {
                try {
                    const response = await api.get(`/dias-semanais?professional_id=${selectedProfessional}`);
                    setDiasSemana(response.data);
                } catch (error) {
                    console.error('Erro ao buscar dias da semana', error);
                }
            };

            fetchDiasSemana();
        }
    }, [selectedProfessional]);

    const handleUpgrade = () => {
        // A lógica para redirecionar o usuário para a página de upgrade
        // Pode ser uma navegação ou abrir um novo componente/modal
        Navigate('/upgrade');
        setUpgradeModalVisible(false); // Fecha o modal após o redirecionamento
    };

    const closeUpgradeModal = () => {
        setUpgradeModalVisible(false);
    };

    const isWeekend = (date) => {
        const dayOfWeek = date.day();
        const dia = diasSemana.find(d => DAY_MAPPING[d.dia] === dayOfWeek);
        if (!dia || !dia.ativo) return true;
        return isHoliday(date);
    };

    const getDisabledHours = (selectedDate, bookedHours) => {
        if (!selectedDate || ignoreDisabledHours) return [];

        const dayOfWeek = selectedDate.day();
        const dia = diasSemana.find(d => DAY_MAPPING[d.dia] === dayOfWeek);
        const disabledHours = [];

        if (!dia || !dia.ativo) {
            return [...Array(24).keys()];
        }

        const startAM = dia.startam ? parseInt(dia.startam.split(":")[0], 10) : 0;
        const endAM = dia.endam ? parseInt(dia.endam.split(":")[0], 10) : 11;
        const startPM = dia.startpm ? parseInt(dia.startpm.split(":")[0], 10) : 12;
        const endPM = dia.endpm ? parseInt(dia.endpm.split(":")[0], 10) : 23;

        for (let hour = 0; hour < 24; hour++) {
            if ((hour < startAM) || (hour >= endAM && hour < startPM) || (hour > endPM)) {
                disabledHours.push(hour);
            }
        }

        bookedHours.forEach(hour => {
            if (!disabledHours.includes(hour)) {
                disabledHours.push(hour);
            }
        });

        return disabledHours;
    };


    const handleDateChange = async (date) => {
        const formattedDate = date.format('DD/MM/YYYY');

        if (selectedProfessional && !ignoreDisabledHours) {
            try {
                const response = await api.get('/agendamentos', {
                    params: {
                        data: formattedDate,
                        professional_id: selectedProfessional
                    }
                });
                const hours = response.data.map(item => moment(item.horario, 'HH:mm').hour());
                setBookedHours(hours);
            } catch (error) {
                console.error('Erro ao buscar horários agendados', error);
                message.error('Erro ao buscar horários agendados');
            }
        }

        setDisabledHours(getDisabledHours(date, bookedHours));
    };

    useEffect(() => {
        if (form.getFieldValue('data')) {
            setDisabledHours(getDisabledHours(form.getFieldValue('data'), bookedHours));
        }
    }, [ignoreDisabledHours, bookedHours, form]);

    const onFinish = async (values) => {
        setLoading(true);

        try {
            const storedCompanyID = localStorage.getItem('companyID');

            const clientData = {
                nome: values.nome,
                cpf: values.cpf.replace(/\D/g, ''),
                celular: values.celular.replace(/\D/g, ''),
                planodental: values.planodental,
                company_id: storedCompanyID
            };

            const data = values.data.format('DD/MM/YYYY');
            const horario = values.horario.format('HH:mm');
            const agendamentoData = {
                ...values,
                data,
                horario,
                professional_id: selectedProfessional,
                company_id: storedCompanyID
            };

            let clientResponse = await api.get(`/clients/cpf/${clientData.cpf}`).catch(error => error.response);

            if (clientResponse && clientResponse.status === 404) {
                clientResponse = await api.post('/clients', clientData);
            }

            if (clientResponse && clientResponse.data && clientResponse.data.id) {
                agendamentoData.client_id = clientResponse.data.id;

                const agendamentoResponse = await api.post('/agendamentos', agendamentoData);

                if (agendamentoResponse.data && agendamentoResponse.data.error) {
                    message.error(agendamentoResponse.data.error);
                } else {
                    message.success('Agendamento feito com sucesso!');
                    form.resetFields();
                    resetAndCloseModal();
                }
            } else {
                throw new Error(clientResponse.data.message || 'Erro ao criar ou recuperar o cliente.');
            }
        } catch (error) {
            console.error('Erro no processo de agendamento:', error);
            message.error(error.message || 'Erro ao enviar o agendamento');
        } finally {
            setLoading(false);
        }
    };

    function validaCPF(cpf) {
        if (typeof cpf !== 'string') return false;
        cpf = cpf.replace(/[\s.-]*/gim, '');
        if (
            !cpf ||
            cpf.length !== 11 ||
            cpf === '00000000000' ||
            cpf === '11111111111' ||
            cpf === '22222222222' ||
            cpf === '33333333333' ||
            cpf === '44444444444' ||
            cpf === '55555555555' ||
            cpf === '66666666666' ||
            cpf === '77777777777' ||
            cpf === '88888888888' ||
            cpf === '99999999999'
        ) {
            return false;
        }
        var soma = 0;
        var resto;
        for (var i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        soma = 0;
        for (var i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    }


    const [disabledDatesInfo, setDisabledDatesInfo] = useState([]);
    useEffect(() => {
        const fetchDisabledDates = async () => {
            if (!selectedProfessional) {
                setDisabledDatesInfo([]);
                return;
            }

            try {
                const response = await api.get(`/disabledDates?professional_id=${selectedProfessional}`);
                const datesInfo = response.data.map(item => ({
                    date: moment(item.date, 'DD/MM/YYYY'),
                    allDay: item.allday,
                    startTime: item.starttime,
                    endTime: item.endtime
                }));
                setDisabledDatesInfo(datesInfo);
            } catch (error) {
                console.error('Erro ao buscar datas desabilitadas', error);
            }
        };

        fetchDisabledDates();
    }, [selectedProfessional]);

    const disabledDate = (current) => {
        if (ignoreDisabledHours) {
            return false;
        }

        const dateInfo = disabledDatesInfo.find(info => current.isSame(info.date, 'day'));

        return current && (
            current < moment().startOf('day') ||
            isWeekend(current) ||
            (dateInfo && dateInfo.allDay)
        );
    };

    const resetAndCloseModal = () => {
        form.resetFields();
        setIgnoreDisabledHours(false);
        setDisabledHours([]);
        setBookedHours([]);
        setSelectedProfessional(null);
        setPatientSuggestions([]);
        setSelectedPatient(null);
        handleCancel();
    };

    useEffect(() => {
        const fetchProfessionals = async () => {
            const storedCompanyID = localStorage.getItem('companyID');

            try {
                const response = await api.get(`/professionals?company_id=${storedCompanyID}`);

                if (response.status !== 200) {
                    throw new Error('Falha ao buscar dados dos profissionais');
                }
                setProfessionals(response.data);
            } catch (error) {
                console.error('Error fetching professionals:', error);
            }
        };

        fetchProfessionals();
    }, []);

    const fetchPlanosSaude = async (professionalId) => {
        try {
            const response = await api.get(`/professionals/${professionalId}/planos`);
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Falha ao buscar planos de saúde do profissional');
            }
        } catch (error) {
            console.error('Erro ao buscar planos de saúde', error);
            message.error('Erro ao buscar planos de saúde');
            return [];
        }
    };

    const openModalProfessional = () => {
        if (professionals.length >= maxProfessionals) {
            // Abre o modal de upgrade em vez de exibir uma mensagem de aviso
            setUpgradeModalVisible(true);
            return;
        }
        setSelectedProfessional(null);
        setIsModalProfessionalVisible(true);
    };

    const closeModalProfessional = () => {
        setIsModalProfessionalVisible(false);
        setSelectedProfessional(null);
    };

    useEffect(() => {
        const fetchMaxProfessionals = async () => {
            const storedCompanyID = localStorage.getItem('companyID');
            const token = localStorage.getItem('authToken');

            if (storedCompanyID && token) {
                setLoading(true);
                try {
                    // Primeiro, busca os dados da empresa para obter o service_id
                    const companyResponse = await api.get(`/companies/${storedCompanyID}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const serviceId = companyResponse.data.service_id;

                    // Segundo, busca os dados do serviço para obter o número máximo de profissionais
                    const serviceResponse = await api.get(`/service_details/${serviceId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setMaxProfessionals(serviceResponse.data.persons);
                } catch (error) {
                    console.error('Erro ao buscar o número máximo de profissionais:', error);
                    message.error('Erro ao buscar informações do serviço');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchMaxProfessionals();
    }, []);


    return (
        <StyledModal
            title="Agendar Consulta Para Paciente 👩‍⚕️"
            visible={isModalAgendaVisible}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={resetAndCloseModal}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()}>
                    Agendar
                </Button>,
            ]}
            style={{ top: '5%' }}
        >
            <Form
                form={form}
                name="agendamento"
                layout="vertical"
                onFinish={onFinish}
            >
                <StyledFormItemName>
                    <StyledFormItem
                        name="nome"
                        rules={[{ required: true, message: 'Por favor, insira o nome do paciente!' }]}
                    >
                        <AutoComplete
                            placeholder="&#128269; Nome do paciente"
                            onSearch={onSearchPatientName}
                            onSelect={onSelectPatient}
                            options={patientSuggestions}
                            style={{ width: '100%' }}
                        />
                    </StyledFormItem>
                    <Button
                        style={{ marginLeft: '15px' }}
                        type='primary'
                        onClick={handleOpenAddClientsModal}
                    >
                        <PlusOutlined /> Adicionar Cliente
                    </Button>
                </StyledFormItemName>
                <StyledFormItem
                    name="cpf"
                    label="CPF"
                    rules={[
                        { required: true, message: 'Por favor, insira seu CPF!' },
                        { validator: (_, value) => validaCPF(value) ? Promise.resolve() : Promise.reject('CPF inválido!') }
                    ]}
                >
                    <ReactInputMask mask="999.999.999-99" placeholder="000.000.000-00">
                        {(inputProps) => <Input {...inputProps} type="text" />}
                    </ReactInputMask>
                </StyledFormItem>
                <StyledSelect
                    showSearch
                    style={{ width: 200, marginBottom: 20 }}
                    placeholder="Selecione um profissional"
                    optionFilterProp="children"
                    onChange={async (value) => {
                        if (value) {
                            setSelectedProfessional(value);
                            const planos = await fetchPlanosSaude(value);
                            setPlanosSaude(planos);
                            form.setFieldsValue({ planodental: '' });
                        }
                    }}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    value={selectedProfessional}
                >
                    {professionals.map((professional) => (
                        <Option key={professional.id} value={professional.id}>
                            {professional.nome}
                        </Option>
                    ))}
                </StyledSelect>
                <Button style={{ margin: '0 10px 10px 10px' }} type="primary" onClick={openModalProfessional}>
                    <UserAddOutlined />Adicionar Profissional
                </Button>
                <ProfessionalModal
                    isVisible={isModalProfessionalVisible}
                    onClose={closeModalProfessional}
                    initialData={selectedProfessional}
                    userSpecialties={userSpecialties}

                />
                <StyledFormItem
                    name="ignoreDisabledHours"
                    valuePropName="checked"
                >
                    <Checkbox onChange={(e) => setIgnoreDisabledHours(e.target.checked)}>
                        Ignorar Horários Desabilitados e ja Agendados
                    </Checkbox>
                </StyledFormItem>
                <StyledDateTime>
                    <StyledFormItem
                        name="data"
                        label="Data"
                        rules={[{ required: true, message: 'Por favor, selecione uma data!' }]}
                    >
                        <StyledDatePicker
                            key={ignoreDisabledHours ? 'ignore' : 'normal'} // Isso força a rerenderização
                            format="DD/MM/YYYY"
                            disabledDate={disabledDate}
                            onChange={handleDateChange}
                        />
                    </StyledFormItem>

                    <StyledFormItem
                        name="horario"
                        label="Horário"
                        rules={[{ required: true, message: 'Por favor, selecione um horário!' }]}
                    >
                        <StyledTimePicker
                            format="HH:mm"
                            minuteStep={15}
                            disabledHours={() => getDisabledHours(form.getFieldValue('data'), bookedHours)}
                        />
                    </StyledFormItem>
                </StyledDateTime>
                <StyledFormItem
                    name="planodental"
                    rules={[{ required: true, message: 'Por favor, selecione uma forma de pagamento!' }]}
                >
                    <StyledSelect placeholder="Forma de pagamento">
                        {planosSaude.map((plano) => (
                            <Option key={plano.id} value={plano.nome}>
                                {plano.nome}
                            </Option>
                        ))}
                    </StyledSelect>
                </StyledFormItem>

                <StyledFormItem
                    name="celular"
                    label="Celular"
                    rules={[{ required: true, message: 'Por favor, insira seu número de celular!' }]}
                >
                    <ReactInputMask mask="(99) 9 9999-9999" placeholder="(99) 9 9999-9999">
                        {(inputProps) => <Input {...inputProps} type="tel" />}
                    </ReactInputMask>
                </StyledFormItem>
                <StyledFormItem
                    name="motivo"
                    label="Motivo da Consulta"
                    rules={[
                        { required: true, message: 'Por favor, descreva o motivo da consulta!' },
                    ]}
                >
                    <TextArea
                        placeholder="Descreva o motivo da consulta em poucas palavras"
                        rows={2}
                        maxLength={90}
                    />
                </StyledFormItem>
            </Form>
            <Modal
                title="Limite de Profissionais Atingido"
                visible={upgradeModalVisible}
                onCancel={closeUpgradeModal}
                footer={[
                    <Button key="back" onClick={closeUpgradeModal}>
                        Cancelar
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleUpgrade}>
                        Fazer Upgrade
                    </Button>,
                ]}
            >
                <p>Seu plano contratado só permite até {maxProfessionals} profissionais. Caso sua clínica esteja crescendo, faça um upgrade do seu plano.</p>
                <PlanCard maxProfessionals={maxProfessionals} />
            </Modal>
            <AddClientsModal
                isModalAddClientsVisible={showAddClientModal}
                onCloseAddClients={() => setShowAddClientModal(false)}
            />
        </StyledModal >
    );
};

export default ScheduleModal;

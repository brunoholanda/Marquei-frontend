import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message, Checkbox, AutoComplete, Modal, notification, Radio } from 'antd';
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
    StyledTimeContainer,
} from './Styles';
import { UserAddOutlined } from '@ant-design/icons';
import ProfessionalModal from './registerModal';
import { Navigate } from 'react-router-dom';
import PlanCard from 'components/SelerCads';
import AddClientsModal from './AddClientsModal';
import { useAuth } from 'context/AuthContext';
import CryptoJS from 'crypto-js';
import { suggestEmails } from 'utils/commonMailDomains';


const { Option } = Select;
const { TextArea } = Input;

const ScheduleModal = ({ isModalAgendaVisible, handleCancel, start, end }) => {
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
    const { authData } = useAuth();
    const companyID = authData.companyID;
    const userSpecialties = authData.userSpecialties || [];
    const [emailSuggestions, setEmailSuggestions] = useState([]);
    const [selectedEnderecoId, setSelectedEnderecoId] = useState(null);
    const [enderecos, setEnderecos] = useState([]);
    const [selectedEnderecos, setSelectedEnderecos] = useState({});
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [startTime, setStartTime] = useState(null);


    const getDisabledEndTimeHours = () => {
        const startTime = form.getFieldValue('horario');
        if (!startTime) {
            return [];
        }

        const startHour = startTime.hour();
        const disabledHours = [];

        for (let hour = 0; hour <= startHour; hour++) {
            disabledHours.push(hour);
        }

        return disabledHours;
    };


    const handleEmailChange = (event) => {
        const emailInput = event.target.value;
        const suggestions = suggestEmails(emailInput);
        setEmailSuggestions(suggestions);
    };

    const handleEmailSelect = (email) => {
        form.setFieldsValue({ email });
        setEmailSuggestions([]);
    };


    const onSearchPatientName = async (searchText) => {
        if (searchText.length < 4) {
            setPatientSuggestions([]);
            return;
        }

        try {
            if (companyID) {
                const response = await api.get('/clients-name', {
                    params: {
                        company_id: companyID,
                    },
                });
                const filteredPatients = response.data.filter(patient =>
                    patient.nome.toLowerCase().includes(searchText.toLowerCase())
                );
                const suggestions = filteredPatients.map(patient => ({
                    label: patient.nome,
                    value: patient.nome,
                    data: patient
                }));
                setPatientSuggestions(suggestions);
            } else {
                console.error('Company ID not found in context');
            }
        } catch (error) {
            console.error('Erro ao buscar pacientes', error);
            message.error('Erro ao buscar pacientes');
        }
    };


    const onSelectPatient = (value, option) => {
        setSelectedPatient(option?.data);
        form.setFieldsValue({
            email: option.data?.client_email,
            celular: option.data?.celular,
            planodental: option.data?.planodental,
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
        if (end) {
            form.setFieldsValue({
                end_time: moment(end)
            });
        }
    }, [start, end, form]);



    useEffect(() => {
        const fetchDiasSemana = async () => {
            try {
                let params = { professional_id: selectedProfessional };

                if (enderecos.length > 0 && selectedEnderecoId) {
                    params.endereco_id = selectedEnderecoId;
                }

                const response = await api.get(`/dias-semanais`, { params });
                setDiasSemana(response.data);
            } catch (error) {
                console.error('Erro ao buscar dias da semana', error);
            }
        };

        if (selectedProfessional) {
            fetchDiasSemana();
        }
    }, [selectedProfessional, selectedEnderecoId, enderecos.length]);



    const handleUpgrade = () => {
        Navigate('/upgrade');
        setUpgradeModalVisible(false);
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

    useEffect(() => {
        const fetchEnderecos = async () => {
            try {
                const response = await api.get(`/enderecos/professional/${selectedProfessional}`);
                const fetchedEnderecos = response.data || [];
                setEnderecos(fetchedEnderecos);

                if (fetchedEnderecos.length === 1) {
                    const uniqueEnderecoId = fetchedEnderecos[0].id;
                    const updatedSelectedEnderecos = daysOfWeek.reduce((acc, day) => {
                        acc[day.id] = uniqueEnderecoId;
                        return acc;
                    }, {});

                    setSelectedEnderecos(updatedSelectedEnderecos);
                }
            } catch (error) {
                console.error('Erro ao carregar endereços:', error);
                message.error('Erro ao carregar endereços.');
            }
        };

        if (selectedProfessional) {
            fetchEnderecos();
        }
    }, [selectedProfessional, daysOfWeek]);


    const onFinish = async (values) => {
        setLoading(true);
        try {
            const clientData = {
                nome: values.nome,
                client_email: values.email,
                celular: values.celular.replace(/\D/g, ''),
                planodental: values.planodental,
                company_id: companyID
            };

            const data = values.data.format('DD/MM/YYYY');
            const horario = values.horario.format('HH:mm');
            const end_time = values.end_time.format('HH:mm');

            const agendamentoData = {
                ...values,
                data,
                horario,
                end_time,
                professional_id: selectedProfessional,
                company_id: companyID
            };

            let clientResponse = await api.get(`/clients/email/${clientData.client_email}?company_id=${clientData.company_id}`).catch(error => error.response);

            if (clientResponse && clientResponse.status === 404) {
                clientResponse = await api.post('/clients', clientData);
            }

            if (clientResponse && clientResponse.data && clientResponse.data.id) {
                agendamentoData.client_id = clientResponse.data.id;
                const agendamentoResponse = await api.post('/agendamentos', agendamentoData);
                if (agendamentoResponse.data && agendamentoResponse.data.error) {
                    message.error(agendamentoResponse.data.error);
                } else {
                    notification.success({ message: 'Agendamento feito com sucesso!' });
                    form.resetFields();
                    resetAndCloseModal();
                }
            } else {
                console.error('Erro na resposta do cliente:', clientResponse);
                throw new Error(clientResponse.data.message || 'Erro ao criar ou recuperar o cliente.');
            }
        } catch (error) {
            console.error('Erro no processo de agendamento:', error);
            message.error(error.message || 'Erro ao enviar o agendamento');
        } finally {
            setLoading(false);
        }
    };

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
        form.resetFields(['data', 'horario', 'nome', 'email', 'celular', 'planodental', 'motivo', 'end_time']);
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
            try {
                setLoading(true);
                const response = await api.get(`/professionals?company_id=${companyID}`);

                if (response.status !== 200) {
                    throw new Error('Falha ao buscar dados dos profissionais');
                }
                const secretKey = import.meta.env.VITE_APP_SECRET_KEY;
                const bytes = CryptoJS.AES.decrypt(response.data, secretKey);
                const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                setProfessionals(decryptedData);

                if (decryptedData.length === 1) {
                    const singleProfessionalId = decryptedData[0].id;
                    setSelectedProfessional(singleProfessionalId);
                    const planos = await fetchPlanosSaude(singleProfessionalId);
                    setPlanosSaude(planos);
                    form.setFieldsValue({ professional: singleProfessionalId, planodental: '' });
                }
            } catch (error) {
                console.error('Error fetching professionals:', error);
                message.error('Erro ao buscar dados dos profissionais');
            } finally {
                setLoading(false);
            }
        };
        fetchProfessionals();
    }, [companyID]);


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


            if (companyID && authData.authToken) {
                setLoading(true);
                try {
                    const companyResponse = await api.get(`/companies/${companyID}`, {
                        headers: {
                            'Authorization': `Bearer ${authData.authToken}`
                        }
                    });
                    const serviceId = companyResponse.data.service_id;

                    const serviceResponse = await api.get(`/service_details/${serviceId}`, {
                        headers: {
                            'Authorization': `Bearer ${authData.authToken}`
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
    }, [companyID, authData.authToken]);

    const onCancelModal = () => {
        resetAndCloseModal();
        handleCancel();
    };

    const handleEnderecoSelection = (e) => {
        setSelectedEnderecoId(e.target.value);
    };

    return (
        <StyledModal
            title="Agendar Consulta Para Paciente 👩‍⚕️"
            open={isModalAgendaVisible}
            onCancel={onCancelModal}
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
                    {/* 
<Button
    style={{ marginLeft: '15px' }}
    type='primary'
    onClick={handleOpenAddClientsModal}
>
    <PlusOutlined /> Adicionar Cliente
</Button>
*/}
                </StyledFormItemName>
                <StyledFormItem
                    name="email"
                    label="E-mail"
                    rules={[
                        { required: true, message: 'Por favor, insira seu e-mail!' },
                        { type: 'email', message: 'Por favor, insira um e-mail válido!' }
                    ]}
                >
                    <Input placeholder="Seu e-mail" onChange={handleEmailChange} />
                </StyledFormItem>
                {emailSuggestions.length > 0 && (
                    <div style={{ marginTop: '0.5rem', background: '#f7f7f7', padding: '0.5rem' }}>
                        {emailSuggestions.map((suggestion, index) => (
                            <div key={index} onClick={() => handleEmailSelect(suggestion)} style={{ cursor: 'pointer', padding: '0.5rem' }}>
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
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
                <div style={{ margin: '10px 0' }}>
                    <Radio.Group onChange={handleEnderecoSelection} value={selectedEnderecoId}>
                        {enderecos.map(endereco => (
                            <Radio
                                key={endereco.id}
                                value={endereco.id}
                            >
                                {`${endereco.rua}, ${endereco.numero} - ${endereco.cidade}/${endereco.uf}`}
                            </Radio>
                        ))}
                    </Radio.Group>
                </div>
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
                            key={ignoreDisabledHours ? 'ignore' : 'normal'}
                            format="DD/MM/YYYY"
                            disabledDate={disabledDate}
                            onChange={handleDateChange}
                        />
                    </StyledFormItem>
                </StyledDateTime>
                <StyledTimeContainer>
                    <StyledFormItem
                        name="horario"
                        label="Horário de Início"
                        rules={[{ required: true, message: 'Por favor, selecione um horário!' }]}
                    >
                        <StyledTimePicker
                            format="HH:mm"
                            minuteStep={5}
                            onChange={(time) => setStartTime(time)}

                            disabledTime={() => ({
                                disabledHours: () => getDisabledHours(form.getFieldValue('data'), bookedHours)
                            })}
                        />
                    </StyledFormItem>

                    <StyledFormItem
                        name="end_time"
                        label="Horário Final"
                        rules={[
                            { required: true, message: 'Por favor, selecione o horário final!' },
                        ]}
                    >
                        <StyledTimePicker
                            format="HH:mm"
                            minuteStep={5}
                            disabledTime={() => {
                                const hours = [];
                                const minutes = [];
                                if (startTime) {
                                    const startHour = startTime.hour();
                                    const startMinute = startTime.minute();

                                    for (let i = 0; i < startHour; i++) {
                                        hours.push(i);
                                    }

                                    if (form.getFieldValue('horario')?.hour() === startHour) {
                                        for (let i = 0; i <= startMinute; i++) {
                                            minutes.push(i);
                                        }
                                    }
                                }

                                return {
                                    disabledHours: () => hours,
                                    disabledMinutes: () => minutes,
                                };
                            }}
                        />

                    </StyledFormItem>
                </StyledTimeContainer>
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
                open={upgradeModalVisible}
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

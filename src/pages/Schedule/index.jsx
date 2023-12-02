import React, { useEffect, useState } from 'react';
import { Form, Input, Button, TimePicker, DatePicker, Select, message, Modal } from 'antd';
import moment from 'moment';
import ReactInputMask from 'react-input-mask';
import './schedule.css';
import api from 'components/api/api';
import { useNavigate } from 'react-router-dom';
import Holidays from 'date-holidays';


const { Option } = Select;
const { TextArea } = Input;

const Schedule = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [diasSemana, setDiasSemana] = useState([]);
  const [disabledHours, setDisabledHours] = useState([]);
  const [bookedHours, setBookedHours] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [companyID, setCompanyID] = useState(null);
  const [planosSaude, setPlanosSaude] = useState([]);

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
    if (selectedProfessional) { // Apenas prosseguir se selectedProfessional não for null
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
  }, [selectedProfessional]); // Dependência para o useEffect, reagindo às mudanças de selectedProfessional


  const isWeekend = (date) => {
    const dayOfWeek = date.day();
    const dia = diasSemana.find(d => DAY_MAPPING[d.dia] === dayOfWeek);
    if (!dia || !dia.ativo) return true;
    return isHoliday(date);
  };

  const getDisabledHours = (selectedDate, bookedHours) => {
    if (!selectedDate) return [];

    const dayOfWeek = selectedDate.day();
    const dia = diasSemana.find(d => DAY_MAPPING[d.dia] === dayOfWeek);
    const disabledHours = [];

    if (!dia || !dia.ativo) {
      return [...Array(24).keys()];
    }

    // Define as horas de funcionamento com base nas informações do dia
    const startAM = dia.startam ? parseInt(dia.startam.split(":")[0], 10) : 0;
    const endAM = dia.endam ? parseInt(dia.endam.split(":")[0], 10) : 11;
    const startPM = dia.startpm ? parseInt(dia.startpm.split(":")[0], 10) : 12;
    const endPM = dia.endpm ? parseInt(dia.endpm.split(":")[0], 10) : 23;

    for (let hour = 0; hour < 24; hour++) {
      if ((hour < startAM) || (hour >= endAM && hour < startPM) || (hour > endPM)) {
        disabledHours.push(hour);
      }
    }

    // Desabilita as horas dos agendamentos já existentes
    bookedHours.forEach(hour => {
      if (!disabledHours.includes(hour)) {
        disabledHours.push(hour);
      }
    });

    return disabledHours;
  };


  const handleDateChange = async (date) => {
    const formattedDate = date.format('DD/MM/YYYY'); // Formato da data ajustado para corresponder ao banco de dados

    if (selectedProfessional) {
      try {
        const response = await api.get('/agendamentos', {
          params: {
            data: formattedDate,
            professional_id: selectedProfessional
          }
        });
        const hours = response.data.map(item => moment(item.horario, 'HH:mm').hour());
        setBookedHours(hours);
        setDisabledHours(getDisabledHours(date, hours)); // Atualiza as horas desabilitadas com as horas agendadas
      } catch (error) {
        console.error('Erro ao buscar horários agendados', error);
        message.error('Erro ao buscar horários agendados');
      }
    }
  };

  const onFinish = async (values) => {
    setLoading(true);

    try {

      const clientData = {
        nome: values.nome,
        cpf: values.cpf.replace(/\D/g, ''),
        celular: values.celular.replace(/\D/g, ''),
        planodental: values.planodental,
      };

      const data = values.data.format('DD/MM/YYYY');
      const horario = values.horario.format('HH:mm');
      const agendamentoData = {
        ...values,
        data,
        horario,
        professional_id: selectedProfessional,
        company_id: 1
      };

      // Verificar se o cliente já existe
      let clientResponse = await api.get(`/clients/cpf/${clientData.cpf}`).catch(error => error.response);

      // Se o cliente não existir, criar um novo
      if (clientResponse && clientResponse.status === 404) {
        clientResponse = await api.post('/clients', clientData);
      }

      // Se tivermos uma resposta do cliente, seja um existente ou um novo, prosseguir com o agendamento
      if (clientResponse && clientResponse.data && clientResponse.data.id) {
        // Incluir o ID do cliente nos dados do agendamento
        agendamentoData.client_id = clientResponse.data.id;

        // Criar o agendamento
        const agendamentoResponse = await api.post('/agendamentos', agendamentoData);

        // Verificar a resposta do agendamento e agir de acordo
        if (agendamentoResponse.data && agendamentoResponse.data.error) {
          message.error(agendamentoResponse.data.error);
        } else {
          message.success('Agendamento feito com sucesso!');
          form.resetFields();
          setModalVisible(true);
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

  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

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
    const dateInfo = disabledDatesInfo.find(info => current.isSame(info.date, 'day'));

    return current && (
      current < moment().startOf('day') ||
      isWeekend(current) ||
      (dateInfo && dateInfo.allDay)
    );
  };


  useEffect(() => {
    const fetchProfessionals = async () => {
      const desiredCompanyID = '1';

      try {
        const response = await api.get(`/professionals?company_id=${desiredCompanyID}`);

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
        return response.data; // Supondo que a resposta seja um array de planos de saúde
      } else {
        throw new Error('Falha ao buscar planos de saúde do profissional');
      }
    } catch (error) {
      console.error('Erro ao buscar planos de saúde', error);
      message.error('Erro ao buscar planos de saúde');
      return [];
    }
  };



  return (
    <Form
      form={form}
      name="agendamento"
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="nome"
        label="Nome e Sobrenome"
        rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
      >
        <Input placeholder="Seu nome e sobrenome" />
      </Form.Item>
      <Form.Item
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
      </Form.Item>
      <Select
        showSearch
        style={{ width: 200, marginBottom: 20 }}
        placeholder="Selecione um profissional"
        optionFilterProp="children"
        onChange={async (value) => {
          if (value) {
            setSelectedProfessional(value);
            const planos = await fetchPlanosSaude(value);
            setPlanosSaude(planos);
            // Reset o campo do plano de saúde no formulário, se necessário
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
      </Select>

      <Form.Item
        name="data"
        label="Data"
        rules={[{ required: true, message: 'Por favor, selecione uma data!' }]}
      >
        <DatePicker
          format="DD/MM/YYYY"
          disabledDate={disabledDate}
          onChange={handleDateChange}
        />
      </Form.Item>

      <Form.Item
        name="horario"
        label="Horário"
        rules={[{ required: true, message: 'Por favor, selecione um horário!' }]}
      >
        <TimePicker
          format="HH:mm"
          minuteStep={15}
          disabledHours={() => getDisabledHours(form.getFieldValue('data'), bookedHours)}
        />
      </Form.Item>

      <Form.Item
        name="planodental"
        rules={[{ required: true, message: 'Por favor, selecione um plano dental!' }]}
      >
        <Select placeholder="Selecione seu plano dental">
          {planosSaude.map((plano) => (
            <Option key={plano.id} value={plano.nome}>
              {plano.nome}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="celular"
        label="Celular"
        rules={[{ required: true, message: 'Por favor, insira seu número de celular!' }]}
      >
        <ReactInputMask mask="(99) 9 9999-9999" placeholder="(99) 9 9999-9999">
          {(inputProps) => <Input {...inputProps} type="tel" />}
        </ReactInputMask>
      </Form.Item>
      <Form.Item
        name="motivo"
        label="Motivo da Consulta"
        rules={[
          { required: true, message: 'Por favor, descreva o motivo da consulta!' },
        ]}
      >
        <TextArea
          placeholder="Descreva o motivo da consulta em poucas palavras"
          rows={4}
          maxLength={90}
        />

      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Agendar
        </Button>
      </Form.Item>
      <Modal
        title="Agendamento Recebido!"
        visible={isModalVisible}
        onOk={() => {
          setModalVisible(false);
          navigate('/');
        }}
        onCancel={() => setModalVisible(false)}
        okText="Fechar"
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '50px', color: 'green' }}>
            ✓
          </div>
        </div>
        Seu agendamento foi recebido com sucesso! Agora é só aguardar que entraremos em contato com você em até 24 horas antes da consulta. Fique à vontade para entrar em contato em nosso número (83) 9 9631-1573.
      </Modal>

    </Form>
  );
};

export default Schedule;

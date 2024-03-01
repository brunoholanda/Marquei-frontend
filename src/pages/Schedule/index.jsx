  import React, { useEffect, useState } from 'react';
  import { Form, Input, Button, TimePicker, DatePicker, Select, message, Modal } from 'antd';
  import moment from 'moment';
  import ReactInputMask from 'react-input-mask';
  import './schedule.css';
  import api from 'components/api/api';
  import { useNavigate, useParams } from 'react-router-dom';
  import Holidays from 'date-holidays';
  import { StyledFormClient } from './Style';


  const { Option } = Select;
  const { TextArea } = Input;

  const Schedule = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [diasSemana, setDiasSemana] = useState([]);
    const [disabledHours, setDisabledHours] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [planosSaude, setPlanosSaude] = useState([]);
    const [professionalInterval, setProfessionalInterval] = useState(0);
    const { company_id } = useParams();


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


    const isWeekend = (date) => {
      const dayOfWeek = date.day();
      const dia = diasSemana.find(d => DAY_MAPPING[d.dia] === dayOfWeek);
      if (!dia || !dia.ativo) return true;
      return isHoliday(date);
    };

    useEffect(() => {
      if (selectedProfessional) {
        const fetchProfessionalInterval = async () => {
          try {
            const response = await api.get(`/professional-intervals/professional/${selectedProfessional}`);
            setProfessionalInterval(response.data.intervalo);
          } catch (error) {
            console.error('Erro ao buscar intervalo do profissional', error);
          }
        };

        fetchProfessionalInterval();
      }
    }, [selectedProfessional]);

    const getDisabledHours = (selectedDate, bookedHours, professionalInterval) => {
      if (!selectedDate) return [];

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

      bookedHours.forEach(bookedHour => {

        if (!disabledHours.includes(bookedHour)) {
          disabledHours.push(bookedHour);
        }
        // Desabilitar horas dentro do intervalo
        for (let i = 1; i < professionalInterval; i++) {
          const intervalHour = bookedHour + i;

          if (intervalHour < 24 && !disabledHours.includes(intervalHour)) {
            disabledHours.push(intervalHour);
          }
        }
      });

      return disabledHours;
    };


    const handleDateChange = async (date) => {
      const formattedDate = date.format('DD/MM/YYYY');

      if (selectedProfessional) {
        try {
          const intervalResponse = await api.get(`/professional-intervals/professional/${selectedProfessional}`);
          const intervalString = intervalResponse.data.intervalo;
          const professionalInterval = parseInt(intervalString.split(":")[0], 10); // Converte "02:00" para 2

          const appointmentsResponse = await api.get('/agendamentos/occupied-hours', {
            params: {
              data: formattedDate,
              professional_id: selectedProfessional
            }
          });
          const hours = appointmentsResponse.data.map(item => moment(item.horario, 'HH:mm').hour());
          setDisabledHours(getDisabledHours(date, hours, professionalInterval));
        } catch (error) {
          console.error('Erro ao buscar horários agendados ou intervalo do profissional', error);
          message.error('Erro ao buscar horários agendados ou intervalo do profissional');
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
          company_id: company_id,

        };

        const data = values.data.format('DD/MM/YYYY');
        const horario = values.horario.format('HH:mm');
        const agendamentoData = {
          ...values,
          data,
          horario,
          professional_id: selectedProfessional,
          company_id: company_id,
        };

        const intervalResponse = await api.get(`/professional-intervals/professional/${selectedProfessional}`);
        const intervalo = intervalResponse.data.intervalo;

        const startTime = moment(horario, 'HH:mm');
        const endTime = startTime.add(moment.duration(intervalo));
        const formattedEndTime = endTime.format('HH:mm');

        agendamentoData.end_time = formattedEndTime;

        let clientResponse = await api.get(`/clients/cpf/${clientData.cpf}?company_id=${clientData.company_id}`).catch(error => error.response);

        if (clientResponse && clientResponse.status === 404) {
          clientResponse = await api.post('/clients', clientData);
        }

        if (clientResponse && clientResponse.data && clientResponse.data.id) {
          agendamentoData.client_id = clientResponse.data.id;

          // Criar o agendamento
          const agendamentoResponse = await api.post('/agendamentos', agendamentoData);

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

        try {
          const response = await api.get(`/professionals?company_id=${company_id}`);

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



    return (
      <StyledFormClient>
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
              minuteStep={5}
              disabledHours={() => disabledHours}
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
      </StyledFormClient>
    );
  };

  export default Schedule;

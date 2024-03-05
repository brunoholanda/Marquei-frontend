import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, message, Checkbox, Modal, Tooltip } from 'antd';
import styles from './RegisterScreen.css';
import { BASE_URL } from 'config';
import { useNavigate } from 'react-router-dom';
import ReactInputMask from 'react-input-mask';
import logo from '../../public/logo.png'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import computerPhone from '../../public/computerPhone.png';
const { Option } = Select;


const RegisterScreen = () => {
  const [form] = Form.useForm();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const [documentType, setDocumentType] = useState('cpf');
  const [documentTypeLabel, setDocumentTypeLabel] = useState('Digite o CPF');
  const [namePlaceholder, setNamePlaceholder] = useState('Nome completo');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    lengthValid: false,
    lowercaseValid: false,
    specialCharValid: false,
  });

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    const lengthValid = value.length >= 8;
    const lowercaseValid = /[a-z]/.test(value);
    const specialCharValid = /[^A-Za-z0-9]/.test(value);

    setPasswordValidation({
      lengthValid,
      lowercaseValid,
      specialCharValid,
    });
  };


  const handleFormSubmission = async () => {
    try {
      await form.validateFields();
      setShowTooltip(false);
      onFinish(form.getFieldsValue());
    } catch (error) {
      setShowTooltip(true);
    }
  };


  const handleSpecialtyChange = selected => {
    setSelectedSpecialties(selected);
  };


  const specialtyOptions = {
    'medico': 1,
    'dentista': 2,
    'psicologo': 3,
    'fisioterapeuta': 4,
    'nutricionista': 5,
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

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };


  const validatePassword = async (_, value) => {
    if (value.length < 8) {
      return Promise.reject(new Error(''));
    }
    if (!/[A-Z]/.test(value)) {
      return Promise.reject(new Error(''));
    }
    if (!/[^A-Za-z0-9]/.test(value)) {
      return Promise.reject(new Error(''));
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

  const sendWelcomeEmail = async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/send-welcome-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error('Não foi possível enviar o e-mail de boas-vindas.');
      }
  
      message.success('E-mail de boas-vindas enviado com sucesso!');
    } catch (error) {
      message.error(error.message);
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
      await sendWelcomeEmail(values.email);
    } catch (error) {
      message.error(error.message);
    }
  };

  const onAgreementChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };


  useEffect(() => {
    form.setFieldsValue({ profession: selectedSpecialties });
  }, [selectedSpecialties, form]);


  return (
    <div className='register'>
      <div className='formulario'>
        <h2>Experimentar gratuitamente 😊</h2>
        <p>Não solicitamos método de pagamento 💰</p>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="profession"
            label=""
            rules={[{ required: true, message: 'Por favor, selecione sua profissão!' }]}
          >
            <p style={{ fontSize: '1rem' }}>Você ou sua clínica são compostos por?</p>
            <Select
              mode="multiple"
              placeholder="Selecione a especialidade"
              onChange={handleSpecialtyChange}
              maxTagCount={5}
              className="dynamic-width-select"
              style={{ minHeight: 'auto' }}
            >
              <Option value="medico">Médico</Option>
              <Option value="dentista">Dentista</Option>
              <Option value="psicologo">Psicólogo</Option>
              <Option value="fisioterapeuta">Fisioterapeuta</Option>
              <Option value="nutricionista">Nutricionista</Option>
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
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Por favor, insira seu email!' },
              { type: 'email', message: 'Por favor, insira um email válido!' }
            ]}
          >
            <Input placeholder="exemplo@dominio.com" />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            name="phone"
            label="Telefone"
            rules={[{ required: true, message: 'Por favor, insira seu telefone!' }]}
            
          >
            <ReactInputMask mask="(99) 9 9999-9999" >
              {(inputProps) => <Input {...inputProps} placeholder="(99) 9 9999-9999" />}
            </ReactInputMask>
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
            <Input.Password placeholder="Senha" onChange={handlePasswordChange} />
          </Form.Item>
          <div className='validade-password'>
            <p>
              {passwordValidation.lengthValid ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />} A senha deve conter pelo menos 8 dígitos;
            </p>
            <p>
              {passwordValidation.lowercaseValid ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />} Deve conter pelo menos uma letra maiúscula;
            </p>
            <p>
              {passwordValidation.specialCharValid ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />} Deve conter pelo menos um caractere especial.
            </p>
          </div>
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
              Li e aceito os <a href="/terms-of-use" className={styles.link}>Termos de Uso</a> e
              <a href="/privacy-policy" className={styles.link}> Política de Privacidade</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Tooltip
              title="Por favor, preencha todos os campos obrigatórios antes de submeter."
              visible={showTooltip}
              placement="top"
            >
              <Button
                type="primary"
                onClick={handleFormSubmission}
                disabled={!isAgreed}
                className={!isAgreed ? "button-disabled" : ""}
              >
                Testar agora
              </Button>
            </Tooltip>
          </Form.Item>
        </Form>
        <Modal
          title="Cadastro Atendido Com Sucesso :)"
          visible={isModalVisible}
          onOk={() => {
            setModalVisible(false);
            navigate('/login');
          }}
          onCancel={() => setModalVisible(false)}
          okText="Usar agora !"
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '50px', color: 'green' }}>
              😀
            </div>
          </div>
          Seu cadastro foi recebido com sucesso! Agora você pode desfrutar do poder do nosso sistema !
        </Modal>
      </div>
      <div className='marketing'>
        <img src={logo} alt="" />
        <h1>O Marquei.com é o software gestor de agendamentos para profissionais da saúde.</h1>
        <p>
          Convidamos você a experimentar tudo o que podemos oferecer para melhorar seus atendimentos e a gestão do seu dia a dia de trabalho.
        </p>
        <p>
          Experimente o Marquei por 7 dias, sem qualquer compromisso, e mergulhe em nossas soluções:
        </p>
        <ul>
          <li> <CheckOutlined />Agenda médica e agendamento online</li>
          <li> <CheckOutlined />Agenda 24 horas</li>
          <li> <CheckOutlined />Gestão financeira</li>
          <li> <CheckOutlined />Gestão de estoque</li>
          <li> <CheckOutlined />Prescrição digital</li>
          <li> <CheckOutlined />Declarações digitais</li>
        </ul>
        <p>
          Preencha seu cadastro para começar o teste. Não solicitamos informações de pagamento e nosso suporte está disponível para esclarecer suas dúvidas durante o horário comercial.
        </p>
        <img className='marketing-img' src={computerPhone} alt="imagem do sistema marquei agendamentos online" />
      </div>
    </div>
  );
};

export default RegisterScreen;

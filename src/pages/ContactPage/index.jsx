import React from 'react';
import { Form, Input, Button, message, notification } from 'antd';
import api from 'components/api/api';
import { StyledContactPage, StyledContactPageForms, StyledFormContactPage } from './styles';
import Btn from 'components/Btn';

const ContactPage = () => {
  const onFinish = async (values) => {
    try {
      await api.post('/send-email', values);
      notification.success({ message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      message.error('Erro ao enviar a mensagem. Por favor, tente novamente.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    notification.error({ message: 'Por favor, preencha todos os campos obrigatórios.' });
  };

  return (

    <StyledContactPage>
      <h1>Entre em Contato</h1>
      <p>Você pode entrar em contato utilizando nosso formulario de contato, ou pelas nossos outros meios</p>
      <StyledContactPageForms>

        <StyledFormContactPage
          name="contact-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <h2>Formulário de contato</h2>
          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira seu email!' },
              { type: 'email', message: 'Por favor, insira um email válido!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mensagem"
            name="message"
            rules={[{ required: true, message: 'Por favor, insira sua mensagem!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Btn htmlType="submit">
              Enviar Mensagem
            </Btn>
          </Form.Item>
        </StyledFormContactPage>
        <div>
          <h2>Informações de Contato</h2>
          <p>Caixa Postal:  Av. Paulista 1106 - Bela Vista, São Paulo - SP <br></br> SL01 Andar 16, 01310-914</p>
          <p>Telefone: (11) 5194-6100</p>
          <p>Email: contato@marquei.com.br</p>
        </div>
      </StyledContactPageForms>

    </StyledContactPage>
  );
};

export default ContactPage;

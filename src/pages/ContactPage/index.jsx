import React, { useState } from 'react';
import { Form, Input, Modal, notification } from 'antd';
import api from 'components/api/api';
import { StyledContactPage, StyledContactPageForms, StyledContactsPage, StyledFormContactPage } from './styles';
import Btn from 'components/Btn';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await api.post('/send-email', values);
      setModalVisible(true);
      form.resetFields(); // Limpar os valores do formulário
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      notification.error({ message: 'Erro ao enviar a mensagem. Por favor, tente novamente.' });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    notification.error({ message: 'Por favor, preencha todos os campos obrigatórios.' });
  };


  return (
    <StyledContactPage>
      <h1>Entre em Contato</h1>
      <p>Você pode entrar em contato utilizando nosso formulário de contato, ou pelos nossos outros meios.</p>
      <StyledContactPageForms>
        <StyledFormContactPage
          form={form}
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
            <Btn htmlType="submit">Enviar Mensagem</Btn>
          </Form.Item>
        </StyledFormContactPage>
        <StyledContactsPage>
          <h2>Informações de Contato</h2>
          <p><strong>Caixa Postal:</strong>  Av. Paulista 1106 - Bela Vista, São Paulo - SP <br></br> SL01 Andar 16, 01310-914</p>
          <p><strong>Telefone:</strong> (11) 5194-6100</p>
          <p><strong>Email:</strong> contato@marquei.com.br</p>
        </StyledContactsPage>
      </StyledContactPageForms>
      {modalVisible && (
        <Modal
          title="Mensagem Enviada"
          visible={modalVisible}
          onOk={() => {
            setModalVisible(false);
            navigate('/');
          }}
          onCancel={() => setModalVisible(false)}
          okText="Fechar"
          cancelButtonProps={{ style: { display: 'none' } }}
        >          
          <p>Sua mensagem foi enviada com sucesso! Em breve será respondida.</p>
        </Modal>
              
      )}
    </StyledContactPage>
  );
};

export default ContactPage;

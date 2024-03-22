import React, { useRef, useState } from 'react';
import { Modal, Input, message } from 'antd';
import { CheckCircleOutlined, LockOutlined } from '@ant-design/icons';
import api from 'components/api/api';
import ReCAPTCHAUtil from 'utils/ReCAPTCHAUtil';
import { LoadingOverlay } from 'pages/ContactPage/styles';
import Loading from 'components/Loading';


const PasswordResetModal = ({ isResetPassVisible, onResetPassClose }) => {
  const [resetEmail, setResetEmail] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const recaptchaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // Novo estado

  const handlePasswordReset = async () => {
    setIsLoading(true);

    if (!recaptchaToken) {
      message.error('Por favor, complete o reCAPTCHA.');
      return;
    }

    try {
      const response = await api.post('/auth/password-reset', {
        email: resetEmail,
        recaptchaToken,
      });
      if (response.status >= 200 && response.status < 300) {
        setIsSuccessModalVisible(true); // Atualiza para exibir o modal de sucesso

        message.success('Se um email corresponder à sua conta, enviaremos um link de redefinição de senha.');
      } else {
        throw new Error('Algo deu errado, por favor tente novamente.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Algo deu errado, por favor tente novamente.';
      message.error(errorMessage);
    } finally {
      setIsLoading(false);
      onResetPassClose();
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
    onResetPassClose(); // Fechar ambos os modais
  };

  return (
    <>
      {isLoading ? <LoadingOverlay><Loading /> </LoadingOverlay> : (


        <Modal
          title="Redefinir senha 👀"
          open={isResetPassVisible}
          onOk={handlePasswordReset}
          onCancel={onResetPassClose}
          okText="Enviar"
          cancelText="Cancelar"
        >
          <p>Para maior segurança insira o E-mail cadastrado para resetar a senha de acesso !</p>
          <p>Um e-mail com link de reset de senha será enviado</p>
          <p>Se não receber, verifique a caixa de Span...</p>
          <Input
            prefix={<LockOutlined />}
            type="email"
            placeholder="Digite seu email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '18px 0' }}>
            <ReCAPTCHAUtil
              ref={recaptchaRef}
              onChange={(token) => setRecaptchaToken(token)}
            />
          </div>

        </Modal>
      )}
      <Modal
        title={null}
        closable={false}
        open={isSuccessModalVisible}
        onOk={handleSuccessModalClose}
        cancelButtonProps={{ style: { display: 'none' } }}
        okText="Fechar 👍"
        centered
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircleOutlined style={{ color: 'green', fontSize: '48px' }} />
          <p>O email para alterar a senha foi enviado com sucesso, se não achar verifique a caixa de Span do seu email.</p>
        </div>
      </Modal>
    </>
  );
};

export default PasswordResetModal;

import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Modal, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import styles from './Auth.module.scss';
import Btn from 'components/Btn';
import PlanCard from 'components/SelerCads';
import { useAuth } from 'context/AuthContext';
import ReCAPTCHAUtil from 'utils/ReCAPTCHAUtil';
import { LoadingOverlay } from 'pages/ContactPage/styles';
import Loading from 'components/Loading';
import api from 'components/api/api';

const Authentication = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [expiredTokenModalVisible, setExpiredTokenModalVisible] = useState(false);
  const [expiredTokenMessage, setExpiredTokenMessage] = useState('');
  const [isPasswordResetModalVisible, setPasswordResetModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const recaptchaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { updateAuthData } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!recaptchaToken) {
      setLoginError('Por favor, confirme que você não é um robô.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', {
        username,
        password,
        recaptchaToken,
      });

      const { token, company_id, user_specialties } = response.data;

      if (typeof company_id === 'undefined') {
        setIsLoading(false);
        throw new Error('Informações do usuário ou da empresa não estão disponíveis.');
      }

      updateAuthData({
        authToken: token,
        companyID: company_id,
        userSpecialties: user_specialties,
      });

      setUsername('');
      setPassword('');
      setRecaptchaToken('');
      navigate('/calendario');
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || 'Erro ao fazer login.';
      setLoginError(errorMessage);
      message.error(errorMessage);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
  };


  const handlePasswordReset = async () => {
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
        message.success('Se um email corresponder à sua conta, enviaremos um link de redefinição de senha.');
      } else {
        throw new Error('Algo deu errado, por favor tente novamente.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Algo deu errado, por favor tente novamente.';
      message.error(errorMessage);
    } finally {
      setPasswordResetModalVisible(false);
    }
  };

  const showPasswordResetModal = () => {
    setPasswordResetModalVisible(true);
  };

  return (
    <div className={styles.autenticar}>
      {isLoading ? <LoadingOverlay><Loading /> </LoadingOverlay> : (

        <form className={styles.formulario} onSubmit={handleLogin}>

          <h1>Acesso ao Marquei <LockOutlined /></h1>
          <div className={styles.inputContainer}>
            <label htmlFor="username">E-mail</label>
            <input
              type="text"
              id="username"
              className={styles.inputField}
              placeholder='E-mail'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              className={styles.inputField}
              placeholder='Senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {loginError && <div className={styles.error}>{loginError}</div>}

          </div>
          <div className={styles.captcha}>
            <ReCAPTCHAUtil
              ref={recaptchaRef}
              onChange={(token) => setRecaptchaToken(token)}
            />
          </div>
          <Btn type="submit" className={styles.loginButton}>Entrar</Btn>

          <div className={styles.forgotPassword}>
            <Button type="link" onClick={showPasswordResetModal}>
              Esqueci minha senha
            </Button>
          </div>
          <div className={styles.registerPrompt}>
            <p>Você ainda não tem uma conta Marquei?</p>
            <Link to='/cadastro'>
              Teste o Marquei gratuitamente
            </Link>
          </div>
        </form>
      )}
      <Modal
        title="Período de teste chegou ao Fim :("
        open={expiredTokenModalVisible}
        onOk={() => {
          navigate('/contratar-plano');
          setExpiredTokenModalVisible(false);
        }}
        onCancel={() => setExpiredTokenModalVisible(false)}
        okText="Consulte outros planos..."
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <p>{expiredTokenMessage}</p>
        <PlanCard
          title="Plus"
          price="69,99"
          originalPrice="119"
          quantity="1"
          duration="1"
          mostSold
        />
      </Modal>

      <Modal
        title="Redefinir senha"
        open={isPasswordResetModalVisible}
        onOk={handlePasswordReset}
        onCancel={() => setPasswordResetModalVisible(false)}
        okText="Resetar"
        cancelText="Cancelar"
      >
        <p>Insira o E-mail cadastrado para resetar a senha de acesso !</p>

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
    </div>
  );
};

export default Authentication;



/*
OLD REGISTER
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="register-username">Usuário:</label>
          <input
            type="text"
            id="register-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>   
          <label htmlFor="register-password">Senha:</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>   
          <label htmlFor="company-id">Codigo da Empresa:</label>
          <input
            type="text"
            id="company-id"
            value={companyID}
            onChange={(e) => setCompanyID(e.target.value)}
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
const handleRegister = async (e) => {
  e.preventDefault();

  try {
    // Suponha que `companyID` seja o ID da empresa que você deseja associar ao novo usuário.
    const payload = { username, password, company_id: companyID };

    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    navigate('/login');
  } catch (error) {
    alert(error.message);
  }

  setUsername('');
  setPassword('');
  setCompanyID(''); // Limpe o ID da empresa também, se aplicável

};
*/
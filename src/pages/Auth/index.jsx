import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.scss';
import { BASE_URL } from 'config';
import Btn from 'components/Btn';
import { Button, Input, Modal, message } from 'antd';
import { jwtDecode } from 'jwt-decode';
import PlanCard from 'components/SelerCads';
import { LockOutlined } from '@ant-design/icons';

const Authentication = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [expiredTokenModalVisible, setExpiredTokenModalVisible] = useState(false);
  const [expiredTokenMessage, setExpiredTokenMessage] = useState('');
  const [isPasswordResetModalVisible, setPasswordResetModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        if (error.message === "Token inválido ou expirado") {
          setExpiredTokenModalVisible(true);
          setExpiredTokenMessage('Seu período de teste chegou ao fim, mas não fique triste, fique à vontade para contratar um dos nossos planos clicando aqui!');
        } else {
          throw new Error(error.message || 'Erro ao fazer login.');
        }
      } else {
        const { token, company_id, user_specialties } = await response.json();
        console.log('Logged in company ID:', company_id);
  
        if (typeof company_id === 'undefined') {
          throw new Error('Informações do usuário ou da empresa não estão disponíveis.');
        }
  
        localStorage.setItem('authToken', token);
        localStorage.setItem('companyID', company_id);
        localStorage.setItem('userSpecialties', JSON.stringify(user_specialties)); // Armazenando especialidades do usuário
  
        setUsername('');
        setPassword('');
        navigate('/calendario');
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  

  const showPasswordResetModal = () => {
    setPasswordResetModalVisible(true);
  };

  const handlePasswordReset = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (response.ok) {
        message.success('Se um email corresponder à sua conta, enviaremos um link de redefinição de senha.');
      } else {
        throw new Error('Algo deu errado, por favor tente novamente.');
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setPasswordResetModalVisible(false);
    }
  };

  return (
    <div className={styles.autenticar}>
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
      <Modal
        title="Período de teste chegou ao Fim :("
        visible={expiredTokenModalVisible}
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
        visible={isPasswordResetModalVisible}
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
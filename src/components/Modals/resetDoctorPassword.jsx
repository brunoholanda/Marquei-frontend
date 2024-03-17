import React, { useState } from 'react';
import { Input, Modal, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';

import { BASE_URL } from 'config';

const ResetDoctorPasswordModal = ({ isResetDoctorModalVisible, onResetDoctorModalClose }) => {
  const [resetEmail, setResetEmail] = useState('');

  const handlePasswordReset = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/password-reset-doctor`, {
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
    }
  };

  return (
      <Modal
        title="Redefinir senha"
        open={isResetDoctorModalVisible}
        onOk={handlePasswordReset}
        onCancel={onResetDoctorModalClose}
        okText="Resetar"
        cancelText="Cancelar"
      >
        <p>Insira o E-mail cadastrado para resetar a senha de acesso de autenticacao!</p>

        <Input
          prefix={<LockOutlined />}
          type="email"
          placeholder="Digite seu email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          required
        />
      </Modal>
  );
};

export default ResetDoctorPasswordModal;


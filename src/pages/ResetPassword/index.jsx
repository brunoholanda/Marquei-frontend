import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { BASE_URL } from 'config';
import './ResetPassword.css';
const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();

    const handlePasswordResetSubmit = async () => {
        if (newPassword !== confirmNewPassword) {
            message.error('As senhas não coincidem.');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            if (response.ok) {
                message.success('Senha redefinida com sucesso!');
                navigate('/login');
            } else {
                throw new Error('Não foi possível redefinir a senha. Tente novamente.');
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div className='resetPassword'>
            <div className='resetPasswordContainer'>
                <h2>Redefinir Senha</h2>
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Nova senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Confirme a nova senha"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                />
                <Button type="primary" onClick={handlePasswordResetSubmit}>
                    Redefinir Senha
                </Button>

            </div>
        </div>
    );
};

export default ResetPassword;

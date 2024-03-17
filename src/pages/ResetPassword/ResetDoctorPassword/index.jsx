import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, message, notification } from 'antd';
import { CheckOutlined, CloseOutlined, LockOutlined } from '@ant-design/icons';
import { BASE_URL } from 'config';
import '../ResetPassword.css';

const CheckOrCloseOutlined = ({ isCriteriaMet, text }) => (
    <p className={isCriteriaMet ? 'criteriaMet' : 'criteriaNotMet'}>
        {isCriteriaMet ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />} {text}
    </p>
);

const ResetDoctorPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();

    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
    });

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPasswordCriteria({
            minLength: password.length >= 8,
        });
        setNewPassword(password);
    };

    const handlePasswordResetSubmit = async () => {

        const allCriteriaMet = Object.values(passwordCriteria).every(criterion => criterion);
        if (!allCriteriaMet) {
            notification.success({message: 'A senha não atende aos critérios necessários.'})
            return;
        }

        if (newPassword !== confirmNewPassword) {
            message.error('As senhas não coincidem.');
            notification.error({message: 'As senhas não coincidem.'})

            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/auth/reset-password-doctor`, {
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
                <h2>Você esta redefinindo sua senha profissional</h2>
                <p>Essa senha serve para emitir atestados, receitas, declarações e mais...</p>
                <p>A senha deve ser pessoal e intransferível</p>
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Nova senha"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    required
                />
                <div className='passwordCriteria'>
                    <CheckOrCloseOutlined isCriteriaMet={passwordCriteria.minLength} text="A senha deve conter pelo menos 8 dígitos" />
                </div>
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

export default ResetDoctorPassword;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, message, notification } from 'antd';
import { CheckOutlined, CloseOutlined, LockOutlined } from '@ant-design/icons';
import { BASE_URL } from 'config';
import './ResetPassword.css';

const CheckOrCloseOutlined = ({ isCriteriaMet, text }) => (
    <p className={isCriteriaMet ? 'criteriaMet' : 'criteriaNotMet'}>
        {isCriteriaMet ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />} {text}
    </p>
);

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();

    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        upperCase: false,
        lowerCase: false,
        specialChar: false,
        numbers: false,
    });

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPasswordCriteria({
            minLength: password.length >= 10,
            upperCase: /[A-Z]/.test(password),
            lowerCase: /[a-z]/.test(password),
            specialChar: /[^A-Za-z0-9]/.test(password),
            numbers: /[0-9].*[0-9]/.test(password),
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
                    onChange={handlePasswordChange}
                    required
                />
                <div className='passwordCriteria'>
                    <CheckOrCloseOutlined isCriteriaMet={passwordCriteria.minLength} text="A senha deve conter pelo menos 10 dígitos" />
                    <CheckOrCloseOutlined isCriteriaMet={passwordCriteria.upperCase} text="Deve conter pelo menos uma letra maiúscula" />
                    <CheckOrCloseOutlined isCriteriaMet={passwordCriteria.lowerCase} text="Deve conter pelo menos uma letra minúscula" />
                    <CheckOrCloseOutlined isCriteriaMet={passwordCriteria.specialChar} text="Deve conter pelo menos um caractere especial" />
                    <CheckOrCloseOutlined isCriteriaMet={passwordCriteria.numbers} text="Deve conter pelo menos dois números" />
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

export default ResetPassword;

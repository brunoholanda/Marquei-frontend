// PasswordChangeModal.js
import React, { useState } from 'react';
import { Modal, Form, Input, Button, Divider } from 'antd';
import { CheckOutlined, CloseOutlined, LockOutlined } from '@ant-design/icons';

const CheckOrCloseOutlined = ({ isCriteriaMet, text }) => (
    <p className={isCriteriaMet ? 'criteriaMet' : 'criteriaNotMet'}>
        {isCriteriaMet ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />} {text}
    </p>
);

const PasswordChangeModal = ({ isChangePassVisible, onChangePassClose }) => {
    const [newPassword, setNewPassword] = useState('');
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        upperCase: false,
        lowerCase: false,
        specialChar: false,
        numbers: false,
    });    const handlePasswordSubmit = (values) => {
        console.log('New Password Data:', values);
        onChangePassClose();
    };

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

    return (
        <Modal
            title="Alterar Senha"
            visible={isChangePassVisible}
            onCancel={onChangePassClose}
            footer={null}
        >
            <Divider />
            <Form onFinish={handlePasswordSubmit}>
                <Form.Item
                    name="oldPassword"
                    rules={[{ required: true, message: 'Por favor, insira sua senha atual!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Nova Atual" />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    rules={[{ required: true, message: 'Por favor, insira sua nova senha!' }]}
                >
                    <Input.Password 
                        prefix={<LockOutlined />} 
                        placeholder="Nova Senha" 
                        onChange={handlePasswordChange}

                        />
                </Form.Item>
                <div className='passwordCriteria'>
                    <CheckOrCloseOutlined isCriteriaMet={passwordCriteria.minLength} text="A senha deve conter pelo menos 10 dígitos" />
                    <CheckOrCloseOutlined isCriteriaMet={passwordCriteria.upperCase} text="Deve conter pelo menos uma letra maiúscula" />
                    <CheckOrCloseOutlined isCriteriaMet={passwordCriteria.lowerCase} text="Deve conter pelo menos uma letra minúscula" />
                    <CheckOrCloseOutlined isCriteriaMet={passwordCriteria.specialChar} text="Deve conter pelo menos um caractere especial" />
                    <CheckOrCloseOutlined isCriteriaMet={passwordCriteria.numbers} text="Deve conter pelo menos dois números" />
                </div>
                <Form.Item
                    name="confirmNewPassword"
                    rules={[{ required: true, message: 'Por favor, confirme sua nova senha!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Confirme a Nova Senha" />
                </Form.Item>
                <Divider />
                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                    Alterar Senha
                </Button>
            </Form>
        </Modal>
    );
};

export default PasswordChangeModal;

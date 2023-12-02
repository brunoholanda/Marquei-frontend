import React from 'react';
import styles from './Header.module.scss';
import logo from '../../../public/logo.png';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => currentPath === path;

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const isAuthenticated = !!localStorage.getItem('authToken');

    return (
        <div className={styles.header}>
            <img src={logo} alt="logo da página" />

            {isAuthenticated && (
                <>
                    <h2>Controle de Agenda</h2>
                    <Link to="/agendamentos">
                        <Button type='primary' className={isActive('/agendamentos') ? styles.active : ''}>
                            Tratamento da Agenda
                            {isActive('/agendamentos')}
                        </Button>
                    </Link>
                    <Link to="/allagendamentos">
                        <Button type='primary' className={isActive('/allagendamentos') ? styles.active : ''}>
                            Historico
                            {isActive('/allagendamentos')}
                        </Button>
                    </Link>
                    <Link to="/calendario">
                        <Button type='primary' className={isActive('/calendario') ? styles.active : ''}>
                            Calendario
                            {isActive('/calendario')}
                        </Button>
                    </Link>
                    <Link to="/admagenda">
                        <Button type='primary' className={isActive('/admagenda') ? styles.active : ''}>
                            Controle sua Agenda
                            {isActive('/admagenda')}
                        </Button>
                    </Link>
                    <Link to="/configs">
                    <Button icon={<SettingOutlined />} />
                    </Link>
                    <Button
                        onClick={handleLogout}
                        type='primary'
                        danger
                        icon={<LogoutOutlined />}
                    >
                        Sair do Sistema
                    </Button>
                </>
            )}
        </div>
    )
}

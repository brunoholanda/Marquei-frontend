import React, { useEffect, useState } from 'react';
import {
  HistoryOutlined,
  ScheduleOutlined,
  LogoutOutlined,
  DashboardOutlined,
  CalculatorOutlined,
  TeamOutlined,
  BarChartOutlined,
  AppleOutlined,
  SettingOutlined,
  PieChartOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import ReactJoyride from 'react-joyride';
import './Sidebar.css';
import { useAuth } from 'context/AuthContext';
import logo from '../../public/logo-branca-2.webp';
import logoLetra from '../../public/logo-letra-branca.png';
import PasswordResetModal from 'components/Modals/PasswordResetModal';

const { Header, Sider } = Layout;

function getItem(label, key, icon, children, url, type) {
  // Se for um dropdown, retorne uma estrutura de submenu
  if (type === 'dropdown') {
    return {
      key,
      icon,
      label, // Label agora pode ser um elemento React
      children, // Itens do dropdown
    };
  }
  // Para itens normais
  return {
    key,
    icon,
    children,
    label: url ? <Link to={url}>{label}</Link> : label,
  };
}



const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { authData, logout } = useAuth();
  const userSpecialties = authData.userSpecialties || [];
  const [runTutorial, setRunTutorial] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  const [steps, setSteps] = useState([
    {
      target: '.custom-menu .ant-menu-item:nth-child(6)',
      content: 'Clique aqui para acessar as configurações do sistema.',
    },
  ]);

  const showPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };
  
  const handlePasswordModalClose = () => {
    setIsPasswordModalVisible(false);
  };
  


  useEffect(() => {
    if (!localStorage.getItem('tutorialShown')) {
      setRunTutorial(true);
      localStorage.setItem('tutorialShown', 'true');
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 768;
      setIsMobile(currentIsMobile);

      if (currentIsMobile) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapsed = () => {
    if (!isMobile) {
      setCollapsed(!collapsed);
    }
  };

  const [collapsed, setCollapsed] = useState(isMobile);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const isAuthenticated = !!sessionStorage.getItem('authToken');

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const onMenuClick = (e) => {
    if (e.key === 'logout') {
      handleLogout();
    }
  };

  const iconSize = 22;


  const items = [
    getItem('Agendamentos', '1', <ScheduleOutlined style={{ fontSize: iconSize }} />, null, '/calendario'),
    getItem('DashBoards', '2', <DashboardOutlined style={{ fontSize: iconSize }} />, null, '/painel'),
    getItem('NpsSystem', '3', <PieChartOutlined style={{ fontSize: iconSize }} />, null, '/nps-system'),
    !isMobile && getItem('Histórico', '4', <HistoryOutlined style={{ fontSize: iconSize }} />, null, '/allagendamentos'),
    getItem('Clientes', '5', <TeamOutlined style={{ fontSize: iconSize }} />, null, '/clientes'),
    getItem('Configurações', '6', <SettingOutlined style={{ fontSize: iconSize }} />, null, '/configs'),
    !isMobile && getItem('Estoque', '7', <BarChartOutlined style={{ fontSize: iconSize }} />, null, '/estoque'),
    getItem('Contabilidade', '8', <CalculatorOutlined style={{ fontSize: iconSize }} />, null, '/contabilidade'),
    userSpecialties?.includes(5) && getItem('Plano Alimentar', '9', <AppleOutlined style={{ fontSize: iconSize }} />, null, '/plano_alimentar'),
    getItem('Sair +', 'logout', <LogoutOutlined style={{ fontSize: iconSize }} />, [
      { label: 'Sair', key: 'logout-system', icon: <LogoutOutlined />, onClick: handleLogout },
      { label: 'Alterar Senha', key: 'change-password', icon: <LockOutlined />, onClick: showPasswordModal },
    ], null, 'dropdown'), authData.companyID === 1 && getItem('Administrador', '11', <SettingOutlined style={{ fontSize: iconSize }} />, null, '/adminpanel'),
  ].filter(Boolean);

  if (!isAuthenticated) {
    return null;
  }

  const customLocale = {
    next: 'Proceed',
    last: 'Blz 😃',
    skip: 'Not Now',
    close: 'Close',
  };


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible={!isMobile}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="sidebar"
      >
        <div className="demo-logo-vertical">
          <img
            src={collapsed ? logoLetra : logo}
            alt="logo do sistema marquei"
            className={collapsed ? "collapsed" : ""}
          />
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={onMenuClick}
          className="custom-menu"
        />
        {!isMobile && (
          <div onClick={toggleCollapsed}></div>
        )}
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
      </Layout>
      <ReactJoyride
        run={runTutorial}
        steps={steps}
        continuous={true}
        showSkipButton={true}
        locale={customLocale}

        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <PasswordResetModal
        isResetPassVisible={isPasswordModalVisible}
        onResetPassClose={handlePasswordModalClose}
      />
    </Layout>
  );
};

export default Sidebar;

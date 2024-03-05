import React, { useEffect, useState } from 'react';
import {
  HistoryOutlined,
  ScheduleOutlined,
  LogoutOutlined,
  CalendarOutlined,
  DashboardOutlined,
  CalculatorOutlined,
  TeamOutlined,
  BarChartOutlined,
  AppleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import ReactJoyride from 'react-joyride';
import './Sidebar.css';
import { useAuth } from 'context/AuthContext';

const { Header, Sider } = Layout;

function getItem(label, key, icon, children, url) {
  return {
    key,
    icon,
    children,
    label: url ? <Link to={url}>{label}</Link> : label,
  };
}

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { authData, logout, companyID } = useAuth();
  const userSpecialties = authData.userSpecialties || [];
  const [runTutorial, setRunTutorial] = useState(false);
  const [steps, setSteps] = useState([
    {
      target: '.custom-menu .ant-menu-item:nth-child(6)',
      content: 'Clique aqui para acessar as configurações do sistema.',
    },
  ]);

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


  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if (status === 'finished' || status === 'skipped') {
      setRunTutorial(false);
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
    getItem('Calendário', '1', <CalendarOutlined style={{ fontSize: iconSize }} />, null, '/calendario'),
    getItem('DashBoards', '2', <DashboardOutlined style={{ fontSize: iconSize }} />, null, '/painel'),
    !isMobile && getItem('Agendamentos', '3', <ScheduleOutlined style={{ fontSize: iconSize }} />, null, '/agendamentos'),
    !isMobile && getItem('Histórico', '4', <HistoryOutlined style={{ fontSize: iconSize }} />, null, '/allagendamentos'),
    getItem('Clientes', '5', <TeamOutlined style={{ fontSize: iconSize }} />, null, '/clientes'),
    getItem('Configurações', '6', <SettingOutlined style={{ fontSize: iconSize }} />, null, '/configs'),
    !isMobile && getItem('Estoque', '7', <BarChartOutlined style={{ fontSize: iconSize }} />, null, '/estoque'),
    getItem('Contabilidade', '8', <CalculatorOutlined style={{ fontSize: iconSize }} />, null, '/contabilidade'),
    userSpecialties?.includes(5) && getItem('Plano Alimentar', '10', <AppleOutlined style={{ fontSize: iconSize }} />, null, '/plano_alimentar'),
    isAuthenticated && getItem('Sair do Sistema', 'logout', <LogoutOutlined style={{ fontSize: iconSize }} />, null, null), // Conditional item
    authData.companyID === 1 && getItem('Administrador', '12', <SettingOutlined style={{ fontSize: iconSize }} />, null, '/adminpanel'),

  ].filter(Boolean);

  if (!isAuthenticated) {
    return null;
  }



  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible={!isMobile}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="sidebar"

      >
        <div className="demo-logo-vertical" />
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
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
    </Layout>
  );
};

export default Sidebar;

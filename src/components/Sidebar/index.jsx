import React, { useState } from 'react';
import {
  HistoryOutlined,
  ScheduleOutlined,
  LogoutOutlined,
  CalendarOutlined,
  ControlOutlined,
  DashboardOutlined,
  CalculatorOutlined,
  TeamOutlined,
  BarChartOutlined,
  IdcardOutlined,
  AppleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';

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
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const isAuthenticated = !!localStorage.getItem('authToken');
  const userSpecialties = JSON.parse(localStorage.getItem('userSpecialties') || '[]');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
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
    getItem('Agendamentos', '3', <ScheduleOutlined style={{ fontSize: iconSize }} />, null, '/agendamentos'),
    getItem('Histórico', '4', <HistoryOutlined style={{ fontSize: iconSize }} />, null, '/allagendamentos'),
    getItem('Cleintes', '5', <TeamOutlined style={{ fontSize: iconSize }} />, null, '/clientes'),
    getItem('Configurações', '6', <SettingOutlined style={{ fontSize: iconSize }} />, null, '/configs'),
    getItem('Estoque', '7', <BarChartOutlined style={{ fontSize: iconSize }} />, null, '/estoque'),
    getItem('Contabilidade', '8', <CalculatorOutlined style={{ fontSize: iconSize }} />, null, '/contabilidade'),
    userSpecialties.includes(5) && getItem('Plano Alimentar', '10', <AppleOutlined style={{ fontSize: iconSize }} />, null, '/plano_alimentar'),
    isAuthenticated && getItem('Sair do Sistema', 'logout', <LogoutOutlined style={{ fontSize: iconSize }} />, null, null), // Conditional item
  ].filter(Boolean);

  if (!isAuthenticated) {
    return null;
  }


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={onMenuClick}
          className="custom-menu" // Adicione uma classe personalizada ao Menu
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
      </Layout>
    </Layout>
  );
};

export default Sidebar;

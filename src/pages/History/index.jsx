import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Tooltip, message } from 'antd';
import api from 'components/api/api';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, HistoryOutlined, SearchOutlined, WarningFilled } from '@ant-design/icons';
import './History.module.css';
import { useAuth } from 'context/AuthContext';
const AllAppointments = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const { authData } = useAuth();
    const companyID = authData.companyID;
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

    const fetchAllAppointments = async (page = 1) => {
        setLoading(true);
        
        if (companyID && authData.authToken) {
            try {
                const response = await api.get(`/todos-agendamentos?company_id=${companyID}&page=${page}&limit=${pagination.pageSize}`, {
                    headers: {
                        'Authorization': `Bearer ${authData.authToken}`
                    },
                });
                if (response.status !== 200) {
                    throw new Error('Falha ao buscar dados da clinica');
                }
                setAppointments(response.data.data);
                setPagination({ ...pagination, current: page, total: response.data.total });
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar todos os agendamentos", error);
                message.error("Erro ao buscar todos os agendamentos");
                setLoading(false);
            }
        } else {
            console.error('Company ID or auth token not found in local storage');
        }
    };

    const handlePageChange = (page) => {
        fetchAllAppointments(page);
    };

    let searchInput;

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        if (dataIndex === 'nome') {
            setFilteredAppointments(appointments.filter(appointment =>
                appointment.nome && appointment.nome.toLowerCase().includes(selectedKeys[0].toLowerCase())
            ));
        } else if (dataIndex === 'cpf') {
            setFilteredAppointments(appointments.filter(appointment =>
                appointment.cpf && appointment.cpf.includes(selectedKeys[0])
            ));
        }
    };

    const handleReset = clearFilters => {
        clearFilters();
        setFilteredAppointments(appointments);
    };

    useEffect(() => {
        fetchAllAppointments(); // Chama na montagem do componente
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const formatName = (name) => {
        const nameParts = name.split(' ');
        if (nameParts.length > 2) {
            return `${nameParts[0]} ${nameParts[1]}`; // Retorna apenas os dois primeiros nomes
        }
        return name;
    };

    const commonColumns = [
        {
          title: 'Nome',
          dataIndex: 'nome',
          key: 'nome',
          render: (text) => isMobile ? formatName(text) : text,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={node => { searchInput = node; }}
                        placeholder={`Pesquisar Email`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, 'email')}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, 'email')}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Pesquisar
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Resetar
                    </Button>
                </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => record.email ? record.email.toString().toLowerCase().includes(value.toLowerCase()) : '',
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => searchInput.select(), 100);
                }
            },
          },
          
        {
          title: 'Data',
          dataIndex: 'data',
          key: 'data',
        },
        {
            title: 'Horário',
            dataIndex: 'horario',
            key: 'horario',
        },
        {
          title: 'Contato',
          dataIndex: 'celular',
          key: 'celular',
        },
      ];
      

    const desktopColumns  = [
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => (
                <Tooltip title={status === null ? "Pendente" : status === 1 ? "Confirmado" : "Cancelado"}>
                    {status === null ? <ExclamationCircleOutlined style={{ color: "orange" }} /> :
                        status === 1 ? <CheckCircleOutlined style={{ color: "green" }} /> :
                            <CloseCircleOutlined style={{ color: "red" }} />}
                </Tooltip>
            )
        },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
        },
    ];

    const columns = isMobile ? commonColumns : [...commonColumns, ...desktopColumns];


    return (
        <div className='tabela'>
            <h1>Histórico  de Agendamentos  <HistoryOutlined /></h1>
            <p>Utilize a lupa para pesquisar por Nome ou CPF <WarningFilled /></p>
            <Table columns={columns} dataSource={filteredAppointments.length > 0 ? filteredAppointments : appointments} rowKey="id" loading={loading} pagination={{ ...pagination, onChange: handlePageChange }} />
        </div>
    );
};

export default AllAppointments;

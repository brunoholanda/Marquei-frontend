import React, { useEffect, useState } from 'react';
import { Button, Input, Table, message, notification } from 'antd';
import api from 'components/api/api';
import { EyeOutlined, TeamOutlined, WarningFilled, WhatsAppOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';

import '../ClientDetails/ClientDetails.css';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;

const Pacientes = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedClient] = useState(null);
    const [setAppointmentHistory] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true);


    const navigate = useNavigate();

    const showNotification = (type, message) => {
        notification[type]({
            message: message,
        });
    };

    const onSearch = debounce(async (value) => {
        const cleanedValue = value.replace(/[^a-zA-Z0-9]/g, '');

        if (!cleanedValue.trim()) return;
        setLoading(true);

        const companyID = localStorage.getItem('companyID');

        if (!companyID) {
            setLoading(false);
            showNotification('error', 'Erro ao identificar a empresa. Por favor, faça login novamente.');
            return;
        }

        try {
            const response = await api.get('/clients/search', {
                params: {
                    searchTerm: cleanedValue.trim(),
                    company_id: companyID,
                },
            });

            if (response.data.length > 0) {
                setClientes(response.data);
            } else {
                showNotification('info', 'Nenhum cliente encontrado com os dados fornecidos.');
            }
        } catch (error) {
            console.error('Erro na pesquisa:', error);
            showNotification('error', 'Erro ao realizar a pesquisa.');
        }
        setLoading(false);
    }, 400);



    const handleViewDetails = (clienteId) => {
        navigate(`/client-details/${clienteId}`, { state: { from: 'Pacientes' } });
    };

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'CPF',
            dataIndex: 'cpf',
            key: 'cpf',
        },
        {
            title: 'Celular',
            dataIndex: 'celular',
            key: 'celular',
        },
        {
            title: 'Data de Nascimento',
            dataIndex: 'data_nascimento',
            key: 'data_nascimento',

            render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
        },
        {
            title: 'Ação',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button type='primary' onClick={() => handleViewDetails(record.id)}><EyeOutlined />Detalhes</Button>
                    <Button
                        key={`whatsapp-${record.id}`}
                        className="button-whats modal-btn"
                        onClick={() => {
                            const message = `Oi, sou do consultório ...`;
                            const phoneNumber = record.celular.replace(/[^0-9]/g, "");
                            window.open(`https://api.whatsapp.com/send?phone=+55${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
                        }}
                    >
                        <WhatsAppOutlined /> Conversar
                    </Button>
                </span>
            ),
        },
    ];

    const convertDate = (dateStr) => {
        const parts = dateStr.split("/");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    };

    useEffect(() => {
        if (initialLoad) {
            setLoading(true);

            const companyID = localStorage.getItem('companyID');

            if (!companyID) {
                setLoading(false);
                showNotification('error', 'Erro ao identificar a empresa. Por favor, faça login novamente.');
                return;
            }

            api.get('/clients', {
                params: {
                    company_id: companyID,
                },
            })
                .then((response) => {
                    const sortedClients = [...response.data].sort((a, b) => a.nome.localeCompare(b.nome));
                    setClientes(sortedClients);
                })
                .catch((error) => {
                    console.error('Erro ao buscar clientes:', error);
                    showNotification('error', 'Erro ao buscar clientes.');
                })
                .finally(() => {
                    setLoading(false);
                    setInitialLoad(false);
                });
        }
    }, [initialLoad]);

    useEffect(() => {
        const fetchAppointmentHistory = async () => {
            if (selectedClient && selectedClient.id) {
                try {
                    const storedCompanyID = localStorage.getItem('companyID');
                    const historyResponse = await api.get(`/todos-agendamentos`, {
                        params: {
                            client_id: selectedClient.id,
                            company_id: storedCompanyID,
                        },
                    });

                    const filteredAppointments = historyResponse.data.filter(appointment => appointment.status === 1);

                    const appointmentsWithProfessionalNames = await Promise.all(filteredAppointments.map(async (appointment) => {
                        const professionalResponse = await api.get(`/professionals/${appointment.professional_id}`);
                        appointment.professionalName = professionalResponse.data.nome;
                        return appointment;
                    }));

                    const sortedHistory = appointmentsWithProfessionalNames.sort((a, b) => {
                        const dateA = convertDate(a.data);
                        const dateB = convertDate(b.data);
                        return dateB - dateA;
                    });

                    setAppointmentHistory(sortedHistory);
                } catch (error) {
                    console.error("Erro ao buscar histórico de atendimentos", error);
                    message.error("Erro ao buscar histórico de atendimentos");
                }
            }
        };

        fetchAppointmentHistory();
    }, [selectedClient]);


    return (
        <div className='tabela'>
            <h1>Clientes <TeamOutlined /></h1>
            <p>Utilize a lupa para pesquisar por Nome ou CPF <WarningFilled /></p>
            <Search
                placeholder="Digite o nome ou CPF"
                onSearch={onSearch}
                style={{ width: '50%', marginBottom: 20 }}
            />
            <Table
                columns={columns}
                dataSource={clientes}
                rowKey="id"
                loading={loading}
            />
        </div>
    );
};

export default Pacientes;

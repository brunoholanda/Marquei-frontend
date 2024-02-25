import React, { useEffect, useState } from 'react';
import { Button, Input, Table, message, notification } from 'antd';
import api from 'components/api/api';
import { EyeOutlined, TeamOutlined, WarningFilled, WhatsAppOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';

import '../ClientDetails/ClientDetails.css';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;

const Pacientes = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedClient] = useState(null);
    const [setAppointmentHistory] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true);
    const [nomeConsultorio, setNomeConsultorio] = useState('');

    useEffect(() => {
        const fetchNomeConsultorio = async () => {
            const companyID = localStorage.getItem('companyID');
            if (companyID) {
                try {
                    const response = await api.get(`/companies/${companyID}`);
                    setNomeConsultorio(response.data.nome);
                } catch (error) {
                    console.error('Erro ao buscar nome do consultório:', error);
                    showNotification('error', 'Erro ao buscar nome do consultório.');
                }
            }
        };

        fetchNomeConsultorio();
    }, []);

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

    const getSaudacao = () => {
        const hora = new Date().getHours();
        if (hora >= 0 && hora < 12) return "bom dia";
        if (hora >= 12 && hora < 18) return "boa tarde";
        return "boa noite";
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const formatName = (name) => {
        const nameParts = name.split(' ');
        if (nameParts.length > 3) {
            return `${nameParts[0]} ${nameParts[1]} ${nameParts[2]}`;
        }
        return name;
    };

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (text) => isMobile ? formatName(text) : text,

        },
      
      
    ];

    if (!isMobile) {
        columns.push(
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
                title: 'Ação',
                key: 'action',
                render: (text, record) => {
                    const primeiroNome = record.nome.split(" ")[0];
                    const saudacao = getSaudacao();
                    const mensagem = `Oi, ${primeiroNome} ${saudacao}, sou do consultório ${nomeConsultorio}, tudo bem?`;

                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: 'fit-content', alignItems: 'center'}}>
                            <Button type='primary' onClick={() => handleViewDetails(record.id)}>Detalhes <EyeOutlined /></Button>
                            <Button
                                key={`whatsapp-${record.id}`}
                                className="button-whats modal-btn"
                                onClick={() => {
                                    const phoneNumber = record.celular.replace(/[^0-9]/g, "");
                                    window.open(`https://api.whatsapp.com/send?phone=+55${phoneNumber}&text=${encodeURIComponent(mensagem)}`, '_blank');
                                }}
                            >
                                Conversar <WhatsAppOutlined />
                            </Button>
                        </div>
                    );
                },
            }
        );
    } else {
        // Apenas a coluna de ação ajustada para mobile
        columns.push({
            title: 'Ação',
            key: 'action',
            render: (text, record) => {
                const primeiroNome = record.nome.split(" ")[0];
                const saudacao = getSaudacao();
                const mensagem = `Oi, ${primeiroNome} ${saudacao}, sou do consultório ${nomeConsultorio}, tudo bem?`;
    
                return (
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: 'fit-content', alignItems: 'center'}}>
                        <Button type='primary' onClick={() => handleViewDetails(record.id)} icon={<EyeOutlined />}>{!isMobile && 'Detalhes'}</Button>
                        <Button
                            key={`whatsapp-${record.id}`}
                            className="button-whats modal-btn"
                            onClick={() => {
                                const phoneNumber = record.celular.replace(/[^0-9]/g, "");
                                window.open(`https://api.whatsapp.com/send?phone=+55${phoneNumber}&text=${encodeURIComponent(mensagem)}`, '_blank');
                            }}
                            icon={<WhatsAppOutlined />}>{!isMobile && 'Conversar'}
                        </Button>
                    </div>
                );
            },
        });
    }



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
                style={{ width: isMobile ? '100%' : '50%', marginBottom: 20 }}  // Estilo condicional baseado no estado isMobile
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

import React, { useEffect, useRef, useState } from 'react';
import { Button, DatePicker, Input, InputNumber, Modal, Table, Tabs, TimePicker, message, notification } from 'antd';
import api from 'components/api/api';
import { EyeOutlined, SearchOutlined, TeamOutlined, WarningFilled } from '@ant-design/icons';
import debounce from 'lodash/debounce'; // Adicione o lodash para usar o debounce
import ReactInputMask from 'react-input-mask';
import ReactToPrint from 'react-to-print';
import CertificatePage from 'pages/ClientDetails/Atestado';
import DeclarationPage from 'pages/ClientDetails/Declaration';
import ReceitaPage from 'pages/ClientDetails/Receita';
import '../ClientDetails/ClientDetails.css';
const { Search } = Input;
const { TabPane } = Tabs;

const Clients = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [editedDetails, setEditedDetails] = useState({});
    const [appointmentHistory, setAppointmentHistory] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isReceitaModalVisible, setIsReceitaModalVisible] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [professionalCredentials, setProfessionalCredentials] = useState({ matricula: '', senha: '' });
    const [professionalId, setProfessionalId] = useState(null);
    const [clientNotes, setClientNotes] = useState('');
    const [clientId, setClientId] = useState(null);

    const [isDeclarationModalVisible, setIsDeclarationModalVisible] = useState(false);
    const [certificateData, setCertificateData] = useState({
        date: null,
        days: 1,
        reason: ''
    });
    const [declarationData, setDeclarationData] = useState({
        date: null,
        startTime: null,
        endTime: null
    });
    const [receitaData, setReceitaData] = useState({
        medicamentos: ['']
    });

    const showNotification = (type, message) => {
        notification[type]({
            message: message,
        });
    };

    const onSearch = debounce(async (value) => {
        const cleanedValue = value.replace(/[^a-zA-Z0-9]/g, ''); // Remove caracteres especiais
    
        if (!cleanedValue.trim()) return; // Verifica se o valor limpo não é apenas espaços em branco
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
                    searchTerm: cleanedValue.trim(), //
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
    


    const showClientDetails = async (clientId) => {
        setLoading(true);
        try {
            const response = await api.get(`/clients/${clientId}`);
            setSelectedClient(response.data);
        } catch (error) {
            console.error('Erro ao buscar detalhes do cliente:', error);
            showNotification('error', 'Erro ao buscar detalhes do cliente.');
        }
        setLoading(false);
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
                <Button
                    onClick={() => showClientDetails(record.id)}
                    icon={<EyeOutlined />}
                    type='primary'
                >
                    Detalhes
                </Button>
            ),
        },
    ];

    const handleInputChange = (key, value) => {
        setEditedDetails(prevDetails => ({
            ...prevDetails,
            [key]: value
        }));
    }

    const handleSaveChanges = async () => {
        try {
            if (!selectedClient || !selectedClient.id) {
                throw new Error("ID do cliente não encontrado");
            }

            const response = await api.put(`/clients/${selectedClient.id}`, editedDetails);
            if (response.status === 200) {
                message.success("Detalhes atualizados com sucesso!");
                setSelectedClient({ ...selectedClient, ...editedDetails });
            } else {
                throw new Error("Falha ao atualizar detalhes do cliente");
            }
        } catch (error) {
            console.error("Erro ao atualizar detalhes", error);
            message.error(`Erro ao atualizar detalhes: ${error.message || error}`);
        }
    }

    const convertDate = (dateStr) => {
        const parts = dateStr.split("/");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    };

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


    const columnsHistory = [
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
            title: 'Motivo',
            dataIndex: 'motivo',
            key: 'motivo',
        },
        {
            title: 'Quem Atendeu',
            dataIndex: 'professionalName',
        },
    ];

    const paginationConfig = {
        pageSize: 5, // Define 5 linhas por página
    };

    const certificatePageRef = useRef(null);
    const declarationPageRef = useRef(null);
    const receitaPageRef = useRef(null);


    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleAuthModalOpen = () => {
        setIsAuthModalVisible(true);
    };

    
    const handleAuthModalClose = () => {
        setIsAuthModalVisible(false);
    };

    const handleCredentialChange = (e) => {
        const { name, value } = e.target;
        setProfessionalCredentials(prevCreds => ({
            ...prevCreds,
            [name]: value
        }));
    };

    const handleAuthSubmit = async () => {
        try {
            const response = await api.post('/professionals/authenticate', {
                login: professionalCredentials.matricula,
                senha: professionalCredentials.senha
            });
    
            if (response.data.autenticado) {
                setProfessionalId(response.data.professional_id);
                handleAuthModalClose();
    
                if (actionType === 'certificate') {
                    handleOpenModal(); // Abre o modal de atestado
                } else if (actionType === 'declaration') {
                    handleOpenDeclarationModal(); // Abre o modal de declaração
                } else if (actionType === 'recipe') {
                    handleOpenReceitaModal(); // Abre o modal de receita
                }
            } else {
                message.error("Credenciais inválidas");
            }
        } catch (error) {
            console.error("Erro de autenticação", error);
            message.error("Erro na autenticação");
        }
    };
    

    const handleOpenDeclarationModal = () => {
        setIsDeclarationModalVisible(true);
    };

    const handleOpenReceitaModal = () => {
        setIsReceitaModalVisible(true);
    };

    const handleCloseReceitaModal = () => {
        setIsReceitaModalVisible(false);
    };


    const handleEmitirAtestado = () => {
        setActionType('certificate');
        handleAuthModalOpen();
    };

    const handleEmitirDeclaracao = () => {
        setActionType('declaration');
        handleAuthModalOpen();
    };

    const handleEmitirReceita = () => {
        setActionType('recipe');
        handleAuthModalOpen();
    };

    const handleMedicamentoChange = (index, value) => {
        const newMedicamentos = [...receitaData.medicamentos];
        newMedicamentos[index] = value;
        setReceitaData({ ...receitaData, medicamentos: newMedicamentos });
    };

    const addMedicamentoField = () => {
        setReceitaData({ ...receitaData, medicamentos: [...receitaData.medicamentos, ''] });
    };

    const removeMedicamentoField = (index) => {
        const newMedicamentos = [...receitaData.medicamentos];
        newMedicamentos.splice(index, 1);
        setReceitaData({ ...receitaData, medicamentos: newMedicamentos });
    };

    const handleCertificateInputChange = (key, value) => {
        setCertificateData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const handleSearchChange = async (value) => {
        setCertificateData({ ...certificateData, reason: value });
        if (value.length > 3) {
            try {
                const response = await api.get(`cid10/search?query=${value}`);

                setSearchResults(response.data);
            } catch (error) {
                console.error('Erro na busca:', error);
            }
        }
    };

    const handleSelectDisease = (result) => {
        setCertificateData({ ...certificateData, reason: result.code });
        setSearchResults([]);
    };


    const handleSaveNotes = async () => {
        try {
            await api.post(`/clients/${clientId}/notes`, { notes: clientNotes });
            message.success("Observações salvas com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar observações", error);
            message.error("Erro ao salvar observações");
        }
    };

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
            {selectedClient && (
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Dados Pessoais" key="1">
                        <p><b>Nome:</b> <Input value={editedDetails.nome || selectedClient.nome} onChange={(e) => handleInputChange('nome', e.target.value)} /></p>
                        <p><b>Data de Nascimento:</b> <Input value={editedDetails.data_nascimento || selectedClient.data_nascimento} onChange={(e) => handleInputChange('data_nascimento', e.target.value)} /></p>
                        <p><b>Telefone:</b>
                            <ReactInputMask
                                mask="(99) 9 9999-9999"
                                value={editedDetails.celular || selectedClient.celular}
                                onChange={(e) => handleInputChange('celular', e.target.value)}
                            >
                                {(inputProps) => <Input {...inputProps} />}
                            </ReactInputMask>
                        </p>
                        <p><b>Plano:</b> <Input value={editedDetails.planodental || selectedClient.planodental} onChange={e => handleInputChange('planodental', e.target.value)} /></p>
                        <p><b>CPF:</b>
                            <ReactInputMask
                                mask="999.999.999-99"
                                value={editedDetails.cpf || selectedClient.cpf}
                                onChange={(e) => handleInputChange('cpf', e.target.value)}
                                disabled={true}
                            >
                                {(inputProps) => <Input {...inputProps} disabled={true} />}
                            </ReactInputMask>
                        </p>
                        <Button onClick={handleSaveChanges}>Salvar</Button>                    </TabPane>
                    <TabPane tab="Histórico de Consultas" key="2">
                        <Table
                            pagination={paginationConfig} // Aplica a configuração de paginação
                            columns={columnsHistory}
                            dataSource={appointmentHistory}
                            rowKey="id"
                        />
                    </TabPane>
                    <TabPane tab="Atestados e Receitas" key="3">
                    <div style={{ display: 'none' }}>
                <CertificatePage
                    nome={selectedClient.nome}
                    days={certificateData.days}
                    date={certificateData.date}
                    reason={certificateData.reason}
                    professionalId={professionalId}
                    ref={certificatePageRef}
                />
            </div>
            <div style={{ display: 'none' }}>
                <DeclarationPage
                    nome={selectedClient.nome}
                    date={declarationData.date}
                    startTime={declarationData.startTime}
                    endTime={declarationData.endTime}
                    professionalId={professionalId}
                    ref={declarationPageRef}
                />
            </div>
            <div style={{ display: 'none' }}>
                <ReceitaPage
                    nome={selectedClient.nome}
                    medicamentos={receitaData.medicamentos}
                    professionalId={professionalId}
                    ref={receitaPageRef}
                />
            </div>
                    <div className='atestados-botoes'>
                        <Button onClick={handleEmitirAtestado}>Emitir Atestado</Button>
                        <Button onClick={handleEmitirDeclaracao}>Emitir Declaração</Button>
                        <Button onClick={handleEmitirReceita}>Emitir Receita</Button>

                    </div>
                    <Modal
                        title="Emitir Atestado"
                        visible={isModalVisible}
                        onCancel={handleCloseModal}
                        footer={[
                            <Button key="back" onClick={handleCloseModal}>Cancelar</Button>,
                            <ReactToPrint
                                trigger={() => <Button type="primary">Emitir</Button>}
                                content={() => certificatePageRef.current}
                            />
                        ]}
                    >
                        <p>Preencha os dados para emitir uma atestado ao paciente <b>{selectedClient.nome}</b></p>
                        <p>
                            <b>Apartir de: </b>
                            <DatePicker format="DD/MM/YYYY" onChange={(date, dateString) => handleCertificateInputChange('date', dateString)} />
                        </p>
                        <p>
                            <b>Quantidade de dias: </b>
                            <InputNumber
                                min={1}
                                value={certificateData.days}
                                onChange={value => handleCertificateInputChange('days', value)}
                            />
                        </p>
                        {certificateData.days > 15 && (
                            <p style={{ color: 'red' }}>
                                Para licenças médicas que ultrapassem 15 dias, oriente o paciente a procurar o INSS caso esteja sob regime de trabalho CLT.
                            </p>
                        )}
                        <p>
                            <b>Motivo/CID <SearchOutlined /></b>
                            <Input value={certificateData.reason} onChange={e => handleSearchChange(e.target.value)} placeholder='Pesquise a CID' />
                        </p>
                        {searchResults.length > 0 && (
                            <ul className="search-results-list">
                                {searchResults.map((result, index) => (
                                    <li key={index} onClick={() => handleSelectDisease(result)}>
                                        {result.description} ({result.code})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Modal>
                    <Modal
                        title="Emitir Declaração"
                        visible={isDeclarationModalVisible}
                        onCancel={() => setIsDeclarationModalVisible(false)}
                        footer={[
                            <Button key="back" onClick={() => setIsDeclarationModalVisible(false)}>Cancelar</Button>,
                            <ReactToPrint
                                trigger={() => <Button type="primary">Emitir Declaração</Button>}
                                content={() => declarationPageRef.current}
                            />
                        ]}
                    >
                        <p>Selecione a data e o intervalo de horas para a declaração de comparecimento:</p>
                        <div style={{ marginBottom: '10px' }}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                onChange={(date, dateString) => setDeclarationData({ ...declarationData, date: dateString })}
                                placeholder="Selecione a Data"
                            />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <TimePicker
                                format="HH:mm"
                                onChange={(time, timeString) => setDeclarationData({ ...declarationData, startTime: timeString })}
                                placeholder="Hora de Início"
                            />
                            <div style={{ marginLeft: '18px' }}>
                                <TimePicker
                                    format="HH:mm"
                                    onChange={(time, timeString) => setDeclarationData({ ...declarationData, endTime: timeString })}
                                    placeholder="Hora de Fim"
                                />
                            </div>
                        </div>
                    </Modal>
                    <Modal
                        title="Emitir Receita"
                        visible={isReceitaModalVisible}
                        onCancel={handleCloseReceitaModal}
                        footer={[
                            <Button key="back" onClick={handleCloseReceitaModal}>Cancelar</Button>,
                            <ReactToPrint
                                trigger={() => <Button type="primary">Emitir Receita</Button>}
                                content={() => receitaPageRef.current}
                            />
                        ]}
                    >
                        <p>Insira os medicamentos:</p>
                        {receitaData.medicamentos.map((medicamento, index) => (
                            <Input
                                key={index}
                                value={medicamento}
                                onChange={e => handleMedicamentoChange(index, e.target.value)}
                                style={{ marginBottom: '10px' }}
                                addonAfter={
                                    receitaData.medicamentos.length > 1 ? (
                                        <Button type="danger" onClick={() => removeMedicamentoField(index)}>Remover</Button>
                                    ) : null
                                }
                            />
                        ))}
                        <Button onClick={addMedicamentoField}>Adicionar Medicamento</Button>
                    </Modal>
                </TabPane>
                <TabPane tab="Anotações" key="4">
                    <div style={{ marginBottom: '16px' }}>
                        <Input.TextArea
                            rows={4}
                            value={clientNotes}
                            onChange={(e) => setClientNotes(e.target.value)}
                            style={{ marginBottom: '8px' }}
                        />
                        <Button type='primary' onClick={handleSaveNotes}>Salvar Anotações</Button>
                    </div>
                </TabPane>
                </Tabs>
                
            )}
               <Modal
                title="Autenticação do Profissional"
                visible={isAuthModalVisible}
                onCancel={handleAuthModalClose}
                onOk={handleAuthSubmit}
                okText="Autenticar"
                cancelText="Cancelar"
            >
                <p>Atestados só podem ser emitidos por meio da senha definida pelo profissional em seu cadastro. Nunca compartilhe sua senha!</p>
                <p>Essa senha só pode ser alterada pela equipe de suporte.</p>
                <Input
                    placeholder="Matrícula"
                    name="matricula"
                    value={professionalCredentials.matricula}
                    onChange={handleCredentialChange}
                />
                <Input.Password
                    placeholder="Senha"
                    name="senha"
                    value={professionalCredentials.senha}
                    onChange={handleCredentialChange}
                />
            </Modal>
        </div>
    );
};

export default Clients;

import React, { useState, useEffect, useRef } from 'react';
import { message, Button, Tabs, Input, InputNumber, DatePicker, Modal, Table, TimePicker, Select, notification } from 'antd';
import api from 'components/api/api';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './ClientDetails.css';
import CertificatePage from './Atestado';
import ReactToPrint from 'react-to-print';
import ReactInputMask from 'react-input-mask';
import { ExpandAltOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import DeclarationPage from './Declaration';
import ReceitaPage from './Receita';
import { Spin } from 'hamburger-react';


const ClientDetails = ({ userSpecialties = [] }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const [appointmentDetails, setAppointmentDetails] = useState({ nome: '' });
    const [editedDetails, setEditedDetails] = useState({ nome: '', data_nascimento: '' });
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [certificateData, setCertificateData] = useState({
        date: null,
        days: 1,
        reason: ''
    });
    const [appointmentHistory, setAppointmentHistory] = useState([]);
    const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
    const [professionalCredentials, setProfessionalCredentials] = useState({ matricula: '', senha: '' });
    const [professionalId, setProfessionalId] = useState(null);
    const [clientNotes, setClientNotes] = useState('');
    const [clientId, setClientId] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isDeclarationModalVisible, setIsDeclarationModalVisible] = useState(false);
    const [declarationData, setDeclarationData] = useState({
        date: null,
        startTime: null,
        endTime: null
    });
    const [receitaData, setReceitaData] = useState({
        medicamentos: ['']
    });
    const [isReceitaModalVisible, setIsReceitaModalVisible] = useState(false);
    const [isEmailValid, setEmailValid] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    const [actionType, setActionType] = useState(null);
    const [professionalDetails] = useState([]);
    const [shouldPrint, setShouldPrint] = useState(false);

    const certificatePageRef = useRef(null);
    const declarationPageRef = useRef(null);
    const receitaPageRef = useRef(null);
    const location = useLocation();
    const printTriggerRef = useRef();
    const [clientNotesData, setClientNotesData] = useState([]);
    const [isModalInsertNotesVisible, setIsModalInsertNotesVisible] = useState(false);
    const [noteText, setNoteText] = useState('');
    const canEmitCertificateOrRecipe = userSpecialties.includes(1) || userSpecialties.includes(2);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [professionals, setProfessionals] = useState([]);
    const [selectedProfessionalName, setSelectedProfessionalName] = useState('');
    const [isFullNoteModalVisible, setIsFullNoteModalVisible] = useState(false);
    const [fullNoteDetails, setFullNoteDetails] = useState({});


    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
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

    useEffect(() => {
        if (shouldPrint && printTriggerRef.current) {
            printTriggerRef.current.handlePrint();
            setShouldPrint(false);
        }
    }, [shouldPrint]);

    useEffect(() => {
        const fetchProfessionals = async () => {
            const storedCompanyID = localStorage.getItem('companyID');
            const token = localStorage.getItem('authToken');

            if (storedCompanyID && token) {
                try {
                    const response = await api.get(`/professionals?company_id=${storedCompanyID}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });

                    if (response.status !== 200) {
                        throw new Error('Falha ao buscar dados dos profissionais');
                    }
                    setProfessionals(response.data);
                } catch (error) {
                    console.error('Error fetching professionals:', error);
                }
            } else {
                console.error('Company ID or auth token not found in local storage');
            }
        };
        fetchProfessionals();
    }, []);


    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await api.get(`/clients/${clientId}/notes`);
                setClientNotesData(response.data);
            } catch (error) {
                console.error("Erro ao buscar anotações", error);
            }
        };

        fetchNotes();
    }, [clientId]);


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


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


    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const isFromPacientes = location.state?.from === 'Pacientes';
                let clientId = id;

                if (!isFromPacientes) {
                    const appointmentResponse = await api.get(`/agendamentos/${id}`);
                    const appointmentData = appointmentResponse.data;
                    clientId = appointmentData.client_id;
                    setAppointmentDetails(appointmentData);
                }

                const clientResponse = await api.get(`/clients/${clientId}`);
                const clientData = clientResponse.data;
                setClientId(clientId);
                setEditedDetails(clientData);

                const clientNotesResponse = await api.get(`/clients/${clientId}/notes`);
                const clientNotesData = clientNotesResponse.data;
                setClientNotes(clientNotesData.notes || '');
            } catch (error) {
                console.error("Error fetching details:", error);
                message.error("Error fetching details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id, location.state]);




    const convertDate = (dateStr) => {
        const parts = dateStr.split("/");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    };


    useEffect(() => {
        const orderByDate = (appointments) => {
            return appointments.sort((a, b) => {
                const dateA = convertDate(a.data);
                const dateB = convertDate(b.data);
                return dateB - dateA;
            });
        };


        const fetchAppointmentHistory = async () => {

            if (!clientId) {
                console.error("clientId não está definido.");
                return;
            }

            try {
                const storedCompanyID = localStorage.getItem('companyID');

                const historyResponse = await api.get(`/todos-agendamentos?client_id=${clientId}&company_id=${storedCompanyID}`);

                const filteredAppointments = historyResponse.data.filter(appointment => appointment.status === 1);

                const appointmentsWithProfessionalNames = await Promise.all(filteredAppointments.map(async (appointment) => {
                    const professionalResponse = await api.get(`/professionals/${appointment.professional_id}`);
                    appointment.professionalName = professionalResponse.data.nome; // Supondo que a resposta tenha um campo 'nome'
                    return appointment;
                }));

                const sortedAppointments = orderByDate(appointmentsWithProfessionalNames);
                setAppointmentHistory(sortedAppointments);
            } catch (error) {
                console.error("Erro ao buscar histórico de agendamentos:", error);
            }
        };
        fetchAppointmentHistory();
    }, [clientId]);



    const handleSaveChanges = async () => {
        try {
            if (!clientId) {
                throw new Error("ID do cliente não encontrado");
            }

            const response = await api.put(`/clients/${clientId}`, editedDetails);
            if (response.status === 200) {
                message.success("Detalhes atualizados com sucesso!");
                setAppointmentDetails(prevState => ({ ...prevState, ...editedDetails }));
            } else {
                throw new Error("Falha ao atualizar detalhes do cliente");
            }
        } catch (error) {
            console.error("Erro ao atualizar detalhes", error);
            message.error(`Erro ao atualizar detalhes: ${error.message || error}`);
        }
    }


    const handleInputChange = (key, value) => {
        setEditedDetails(prevDetails => ({
            ...prevDetails,
            [key]: value
        }));
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!appointmentDetails || !editedDetails) {
        return <p>Detalhes do cliente não disponíveis.</p>;
    }

    const handleCertificateInputChange = (key, value) => {
        setCertificateData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const handleShowFullNoteModal = (record) => {
        setFullNoteDetails(record); // Agora, armazena todo o registro
        setIsFullNoteModalVisible(true);
    };


    const columns = [
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



    const prontuarioCollumns = [
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date',
            render: text => formatDate(text),
        },
        {
            title: 'Paciente',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Profissional',
            dataIndex: 'professional_name',
            key: 'professionalName',
        },
        {
            title: 'Detalhes',
            dataIndex: 'notes',
            key: 'notes',render: (text, record) => (
                <>
                    <span style={{ marginRight: '10px' }}>
                        {text.substring(0, 10) + (text.length > 10 ? '...' : '')}
                    </span>
                    <Button size="small" type='primary' onClick={() => handleShowFullNoteModal(record)}>
                        <ExpandAltOutlined />Expandir
                    </Button>
                </>
            ),
        }
    ];

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
                    handleOpenModal();
                } else if (actionType === 'declaration') {
                    handleOpenDeclarationModal();
                } else if (actionType === 'recipe') {
                    handleOpenReceitaModal();
                }
            } else {
                message.error("Credenciais inválidas");
            }
        } catch (error) {
            console.error("Erro de autenticação", error);
            message.error("Erro na autenticação");
        }
    };



    const handleSaveNotes = async () => {
        const storedCompanyID = localStorage.getItem('companyID');
        const noteData = {
            nome: editedDetails.nome,
            professional_name: selectedProfessionalName,
            date: new Date().toISOString(),
            notes: noteText,
            client_id: clientId,
            company_id: storedCompanyID,
        };

        try {
            const response = await api.post(`/clients/${clientId}/notes`, noteData);
            setIsModalInsertNotesVisible(false);
            const newNote = response.data;
            newNote.date = formatDate(newNote.date);
            setClientNotesData(prevNotes => [...prevNotes, newNote]);
            notification.success({ message: 'Informação inserida com sucesso!' });
        } catch (error) {
            console.error("Erro ao inserir Informação", error);
            notification.error({ message: 'Erro ao inserir Informação' });
        }
    };



    const handleSearchChange = async (value) => {
        setCertificateData({ ...certificateData, reason: value });
        const query = value.toLowerCase();
        if (query.length > 3) {
            try {
                const response = await api.get(`cid10/search?query=${query}`);
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

    const sendLogToBackend = async (professionalDetails, patientName, days, date) => {
        const logText = `${professionalDetails.nome} para ${patientName} de ${days} dias a partir de ${date}!`;

        try {
            const response = await api.post('/logs_atestados', { text: logText });
            return response;
        } catch (error) {
            console.error('Erro ao registrar log:', error);
            message.error("Erro ao enviar log para o backend");
            throw error;
        }
    };


    const printCertificate = async () => {
        const patientName = editedDetails.nome;
        const days = certificateData.days;
        const date = certificateData.date;

        try {
            const response = await sendLogToBackend(professionalDetails, patientName, days, date);
            const logId = response.data.id;
            setQrCodeUrl(`https://marquei.com.br/#/confirm-certificate/${logId}`);
            setShouldPrint(true);
        } catch (error) {
            console.error("Erro ao emitir atestado:", error);
            message.error("Ocorreu um erro ao emitir o atestado. Por favor, tente novamente.");
        }
    };




    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === '0000-00-00') return '';

        const [year, month, day] = dateStr.split('T')[0].split('-');
        if (!year || !month || !day || year === '0000') return '';

        return `${day}/${month}/${year}`;
    };


    const handleDateChange = (value) => {
        if (value.length === 10) {
            const parts = value.split('/');
            if (parts.length === 3) {
                const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                handleInputChange('data_nascimento', isoDate);
            }
        } else {
            handleInputChange('data_nascimento', value);
        }
    };

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }


    function handleEmailChange(value) {
        handleInputChange('client_email', value);
        if (!validateEmail(value) && value.length > 0) {
            setEmailValid(false);
            setEmailErrorMessage("Por favor, insira um email em um formato válido!");
        } else {
            setEmailValid(true);
            setEmailErrorMessage('');
        }
    }

    const showModalInsertNotes = () => {
        setIsModalInsertNotesVisible(true);
    };

    const handleCancel = () => {
        setIsModalInsertNotesVisible(false);
    };

    const handleChangeNotes = (e) => {
        setNoteText(e.target.value);
    };

    const handleProfessionalChange = (professionalId) => {
        const professional = professionals.find(p => p.id === professionalId);

        if (professional) {
            setSelectedProfessional(professionalId);
            setSelectedProfessionalName(professional.nome);
        } else {
            setSelectedProfessional(null);
            setSelectedProfessionalName('');
        }
    };

    const tabList = [
        {
            key: '1',
            tab: isMobile ? 'Detalhes' : 'Dados Pessoais',
            content: (
                <div className='dadosPessoaisTab'>
                    <p><b>Nome:</b> <Input value={editedDetails.nome || appointmentDetails.nome} onChange={(e) => handleInputChange('nome', e.target.value)} /></p>
                    <p><b>Data de Nascimento:</b>
                        <ReactInputMask
                            mask="99/99/9999"
                            value={formatDate(editedDetails.data_nascimento)}
                            onChange={(e) => handleDateChange(e.target.value)}
                        >
                            {(inputProps) => <Input {...inputProps} />}
                        </ReactInputMask>
                    </p>
                    <p><b>Telefone:</b>
                        <ReactInputMask
                            mask="(99) 9 9999-9999"
                            value={editedDetails.celular || appointmentDetails.celular}
                            onChange={(e) => handleInputChange('celular', e.target.value)}
                        >
                            {(inputProps) => <Input {...inputProps} />}
                        </ReactInputMask>
                    </p>
                    <p><b>E-Mail:</b> <Input value={editedDetails.client_email} onChange={e => handleEmailChange(e.target.value)} /></p>
                    <p><b>Plano:</b> <Input value={editedDetails.planodental} onChange={e => handleInputChange('planodental', e.target.value)} /></p>
                    <p><b>CPF:</b>
                        <ReactInputMask
                            mask="999.999.999-99"
                            value={editedDetails.cpf || appointmentDetails.cpf}
                            onChange={(e) => handleInputChange('cpf', e.target.value)}
                            disabled={true}
                        >
                            {(inputProps) => <Input {...inputProps} disabled={true} />}
                        </ReactInputMask>
                    </p>
                    {!isEmailValid && <p style={{ color: 'red' }}>{emailErrorMessage}</p>}
                    <Button onClick={handleSaveChanges} disabled={!isEmailValid}>Salvar</Button>                </div>
            ),
        },
        !isMobile && {
            key: '2',
            tab: 'Histórico de Consultas',
            content: (
                <>
                    <Table columns={columns} dataSource={appointmentHistory} rowKey="id" />
                </>
            ),
        },
        {
            key: '3',
            tab: isMobile ? 'Atestados' : 'Atestados e Receitas',
            content: (
                <>
                    <div className='atestados-botoes'>
                        {canEmitCertificateOrRecipe && (
                            <>
                                <Button onClick={handleEmitirAtestado}>Emitir Atestado</Button>
                                <Button onClick={handleEmitirReceita}>Emitir Receita</Button>
                            </>
                        )}
                        <Button onClick={handleEmitirDeclaracao}>Emitir Declaração</Button>
                    </div>
                    <Modal
                        title="Emitir Atestado"
                        visible={isModalVisible}
                        onCancel={handleCloseModal}
                        footer={[
                            <Button key="back" onClick={handleCloseModal}>Cancelar</Button>,
                            <Button key="emit" type="primary" onClick={printCertificate}>Emitir</Button>,
                            <ReactToPrint
                                trigger={() => <button style={{ display: "none" }}>Print This Out</button>}
                                content={() => certificatePageRef.current}
                                ref={printTriggerRef}
                            />

                        ]}
                    >
                        <p>Preencha os dados para emitir uma atestado ao paciente <b>{appointmentDetails.nome}</b></p>
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
                </>
            ),
        },
        !isMobile && {
            key: '4',
            tab: 'Orçamentos',
            content: (
                <>
                    <div className='atestados-botoes'>
                        <Button onClick={handleEmitirAtestado}>Novo Orçamento</Button>
                    </div>
                </>
            ),
        },
        {
            key: '5',
            tab: 'Prontuário',
            content: (
                <div style={{ marginBottom: '16px' }}>
                    <Button type="primary" onClick={showModalInsertNotes} style={{ marginBottom: '16px' }}>
                        <PlusOutlined />Adicionar Informações
                    </Button>
                    <Table dataSource={clientNotesData} columns={prontuarioCollumns} />
                </div>),
        },
    ].filter(Boolean);


    return (
        <div className='clienteDetails'>
            <h1>Detalhes do Cliente</h1>
            <Button onClick={handleGoBack}>Voltar</Button>
            <div style={{ display: 'none' }}>
                <CertificatePage
                    qrCodeUrl={qrCodeUrl}
                    nome={editedDetails.nome}
                    days={certificateData.days}
                    date={certificateData.date}
                    reason={certificateData.reason}
                    professionalId={professionalId}
                    ref={certificatePageRef}
                />
            </div>
            <div style={{ display: 'none' }}>
                <DeclarationPage
                    nome={editedDetails.nome}
                    date={declarationData.date}
                    startTime={declarationData.startTime}
                    endTime={declarationData.endTime}
                    professionalId={professionalId}
                    ref={declarationPageRef}
                />
            </div>
            <div style={{ display: 'none' }}>
                <ReceitaPage
                    nome={editedDetails.nome}
                    medicamentos={receitaData.medicamentos}
                    professionalId={professionalId}
                    ref={receitaPageRef}
                />
            </div>
            <Tabs defaultActiveKey="1" >
                {tabList.map(tab => (
                    <Tabs.TabPane tab={tab.tab} key={tab.key}>
                        {tab.content}
                    </Tabs.TabPane>
                ))}
            </Tabs>
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
            <Modal
                title="Prontuário Eletrônico 📝"
                visible={isModalInsertNotesVisible}
                onOk={handleSaveNotes}
                onCancel={handleCancel}
                okText="Salvar"
                cancelText="Cancelar"
                width={650}
            >
                <p>Aqui você pode inserir informações pertinentes ao Paciente.</p>
                <Select
                    showSearch
                    style={{ width: '220px', marginBottom: '20px' }}
                    placeholder="Selecione um profissional"
                    onChange={handleProfessionalChange}
                    value={selectedProfessional}
                >
                    {professionals.map(professional => (
                        <Select.Option key={professional.id} value={professional.id}>
                            {professional.nome}
                        </Select.Option>
                    ))}
                </Select>
                <Input.TextArea
                    rows={4}
                    value={noteText}
                    onChange={handleChangeNotes}
                    placeholder="Digite aqui as informações relevantes do paciente..."
                />
            </Modal>
            <Modal
                title="Detalhes da Informção 📝"
                visible={isFullNoteModalVisible}
                onOk={() => setIsFullNoteModalVisible(false)}
                onCancel={() => setIsFullNoteModalVisible(false)}
                okText="Fechar"
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <div className='divider-line'></div>
                <p><strong>Paciente</strong> {editedDetails.nome}</p>
                <p><strong>Informação inserida por:</strong> {fullNoteDetails.professional_name} em {formatDate(fullNoteDetails.date)}</p>
                <p><strong>Informação Completa: </strong>{fullNoteDetails.notes}</p>
                <div className='divider-line'></div>
            </Modal>
        </div>
    );
}

export default ClientDetails;

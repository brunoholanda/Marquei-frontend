import React, { useState, useEffect, useRef } from 'react';
import { message, Button, Tabs, Input, InputNumber, DatePicker, Modal, Table, TimePicker } from 'antd';
import api from 'components/api/api';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './ClientDetails.css';
import CertificatePage from './Atestado';
import ReactToPrint from 'react-to-print';
import ReactInputMask from 'react-input-mask';
import { SearchOutlined } from '@ant-design/icons';
import DeclarationPage from './Declaration';
import ReceitaPage from './Receita';

const { TabPane } = Tabs;

const ClientDetails = ({ userSpecialties = [] }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const [appointmentDetails, setAppointmentDetails] = useState({ nome: '' });
    const [editedDetails, setEditedDetails] = useState({ nome: '' });
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

    const [actionType, setActionType] = useState(null);
    const [professionalDetails, setProfessionalDetails] = useState([]);

    const certificatePageRef = useRef(null);
    const declarationPageRef = useRef(null);
    const receitaPageRef = useRef(null);
    const location = useLocation();

    const canEmitCertificateOrRecipe = userSpecialties.includes(1) || userSpecialties.includes(2);

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

    const sendLogToBackend = async (professionalDetails, patientName, days, date) => {
        const logText = `${professionalDetails.nome} para ${patientName} de ${days} dias a partir de ${date}!`;

        try {
            const response = await api.post('/logs_atestados', { text: logText });
            console.log('Log registrado com sucesso');
            return response;
        } catch (error) {
            console.error('Erro ao registrar log:', error);
            message.error("Erro ao enviar log para o backend");
            throw error;
        }
    };


    useEffect(() => {
        const fetchProfessionalDetails = async () => {
            if (professionalId) {
                try {
                    const response = await api.get(`/professionals/${professionalId}`);
                    setProfessionalDetails(response.data);
                } catch (error) {
                    console.error("Erro ao buscar detalhes do profissional:", error);
                    message.error("Erro ao buscar detalhes do profissional");
                }
            }
        };

        fetchProfessionalDetails();
    }, [professionalId]);


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
                console.log('Fetching details for ID:', id);
                const isFromPacientes = location.state?.from === 'Pacientes';
                let clientId = id;

                if (!isFromPacientes) {
                    const appointmentResponse = await api.get(`/agendamentos/${id}`);
                    const appointmentData = appointmentResponse.data;
                    clientId = appointmentData.client_id;
                    setAppointmentDetails(appointmentData);
                    console.log('Fetched appointment data:', appointmentData);
                }

                const clientResponse = await api.get(`/clients/${clientId}`);
                const clientData = clientResponse.data;
                setClientId(clientId);
                setEditedDetails(clientData);
                console.log('Fetched client data:', clientData);

                const clientNotesResponse = await api.get(`/clients/${clientId}/notes`);
                const clientNotesData = clientNotesResponse.data;
                setClientNotes(clientNotesData.notes || '');
            } catch (error) {
                console.error("Error fetching details:", error);
                message.error("Error fetching details");
            } finally {
                setIsLoading(false); // Indica que o carregamento dos dados está completo
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
            console.log("Iniciando fetchAppointmentHistory com clientId:", clientId);

            if (!clientId) {
                console.error("clientId não está definido.");
                return;
            }

            try {
                const storedCompanyID = localStorage.getItem('companyID');
                console.log("Utilizando companyID:", storedCompanyID);

                const historyResponse = await api.get(`/todos-agendamentos?client_id=${clientId}&company_id=${storedCompanyID}`);
                console.log("Resposta da API para o histórico de agendamentos:", historyResponse.data);

                const filteredAppointments = historyResponse.data.filter(appointment => appointment.status === 1);

                const appointmentsWithProfessionalNames = await Promise.all(filteredAppointments.map(async (appointment) => {
                    const professionalResponse = await api.get(`/professionals/${appointment.professional_id}`);
                    appointment.professionalName = professionalResponse.data.nome; // Supondo que a resposta tenha um campo 'nome'
                    return appointment;
                }));

                const sortedAppointments = orderByDate(appointmentsWithProfessionalNames);
                console.log("Compromissos ordenados:", sortedAppointments);
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
        return <p>Carregando...</p>;
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
        try {
            await api.post(`/clients/${clientId}/notes`, { notes: clientNotes });
            message.success("Observações salvas com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar observações", error);
            message.error("Erro ao salvar observações");
        }
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

        const onAtestadoEmitido = async () => {
        const patientName = editedDetails.nome;
        const days = certificateData.days;
        const date = certificateData.date;

        try {
            const response = await sendLogToBackend(professionalDetails, patientName, days, date);
            const logId = response.data.id;
            setQrCodeUrl(`http://localhost:3000/#/confirm-certificate/${logId}`); // Atualiza qrCodeUrl
        } catch (error) {
            console.error("Erro ao emitir atestado:", error);
            message.error("Ocorreu um erro ao emitir o atestado. Por favor, tente novamente.");
        }
    };

    const printCertificate = () => {
        onAtestadoEmitido().then(() => {
            certificatePageRef.current.handlePrint(); // Supondo que `handlePrint` seja o método de `CertificatePage` que dispara a impressão
        });
    };

    
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
            <Tabs defaultActiveKey="1">
                <TabPane tab="Dados Pessoais" key="1">
                    <p><b>Nome:</b> <Input value={editedDetails.nome || appointmentDetails.nome} onChange={(e) => handleInputChange('nome', e.target.value)} /></p>
                    <p><b>Data de Nascimento:</b> <Input value={editedDetails.data_nascimento || appointmentDetails.data_nascimento} onChange={(e) => handleInputChange('data_nascimento', e.target.value)} /></p>
                    <p><b>Telefone:</b>
                        <ReactInputMask
                            mask="(99) 9 9999-9999"
                            value={editedDetails.celular || appointmentDetails.celular}
                            onChange={(e) => handleInputChange('celular', e.target.value)}
                        >
                            {(inputProps) => <Input {...inputProps} />}
                        </ReactInputMask>
                    </p>
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
                    <Button onClick={handleSaveChanges}>Salvar</Button>
                </TabPane>

                <TabPane tab="Histórico de Consultas" key="2">
                    <Table columns={columns} dataSource={appointmentHistory} rowKey="id" />
                </TabPane>

                <TabPane tab="Atestados e Receitas" key="3">
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
                            <ReactToPrint
                                trigger={() =>  <Button key="emit" type="primary" onClick={printCertificate}>Emitir</Button>}
                                content={() => certificatePageRef.current}
                                onAfterPrint={onAtestadoEmitido} // Chama a função após a impressão bem-sucedida
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
                </TabPane>
                <TabPane tab="Orçamentos" key="4">
                    <div className='atestados-botoes'>
                        <Button onClick={handleEmitirAtestado}>Novo Orçamento</Button>
                    </div>
                </TabPane>
                <TabPane tab="Anotações" key="5">
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
}

export default ClientDetails;

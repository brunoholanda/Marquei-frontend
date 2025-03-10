import React, { useState, useEffect } from 'react';
import { Table, Button, Spin, message, Modal, Tabs } from 'antd';
import api from '../../components/api/api';
import ProfessionalModal from '../../components/Modals/registerModal';
import { Link, Navigate } from 'react-router-dom';
import { DeleteOutlined, IdcardOutlined, SwapOutlined, UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons';
import '../Appointments/Appointments.css';
import CompanyDataModal from '../../components/Modals/companyModal';
import CompanyData from './CmpanyData';
import ControleAgenda from './ControleAgenda';
import PlanCard from 'components/SelerCads';
import MyPlan from './MyPlan';
import ReactJoyride from 'react-joyride';
import TrackingPage from 'pages/TrackingPage';
import { useAuth } from 'context/AuthContext';
import CryptoJS from 'crypto-js';

function Configs() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [professionals, setProfessionals] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [isCompanyModalVisible, setIsCompanyModalVisible] = useState(false);
    const [companyData, setCompanyData] = useState(null);
    const [maxProfessionals, setMaxProfessionals] = useState(null);
    const [upgradeModalVisible, setUpgradeModalVisible] = useState(false); // Novo estado para controlar a visibilidade do modal de upgrade
    const [runTutorial, setRunTutorial] = useState(false);
    const { authData } = useAuth();
    const companyID = authData.companyID;
    const userSpecialties = authData.userSpecialties;


    const customLocale = {
        next: 'Proceed',
        last: 'Blz 😊',
        skip: 'Not Now',
        close: 'Close',
    };

    
    const [steps, setSteps] = useState([
        {
            target: '.add-professional-button', // Classe CSS única para o botão Adicionar Profissional
            content: 'Clique aqui para adicionar um novo profissional ao sistema, faça o cadastro com atenção incluindo todos os dados. Em seguida clique em "Controle da Agenda"',
        },

    ]);

    useEffect(() => {
        if (!localStorage.getItem('configsTutorialShown')) {
            setRunTutorial(true);
            localStorage.setItem('configsTutorialShown', 'true');
        }
    }, []);

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        if (status === 'finished' || status === 'skipped') {
            setRunTutorial(false);
        }
    };

    const handleProfessionalSaved = (newProfessional) => {
        if (selectedProfessional) {
          // Atualiza o profissional existente
          setProfessionals(professionals.map(professional => 
            professional.id === newProfessional.id ? newProfessional : professional
          ));
        } else {
          // Adiciona um novo profissional
          setProfessionals([...professionals, newProfessional]);
        }
        closeModal(); // Fecha o modal
      };
      

    useEffect(() => {
        const fetchMaxProfessionals = async () => {

            if (companyID && authData.authToken) {
                setLoading(true);
                try {
                    const companyResponse = await api.get(`/companies/${companyID}`, {
                        headers: {
                            'Authorization': `Bearer ${authData.authToken}`
                        }
                    });
                    const serviceId = companyResponse.data.service_id;
                    console.log('servico', serviceId);
                    const serviceResponse = await api.get(`/service_details/${serviceId}`, {
                        headers: {
                            'Authorization': `Bearer ${authData.authToken}`
                        }
                    });
                    setMaxProfessionals(serviceResponse.data.persons);
                    console.log('persons', serviceResponse.data.persons);

                } catch (error) {
                    console.error('Erro ao buscar o número máximo de profissionais:', error);
                    message.error('Erro ao buscar informações do serviço');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchMaxProfessionals();
    }, [companyID, authData.authToken]);

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await api.get('/companies/1');
                setCompanyData(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados da empresa:", error);
                message.error('Erro ao buscar dados da empresa');
            }
        };

        fetchCompanyData();
    }, []);

    const closeCompanyModal = () => {
        setIsCompanyModalVisible(false);
    };
    useEffect(() => {
        const fetchProfessionals = async () => {

            if (companyID && authData.authToken) {
                setLoading(true);
                try {
                    const response = await api.get(`/professionals?company_id=${companyID}`, {
                        headers: {
                            'Authorization': `Bearer ${authData.authToken}`
                        },
                    });

                    const secretKey = import.meta.env.VITE_APP_SECRET_KEY;
                    const bytes = CryptoJS.AES.decrypt(response.data, secretKey);
                    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                    setProfessionals(decryptedData);
                } catch (error) {
                    if (error.response) {
                        console.error('API response error:', error.response);
                    } else {
                        console.error('Error fetching professionals:', error);
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                console.error('Company ID or auth token not found in local storage');
            }
        };
        fetchProfessionals();
    }, [companyID, authData.authToken]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const openModal = () => {
        if (professionals.length >= maxProfessionals) {
            setUpgradeModalVisible(true);
            return;
        }
        setSelectedProfessional(null);
        setIsModalVisible(true);
    };


    const handleUpgrade = () => {
        Navigate('/upgrade');
        setUpgradeModalVisible(false);
    };

    const closeUpgradeModal = () => {
        setUpgradeModalVisible(false);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedProfessional(null);
    };

    const editProfessional = (professional) => {
        setSelectedProfessional(professional);
        setIsModalVisible(true);
    };

    const showDeleteConfirm = (professional) => {
        Modal.confirm({
            title: 'Tem certeza que deseja excluir este profissional? 😢',
            content: 'Remarque os clientes ja agendados para outro Profissional, Fazendo isso, todos os horários referentes a ele ficarão indisponíveis para os clientes!',
            okText: 'Excluir',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                deleteProfessional(professional.id);
            }
        });
    };

    const deleteProfessional = async (id) => {
        setLoading(true);
        try {
            await api.delete(`/professionals/${id}`);
            setProfessionals(professionals.filter(professional => professional.id !== id));
            message.success('Profissional excluído com sucesso');
        } catch (error) {
            console.error("Erro ao excluir o profissional:", error);
            message.error('Erro ao excluir o profissional');
        } finally {
            setLoading(false);
        }
    };

    const formatName = (name) => {
        const nameParts = name.split(' ');
        if (nameParts.length > 2) {
            return `${nameParts[0]} ${nameParts[1]}`; // Retorna apenas os dois primeiros nomes
        }
        return name;
    };

    let columns = [
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
                title: 'Celular',
                dataIndex: 'celular',
                key: 'celular',
            },
            {
                title: 'Registro Profissional',
                dataIndex: 'registro_profissional',
                key: 'registro_profissional',
            },
        );
    }
    columns.push({
        title: 'Ação',
        key: 'action',
        render: (text, record) => (
            <>
                <Link to={`/professionals/${record.id}`} style={{ marginRight: 8 }}>
                    {isMobile ? (
                        <Button icon={<UserSwitchOutlined />} onClick={() => editProfessional(record)} />
                    ) : (
                        <Button type="primary" onClick={() => editProfessional(record)}>
                            <UserSwitchOutlined /> Editar
                        </Button>
                    )}
                </Link>
                {isMobile ? (
                    <Button icon={<DeleteOutlined />} type="primary" danger onClick={() => showDeleteConfirm(record)} />
                ) : (
                    <Button type="primary" danger onClick={() => showDeleteConfirm(record)}>
                        <DeleteOutlined /> Excluir
                    </Button>
                )}
            </>
        ),
    });


    const tabList = [
        {
            key: '1',
            tab: isMobile ? 'Profissionais' : 'Controle de Profissionais',  // Nome da tab ajustado para mobile
            content: (
                <>
                    <h1>Controle de Profissionais <IdcardOutlined /></h1>
                    <p>Aqui você pode adicionar profissionais ou atualizar seus dados.</p>
                    <Button className="add-professional-button" style={{ marginBottom: '10px' }} type="primary" onClick={openModal}>
                        <UserAddOutlined />Adicionar Profissional
                    </Button>
                    <Modal
                        title="Limite de Profissionais Atingido"
                        visible={upgradeModalVisible}
                        onCancel={closeUpgradeModal}
                        footer={[
                            <Button key="back" onClick={closeUpgradeModal}>
                                Cancelar
                            </Button>,
                        ]}
                    >
                        <p>Seu plano contratado só permite até {maxProfessionals} profissionais. Caso sua clínica esteja crescendo, faça um upgrade do seu plano.</p>
                        <PlanCard maxProfessionals={maxProfessionals} />
                    </Modal>
                    <ProfessionalModal
                        isVisible={isModalVisible}
                        onClose={closeModal}
                        initialData={selectedProfessional}
                        userSpecialties={userSpecialties}
                        onProfessionalSaved={handleProfessionalSaved}
                    />
                    <CompanyDataModal
                        isVisible={isCompanyModalVisible}
                        onClose={closeCompanyModal}
                        company={companyData}
                    />

                    {loading ? (
                        <Spin size="large" />
                    ) : (
                        <Table dataSource={professionals} columns={columns} rowKey="id" />
                    )}
                </>
            ),
        },
        {
            key: '2',
            tab: isMobile ? 'Agenda' : 'Controle da Agenda',  // Nome da tab ajustado para mobile
            content: (
                <>
                    <ControleAgenda />
                </>
            ),
        },
        {
            key: '3',
            tab: isMobile ? 'Empresa' : 'Dados Empresa', // Nome da tab ajustado para mobile
            content: (
                <>
                    <CompanyData />
                </>
            ),
        },
        !isMobile && {
            key: '4',
            tab: 'Chamados',
            content: (
                <>
                    <TrackingPage />
                </>
            ),
        },
        !isMobile && {
            key: '5',
            tab: 'Meu Plano',
            content: (
                <div style={{ marginBottom: '16px' }}>
                    <MyPlan />
                </div>
            ),
        },
    ].filter(Boolean);

    return (
        <div className='tabela'>
            <h3>Navegue entre as opções abaixo <SwapOutlined /></h3>
            <Tabs defaultActiveKey="1" className="custom-tab-class" type='card' style={{margin: '2rem 0 0 0'}}>
                {tabList.map(tab => (
                    <Tabs.TabPane tab={tab.tab} key={tab.key}>
                        {tab.content}
                    </Tabs.TabPane>
                ))}
            </Tabs>
            <ReactJoyride
                run={runTutorial}
                steps={steps}
                callback={handleJoyrideCallback}
                continuous={true}
                showSkipButton={true}
                locale={customLocale}
                styles={{
                    options: {
                        zIndex: 10000,
                    },
                }}
            />
        </div>
    );
}

export default Configs;

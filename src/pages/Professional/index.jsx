import React, { useState, useEffect } from 'react';
import { Table, Button, Spin, message, Modal } from 'antd';
import api from '../../components/api/api'; // Assuming you're using Axios for API calls
import ProfessionalModal from '../../components/Modals/registerModal';
import { Link } from 'react-router-dom';
import { EyeOutlined, SolutionOutlined, UserAddOutlined, UserDeleteOutlined, UserSwitchOutlined } from '@ant-design/icons';
import '../Appointments/Appointments.css';
import CompanyDataModal from '../../components/Modals/companyModal';

function Configs() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [professionals, setProfessionals] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [isCompanyModalVisible, setIsCompanyModalVisible] = useState(false);
    const [companyData, setCompanyData] = useState(null); 

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

    const openCompanyModal = () => {
        setIsCompanyModalVisible(true);
    };

    const closeCompanyModal = () => {
        setIsCompanyModalVisible(false);
    };
    useEffect(() => {
        const fetchProfessionals = async () => {
            const storedCompanyID = localStorage.getItem('companyID');
            const token = localStorage.getItem('authToken');
    
            if (storedCompanyID && token) {
                setLoading(true);
                try {
                    const response = await api.get(`/professionals?company_id=${storedCompanyID}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });
    
                    setProfessionals(response.data); 
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
    }, []);    

    const openModal = () => {
        setSelectedProfessional(null);
        setIsModalVisible(true);
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

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
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
        {
            title: 'Ação',
            key: 'action',
            render: (text, record) => (
                <>
                    <Link to={`/professionals/${record.id}`} style={{ marginRight: 8 }}>
                        <Button type="primary" onClick={() => editProfessional(record)}>
                            <UserSwitchOutlined /> Editar
                        </Button>
                    </Link>
                    <Button type="primary" danger onClick={() => showDeleteConfirm(record)}>
                        <UserDeleteOutlined />Excluir
                    </Button>
                </>
            ),
        }

    ];


    return (
        <div className='tabela'>
            <h1>Controle de Profissionais <SolutionOutlined /></h1>
            <p>Aqui você pode adicionar profissionais ou atualizar seus dados.</p>
            <Button style={{ marginBottom: '10px' }} type="primary" onClick={openModal}>
                <UserAddOutlined />Adicionar Profissional
            </Button>
            <Button style={{ margin: '0 0 10px 10px' }} type="primary" onClick={openCompanyModal}>
                <EyeOutlined />Dados da Empresa
            </Button>
            <ProfessionalModal
                isVisible={isModalVisible}
                onClose={closeModal}
                initialData={selectedProfessional}
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
        </div>
    );
}

export default Configs;

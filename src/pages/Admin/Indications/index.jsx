import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Select, Table, Tooltip, notification } from 'antd';
import api from 'components/api/api';
import { useAuth } from 'context/AuthContext';
import { DislikeOutlined, ExclamationCircleOutlined, LikeOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { DividerLine } from 'components/Modals/Styles';

const IndicationsTable = () => {
    const [chamados, setRecommendation] = useState([]);
    const { authData } = useAuth();
    const companyID = authData.companyID;
    const [isModalActionsVisible, setIsModalActionsVisible] = useState(false);
    const [selectedRecommendation, setSelectedRecommendation] = useState(null);
    const [formStatus, setFormStatus] = useState('');
    const [formMotivo, setFormMotivo] = useState('');


    useEffect(() => {
        const fetchChamados = async () => {
            try {
                const response = await api.get(`/recommendations/${companyID}`);
                console.log(response);
                setRecommendation(response.data);
            } catch (error) {
                console.error("Erro ao buscar chamados:", error);
            }
        };

        fetchChamados();
    }, [companyID]);

    const showActionsModal = (recommendation) => {
        setSelectedRecommendation(recommendation);
        setFormStatus(recommendation.status?.toString() || '0');
        setFormMotivo('');
        setIsModalActionsVisible(true);
    };

    const handleOk = async () => {

        if (!selectedRecommendation || formStatus === '' || !selectedRecommendation.id) return;

        if (formStatus === "2" && !formMotivo.trim()) {
            notification.error({ message: 'Por favor, forneça o motivo da não adesão.' });
            return;
        }


        try {
            const { id } = selectedRecommendation; // Correção aqui: desestruturação dentro do try.
            await api.put(`/recommendations/${id}`, {
                status: formStatus,
                motivo: formMotivo,
            });
            setRecommendation(chamados.map(recommendation => {
                if (recommendation.id === id) {
                    return { ...recommendation, status: formStatus, motivo: formMotivo };
                }
                return recommendation;
            }));

            notification.success({ message: 'Tratamento salvo com sucesso!' });
            setIsModalActionsVisible(false);
        } catch (error) {
            console.error("Erro ao tratar recomendação chamado:", error);
        }
    };


    const columns = [
        {
            title: 'Quem indicou',
            dataIndex: 'company_name',
            key: 'company_name',
        },
        {
            title: 'Indicado',
            dataIndex: 'indicated',
            key: 'indicated',
        },
        {
            title: 'Especialidade',
            dataIndex: 'especialidade',
            key: 'especialidade',
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
            key: 'telefone',
            render: (text, record) => {

                const phoneNumber = text ? text.replace(/[^0-9]/g, "") : '';
                const whatsappLink = phoneNumber ? `https://wa.me/${phoneNumber}` : 'javascript:void(0);';

                return (
                    <>
                        {text || 'Não disponível'}
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                            <Button icon={<WhatsAppOutlined />} shape="circle" style={{ marginLeft: 8 }} disabled={!phoneNumber} />
                        </a>
                    </>
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => {
                let content;
                switch (status) {
                    case "1":
                        content = {
                            icon: <LikeOutlined style={{ color: "green", marginRight: 8 }} />,
                            text: "Aderiu"
                        };
                        break;
                    case "2":
                        content = {
                            icon: <DislikeOutlined style={{ color: "red", marginRight: 8 }} />,
                            text: "Não Aderiu"
                        };
                        break;
                    default:
                        content = {
                            icon: <ExclamationCircleOutlined style={{ color: "orange", marginRight: 8 }} />,
                            text: "A Iniciar"
                        };
                }
                return (
                    <Tooltip title={content.text}>
                        <span>
                            {content.icon}
                            {content.text}
                        </span>
                    </Tooltip>
                );
            }
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_, record) => (
                <Button type="primary" onClick={() => showActionsModal(record)}>
                    Tratar
                </Button>
            ),
        },
    ];



    return (
        <>
            <Table dataSource={chamados} columns={columns} rowKey="id" />;
            <Modal
                title="Tratar Indicação"
                visible={isModalActionsVisible}
                okText='Salvar'
                onOk={handleOk}
                onCancel={() => setIsModalActionsVisible(false)}
            >
                <DividerLine />
                <p>{selectedRecommendation?.motivo}</p>
                <Select value={formStatus} onChange={setFormStatus} style={{ width: 120, marginBottom: 20 }}>
                    <Select.Option value="1">Aderiu</Select.Option>
                    <Select.Option value="2">Nao aderiu</Select.Option>
                </Select>
                <Input.TextArea
                    value={formMotivo}
                    onChange={(e) => setFormMotivo(e.target.value)}
                    placeholder="Descreva o motivo da não adesão"
                />
            </Modal>
        </>
    )


};

export default IndicationsTable;

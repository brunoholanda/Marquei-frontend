import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Select, Table, Tooltip } from 'antd';
import api from 'components/api/api';
import { useAuth } from 'context/AuthContext';
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const ChamadosTable = () => {
    const [chamados, setChamados] = useState([]);
    const { authData } = useAuth();
    const companyID = authData.companyID;
    const [isModalActionsVisible, setIsModalActionsVisible] = useState(false);
    const [selectedChamado, setSelectedChamado] = useState(null);
    const [formStatus, setFormStatus] = useState('');
    const [formAnswer, setFormAnswer] = useState('');


    useEffect(() => {
        const fetchChamados = async () => {
            try {
                const response = await api.get(`/chamados/${companyID}`);
                console.log(response);
                setChamados(response.data);
            } catch (error) {
                console.error("Erro ao buscar chamados:", error);
            }
        };

        fetchChamados();
    }, [companyID]);

    const showActionsModal = (chamado) => {
        setSelectedChamado(chamado);
        setFormStatus(chamado.status?.toString() || '0');
        setFormAnswer('');
        setIsModalActionsVisible(true);
    };

    const handleOk = async () => {
        if (!selectedChamado || formStatus === '') return;

        try {
            await api.put(`/chamados/${selectedChamado.id}`, {
                status: formStatus,
                answer: formAnswer,
            });

            setIsModalActionsVisible(false);
            // Atualiza a lista de chamados após a atualização
            const response = await api.get(`/chamados/${companyID}`);
            setChamados(response.data);
        } catch (error) {
            console.error("Erro ao atualizar chamado:", error);
        }
    };


    const columns = [
        {
            title: 'Número do Chamado',
            dataIndex: 'ticket_number',
            key: 'ticket_number',
        },
        {
            title: 'Empresa',
            dataIndex: 'company_name',
            key: 'company_name',
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description', render: (text, record) => (
                <>
                    <span style={{ marginRight: '10px' }}>
                        {text.substring(0, 30) + (text.length > 30 ? '...' : '')}
                    </span>
                </>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => (
                <Tooltip title={status === null ? "A Iniciar" : status === 1 ? "Em Andamento" : "Concluído"}>
                    <span>
                        {status === null ? <ExclamationCircleOutlined style={{ color: "red", marginRight: 8 }} /> :
                            status === 1 ? <ClockCircleOutlined style={{ color: "orange", marginRight: 8 }} /> :
                                <CheckCircleOutlined style={{ color: "green", marginRight: 8 }} />}
                        {status === null ? "A Iniciar" : status === 1 ? "Em Andamento" : "Concluído"}
                    </span>
                </Tooltip>
            )
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_, record) => (
                <Button type="primary" onClick={() => showActionsModal(record)}>
                    Iniciar
                </Button>
            ),
        },
    ];

    return (
        <>
            <Table dataSource={chamados} columns={columns} rowKey="id" />;
            <Modal
                title="Atender Chamado"
                visible={isModalActionsVisible}
                okText='Salvar'
                onOk={handleOk}
                onCancel={() => setIsModalActionsVisible(false)}
            >
                <p>{selectedChamado?.description}</p>
                <Select value={formStatus} onChange={setFormStatus} style={{ width: 120, marginBottom: 20 }}>
                    <Select.Option value="1">Em andamento</Select.Option>
                    <Select.Option value="2">Concluído</Select.Option>
                </Select>
                <Input.TextArea
                    value={formAnswer}
                    onChange={(e) => setFormAnswer(e.target.value)}
                    placeholder="Descreva a resolução"
                />
            </Modal>
        </>
    )


};

export default ChamadosTable;

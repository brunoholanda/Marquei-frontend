import React, { useState, useEffect } from 'react';
import { Table, message, Modal, Tooltip } from 'antd';
import api from '../../components/api/api';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, RetweetOutlined } from '@ant-design/icons';

const statusText = {
    null: 'A Iniciar',
    1: 'Em Andamento',
    2: 'Concluído'
};

const TrackingPage = () => {
    const [chamados, setChamados] = useState([]);
    const [selectedChamado, setSelectedChamado] = useState(null);

    useEffect(() => {
        const fetchChamados = async () => {
            try {
                const companyId = localStorage.getItem('companyID');
                const response = await api.get(`/chamados/${companyId}`);
                setChamados(response.data);
            } catch (error) {
                message.error('Erro ao buscar chamados');
            }
        };

        fetchChamados();
    }, []);

    const columns = [
        {
            title: 'Número do Chamado',
            dataIndex: 'ticket_number',
            key: 'ticket_number'
        },
        {
            title: 'Data de Abertura',
            dataIndex: 'created_at',
            key: 'created_at',
            render: text => new Date(text).toLocaleDateString()
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => (
                <Tooltip title={status === null ? "A Iniciar" : status === 1 ? "Em Andamento" : "Concluído"}>
                    <span>
                        {status === null ? <ExclamationCircleOutlined style={{ color: "orange", marginRight: 8 }} /> :
                            status === 1 ? <CheckCircleOutlined style={{ color: "green", marginRight: 8 }} /> :
                                <CloseCircleOutlined style={{ color: "red", marginRight: 8 }} />}
                        {status === null ? "A Iniciar" : status === 1 ? "Em Andamento" : "Concluído"}
                    </span>
                </Tooltip>
            )
        }
    ];

    return (
        <>
            <h1>Chamados <RetweetOutlined /></h1>
            <Table
                columns={columns}
                dataSource={chamados}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            setSelectedChamado(record);
                        }
                    };
                }}
            />

            <Modal
                title={`Chamado ${selectedChamado?.ticket_number}`}
                visible={!!selectedChamado}
                onCancel={() => setSelectedChamado(null)}
                footer={null}
            >
                <p><b>Seu relato:</b></p>
                <p>{selectedChamado?.description}</p>
                <p><b>Resposta:</b></p>
                <p>
                    {
                        selectedChamado?.answer === null
                            ? "Seu chamado logo será atendido e faremos o impossível para solucionar sua demanda."
                            : selectedChamado?.answer
                    }
                </p>            </Modal>
        </>
    );
};

export default TrackingPage;

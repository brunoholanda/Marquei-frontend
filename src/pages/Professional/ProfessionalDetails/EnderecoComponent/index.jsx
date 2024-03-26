import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message, Modal, Card, notification, Divider } from 'antd';
import { Navigate, useParams } from 'react-router-dom';
import api from 'components/api/api';
import { StyledCardEndereco, StyledCardLine, StyledCardLineModal } from '../Styles';
import { DeleteOutlined } from '@ant-design/icons';
import { useAuth } from 'context/AuthContext';
import PlanCard from 'components/SelerCads';

function EnderecoComponent() {
    const [form] = Form.useForm();
    const { id } = useParams();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [enderecos, setEnderecos] = useState([]);
    const [serviceId, setServiceId] = useState(null);
    const [maxEnderecosPermitidos, setMaxEnderecosPermitidos] = useState(0);
    const { authData } = useAuth();
    const companyID = authData.companyID;
    const [upgradeModalVisible, setUpgradeModalVisible] = useState(false); // Novo estado para controlar a visibilidade do modal de upgrade

    useEffect(() => {
        carregarEnderecos();
    }, []);

    const carregarEnderecos = async () => {
        try {
            const response = await api.get(`/enderecos/professional/${id}`);

            if (response.data) {
                setEnderecos(response.data);
            } else {
                setEnderecos([]);
            }
        } catch (error) {
            console.error('Erro ao carregar endereços:', error);
            message.error('Erro ao carregar endereços.');
        }
    };


    const showModal = () => {
        if (enderecos.length < maxEnderecosPermitidos) {
            setIsModalVisible(true);
        } else {
            setUpgradeModalVisible(true);
        }
    };
    

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            await api.post('/enderecos', {
                professional_id: id,
                rua: values.endereco,
                numero: values.numero,
                referencia: values.referencia,
                cidade: values.cidade,
                bairro: values.bairro,
                uf: values.estado,
                cep: values.cep,
            });
            carregarEnderecos();
            setIsModalVisible(false);
            form.resetFields();
            notification.success({ message: 'Endereço adicionado com sucesso!' });
        } catch (error) {
            notification.error({ message: 'Erro ao salvar endereço. Por favor, preencha todos os campos obrigatórios.' });
        }
    };


    const handleUpgrade = () => {
        Navigate('/upgrade');
        setUpgradeModalVisible(false);
    };

    const closeUpgradeModal = () => {
        setUpgradeModalVisible(false);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const confirmarDeletarEndereco = (enderecoId) => {
        Modal.confirm({
            title: 'Você realmente deseja excluir esse endereço?',
            content: 'A agenda disponível nesse endereço também será excluída com essa ação.',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            onOk() {
                deletarEndereco(enderecoId);
            },
        });
    };

    const deletarEndereco = async (enderecoId) => {
        try {
            await api.delete(`/enderecos/${enderecoId}`);
            notification.success({ message: 'Endereço deletado com sucesso!' });
            carregarEnderecos();
        } catch (error) {
            console.error('Erro ao deletar endereço:', error);
            message.error('Erro ao deletar endereço. Por favor, tente novamente.');
        }
    };

    const handleCEPChange = async (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    form.setFieldsValue({
                        endereco: data.logradouro,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        estado: data.uf,
                    });
                } else {
                    message.error("CEP não encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
                message.error("Erro ao buscar CEP.");
            }
        }
    };

    useEffect(() => {
        const fetchServiceId = async () => {
            try {
                const companyResponse = await api.get(`/companies/${companyID}`, {
                    headers: {
                        'Authorization': `Bearer ${authData.authToken}`
                    }
                });
                const serviceId = companyResponse.data.service_id;
                setServiceId(serviceId);

                switch (serviceId) {
                    case 1: setMaxEnderecosPermitidos(1); break;
                    case 2: setMaxEnderecosPermitidos(3); break;
                    case 3: setMaxEnderecosPermitidos(5); break;
                    case 4: setMaxEnderecosPermitidos(1); break;
                    default: setMaxEnderecosPermitidos(0); // Caso não identificado
                }
            } catch (error) {
                console.error('Erro ao buscar service_id da companhia:', error);
                message.error('Erro ao carregar informações da companhia.');
            }
        };

        fetchServiceId();
    }, [companyID]); // Dependendo do ID do profissional


    return (
        <>
            <Button type="primary" onClick={showModal} style={{ marginBottom: '20px' }}>
                Adicionar Endereço
            </Button>

            {enderecos.map((endereco, index) => (
                <StyledCardEndereco key={index} title={`Endereço ${index + 1}`}>
                    <StyledCardLine>
                        <p><strong>CEP:</strong> {endereco.cep}</p>
                        <p><strong>Endereço:</strong> {endereco.rua}</p>
                    </StyledCardLine>
                    <StyledCardLine>
                        <p><strong>Número:</strong> {endereco.numero}</p>
                        <p><strong>Referência:</strong> {endereco.referencia}</p>
                    </StyledCardLine>
                    <StyledCardLine>
                        <p><strong>Cidade:</strong> {endereco.cidade}</p>
                        <p><strong>Bairro:</strong> {endereco.bairro}</p>
                        <p><strong>Estado:</strong> {endereco.uf}</p>
                    </StyledCardLine>
                    <Button type="primary" danger onClick={() => confirmarDeletarEndereco(endereco.id)}>
                        Deletar <DeleteOutlined />
                    </Button>
                </StyledCardEndereco>
            ))}

            <Modal
                title="Adicionar Endereço"
                open={isModalVisible} onOk={handleOk}
                okText="Salvar" onCancel={handleCancel}
                width={600}
            >
                <Divider />
                <Form form={form} layout="vertical">
                    <StyledCardLineModal>
                        <Form.Item name="cep" label="CEP" rules={[{ required: true }]}>
                            <Input onChange={handleCEPChange} />
                        </Form.Item>
                        <Form.Item name="endereco" label="Endereço" rules={[{ required: true }]} style={{ width: '60%' }}>
                            <Input />
                        </Form.Item>
                    </StyledCardLineModal>
                    <StyledCardLineModal>
                        <Form.Item name="numero" label="Número" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="referencia" label="Referência" rules={[{ required: true }]} style={{ width: '60%' }}>
                            <Input />
                        </Form.Item>
                    </StyledCardLineModal>
                    <StyledCardLineModal>
                        <Form.Item name="cidade" label="Cidade" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="bairro" label="Bairro" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="estado" label="Estado" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </StyledCardLineModal>
                    <Divider />
                </Form>
            </Modal>
            <Modal
                title="Limite de Profissionais Atingido 😱"
                visible={upgradeModalVisible}
                onCancel={closeUpgradeModal}
                footer={[
                    <Button key="back" onClick={closeUpgradeModal}>
                        Cancelar
                    </Button>,
                ]}
            >
                <p>Seu plano contratado só permite até {maxEnderecosPermitidos} endereço(s). Caso sua clínica esteja crescendo, faça um upgrade do seu plano.</p>
                <PlanCard maxEnderecosPermitidos={maxEnderecosPermitidos} />
            </Modal>
        </>
    );
}

export default EnderecoComponent;

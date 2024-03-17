import React, { useEffect, useState } from 'react';
import { Table, Form, Input, InputNumber, Button, notification, Alert, Modal } from 'antd';
import api from 'components/api/api'; // Importe sua instância de API configurada
import './Estoque.css';
import { BarChartOutlined, WarningOutlined } from '@ant-design/icons';
import { useAuth } from 'context/AuthContext';
const StockControlPage = () => {
    const [form] = Form.useForm();
    const [stockItems, setStockItems] = useState([]);
    const [itemsCloseToEnd, setItemsCloseToEnd] = useState(0); // Novo estado
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const { authData } = useAuth();
    const companyID = authData.companyID;


    const loadStockItems = async () => {

        try {
            const response = await api.get('/stock-items', {
                params: { company_id: companyID },
            });

            setStockItems(response.data);
            const closeToEndCount = response.data.filter(item => item.quantidade <= item.limite_estoque).length;
            setItemsCloseToEnd(closeToEndCount);
        } catch (error) {
            notification.error({
                message: 'Erro ao carregar itens de estoque',
                description: error.message,
            });
        }
    };

    const handleSubmit = async (values) => {

        try {
            const response = await api.post('/stock-items', {
                ...values,
                company_id: companyID,
            });

            setStockItems([...stockItems, response.data]);
            form.resetFields();
            notification.success({ message: 'Item adicionado com sucesso!' });
        } catch (error) {
            notification.error({ message: 'Erro ao adicionar item', description: error.message });
        }
    };

    const handleUpdateQuantity = async (id, newQuantity) => {
        try {
            await api.put(`/stock-items/${id}`, { quantidade: newQuantity });
            loadStockItems();
            notification.success({ message: 'Quantidade atualizada com sucesso!' });
        } catch (error) {
            notification.error({ message: 'Erro ao atualizar quantidade', description: error.message });
        }
    };

    const handleDeleteItem = (id) => {
        Modal.confirm({
            title: 'Tem certeza que deseja excluir o item selecionado?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                try {
                    await api.delete(`/stock-items/${id}`);
                    loadStockItems(); // Recarrega a lista após a exclusão
                    notification.success({ message: 'Item excluído com sucesso!' });
                } catch (error) {
                    notification.error({ message: 'Erro ao excluir item', description: error.message });
                }
            },
        });
    };

    const showEditModal = (item) => {
        setEditingItem(item);
        setIsModalVisible(true);
    };

    const getRowClassName = (record) => {
        return record.quantidade <= record.limite_estoque ? 'low-stock' : '';
    };

    const handleEditSubmit = async (values) => {
        try {
            await api.put(`/stock-items/${editingItem.id}`, values);
            loadStockItems();
            closeModal(); // Chame closeModal ao invés de setIsModalVisible(false)
            notification.success({ message: 'Item atualizado com sucesso!' });
        } catch (error) {
            notification.error({ message: 'Erro ao atualizar item', description: error.message });
        }
    };


    useEffect(() => {
        if (companyID) {
            loadStockItems(); // Carrega itens de estoque ao iniciar a página
        }
    }, [companyID]);

    const closeModal = () => {
        form.resetFields();  // Resetando o formulário
        setEditingItem(null); // Resetando o item em edição
        setIsModalVisible(false); // Fechando o modal
    };

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Quantidade',
            dataIndex: 'quantidade',
            key: 'quantidade',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <InputNumber
                        min={0}
                        defaultValue={text}
                        onChange={newQuantity => record.newQuantity = newQuantity}
                        style={{ marginRight: 10 }}
                    />
                    <Button
                        onClick={() => handleUpdateQuantity(record.id, record.newQuantity)}
                        type="primary"
                    >
                        Atualizar
                    </Button>
                </div>
            ),
        },
        {
            title: 'Aviso de Fim',
            dataIndex: 'limite_estoque',
            key: 'limite_estoque',
        },
        {
            title: 'Ação',
            key: 'acao',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        onClick={() => showEditModal(record)}
                        type="primary"
                        style={{ marginRight: 10 }}
                    >
                        Alterar
                    </Button>
                    <Button
                        onClick={() => handleDeleteItem(record.id)}
                        type="primary"
                        danger
                    >
                        Excluir
                    </Button>
                </div>
            ),
        },
    ];


    return (
        <div className='estoque'>
            <h1>Suprimentos da Clínica <BarChartOutlined /></h1>
            {itemsCloseToEnd > 0 && (
                <Alert
                    message={`Atenção: Existem ${itemsCloseToEnd} itens chegando ao fim!`}
                    type="warning"
                    showIcon
                    icon={<WarningOutlined />}
                    style={{ marginBottom: 20 }}
                />
            )}
            <p>Para adicionar um novo item basta preencher os dados abaixo !</p>
            <Form form={form} onFinish={handleSubmit} layout="inline">
                <Form.Item name="nome" rules={[{ required: true, message: 'Insira o nome do item!' }]}>
                    <Input placeholder="Nome do Item" />
                </Form.Item>
                <Form.Item name="quantidade" rules={[{ required: true, message: 'Insira a quantidade!' }]}>
                    <InputNumber style={{ width: '105px' }} min={1} placeholder="Quantidade" />
                </Form.Item>
                <Form.Item name="limite_estoque" rules={[{ required: true, message: 'Insira o limite de estoque!' }]}>
                    <InputNumber style={{ width: '105px' }} min={0} placeholder="Aviso de Fim" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Adicionar Item</Button>
                </Form.Item>
            </Form>
            <Table
                style={{ marginTop: '20px' }}
                dataSource={stockItems}
                columns={columns}
                rowKey="id"
                rowClassName={getRowClassName} // Aplica estilo condicional
            />
            {isModalVisible && (
                <Modal
                    title="Editar Item"
                    open={isModalVisible}
                    onCancel={closeModal} // Chame closeModal aqui
                    onOk={() => form.submit()}
                >
                    <Form
                        form={form}
                        initialValues={editingItem}
                        onFinish={handleEditSubmit}
                    >
                        <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="quantidade" label="Quantidade" rules={[{ required: true }]}>
                            <InputNumber min={1} />
                        </Form.Item>
                        <Form.Item name="limite_estoque" label="Aviso de Fim" rules={[{ required: true }]}>
                            <InputNumber min={0} />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
};

export default StockControlPage;

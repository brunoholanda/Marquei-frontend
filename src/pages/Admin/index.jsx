import React, { useState, useEffect } from 'react';
import api from 'components/api/api';
import { Button, Form, Input, Modal, Select, Table, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';

const { Option } = Select;

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [form] = useForm();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get('/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error("Erro ao buscar empresas", error);
      }
    };

    fetchCompanies();
  }, []);

  const showEditModal = (company) => {
    setEditingCompany(company);
    form.setFieldsValue({
      nome: company.nome,
      cnpj: company.cnpj,
      payment_type: company.payment_type, // Isso deve corresponder ao valor do Select, como "anual" ou "mensal"
      service_id: company.service_id,
      payment_confirm: company.payment_confirm,
    });
    setIsModalVisible(true);
  };



  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await api.put(`/companies/${editingCompany.company_id}`, {
        ...values
      });
      setCompanies(prevCompanies => {
        return prevCompanies.map(c => c.company_id === editingCompany.company_id ? { ...c, ...values } : c);
      });
      notification.success({ message: 'Empresa atualizada com sucesso com sucesso!' });
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      notification.error({ message: 'Erro ao atualizar empresa!' });
      console.error("Erro ao atualizar empresa", error);
    }
  };



  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();

  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'name',
    },
    {
      title: 'Plano',
      dataIndex: 'service_id',
      key: 'service_id',
    },
    {
      title: 'Contrato',
      dataIndex: 'payment_type',
      key: 'payment_type',
    },
    {
      title: 'Status do Pagamento',
      dataIndex: 'payment_confirm',
      key: 'payment_confirm',
      render: text => text ? 'Confirmado' : 'Pendente',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Button type="primary" onClick={() => showEditModal(record)}>
          Alterar
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={companies} loading={loading} />
      <Modal title="Editar Empresa" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ ...editingCompany }}
        >
          <Form.Item label="Nome" name="nome">
            <Input />
          </Form.Item>
          <Form.Item label="CNPJ" name="cnpj">
            <Input />
          </Form.Item>
          <Form.Item label="Contrato" name="payment_type">
            <Select placeholder="Selecione o tipo de contrato">
              <Option value="anual">Anual</Option>
              <Option value="mensal">Mensal</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Plano" name="service_id">
            <Select placeholder="Selecione o plano">
              <Option value={1}>Plus</Option>
              <Option value={2}>Pro</Option>
              <Option value={3}>Premium</Option>
              <Option value={4}>Teste</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Status do Pagamento" name="payment_confirm">
            <Select placeholder="Selecione o status do pagamento">
              <Option value={true}>Pago</Option>
              <Option value={false}>Em aberto</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CompaniesTable;
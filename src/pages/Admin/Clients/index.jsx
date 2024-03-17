import React, { useState, useEffect } from 'react';
import api from 'components/api/api';
import { Button, Form, Input, Modal, Select, Table, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { WhatsAppOutlined } from '@ant-design/icons';
import { StyledTableCompanies } from '../Style';


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
      payment_type: company.payment_type,
      service_id: company.service_id,
      payment_confirm: company.payment_confirm,
      token_expiration: company.token_expiration || '',
    });

    setIsModalVisible(true);
  };


  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      await api.put(`/companies/${editingCompany.company_id}`, {
        nome: values.nome,
        payment_type: values.payment_type,
        service_id: values.service_id,
        payment_confirm: values.payment_confirm,
      });

      if (values.token_expiration) {
        await api.put(`/companies/${editingCompany.company_id}/updateTokenExpiration`, {
          token_expiration: values.token_expiration,
        });
      }

      const updatedCompanies = await api.get('/companies');
      setCompanies(updatedCompanies.data);
      notification.success({ message: 'Empresa atualizada com sucesso!' });
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
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Pesquisar nome"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90 }}
          >
            Pesquisar
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Resetar
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.nome.toString().toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'CNPJ/CPF',
      dataIndex: 'cnpj',
      key: 'cnpj',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Pesquisar CNPJ/CPF"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Pesquisar
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Resetar
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.cnpj.toString().toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Contato',
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
      title: 'Data de Expiração do Token',
      dataIndex: 'token_expiration',
      key: 'token_expiration',
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
      <StyledTableCompanies>
        <h2>Administralção de clientes</h2>
        <Table columns={columns} dataSource={companies} loading={loading} />
      </StyledTableCompanies>
      <Modal title="Editar Empresa" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ ...editingCompany }}
        >
          <Form.Item label="Nome" name="nome">
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
          <Form.Item label="Acesso até" name="token_expiration">
            <Input placeholder="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CompaniesTable;
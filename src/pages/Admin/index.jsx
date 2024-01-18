import React, { useState, useEffect } from 'react';
import api from 'components/api/api';
import { Table } from 'antd';

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
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
  ];

  return <Table columns={columns} dataSource={companies} loading={loading} />;
};

export default CompaniesTable;
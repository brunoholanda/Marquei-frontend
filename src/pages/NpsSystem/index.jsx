import React, { useState, useEffect, useRef } from 'react';
import api from 'components/api/api';
import { Button, Table } from 'antd';
import { Bar, BarChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { CheckOutlined, LineChartOutlined, LinkOutlined } from '@ant-design/icons';
import ClientResearchModal from 'components/Modals/ClientResearchModal';
import { useAuth } from 'context/AuthContext';
import npsImage from '../../public/nps.png';
import { StyledNpsPage } from './styles';

function NpsSystem() {
    const [customers, setCustomers] = useState([]);
    const [averageScore, setAverageScore] = useState(0);
    const [isResearchModalVisible, setIsResearchModalVisible] = useState(false);
    const { authData } = useAuth();
    const companyID = authData.companyID;
    const imgRef = useRef(null);

    const CustomerRatingsTable = ({ customers }) => {
        const columns = [
            {
                title: 'Nome do Cliente',
                dataIndex: 'nome',
                key: 'nome',
            },
            {
                title: 'Telefone',
                dataIndex: 'telefone',
                key: 'telefone',
            },
            {
                title: 'Nota',
                dataIndex: 'nota',
                key: 'nota',
            },
        ];

        return (
            <Table
                dataSource={customers}
                columns={columns}
                pagination={{ pageSize: 5 }}
            />
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`nps-systems?company_id=${companyID}`);
                const companyCustomers = response.data;

                setCustomers(companyCustomers);
                const totalScore = companyCustomers.reduce((acc, customer) => acc + customer.nota, 0);
                setAverageScore(companyCustomers.length > 0 ? totalScore / companyCustomers.length : 0);
            } catch (error) {
                console.error('There was an error fetching the customer data:', error);
            }
        };

        fetchData();
    }, [companyID]);

    const data = [{ name: 'Média', value: averageScore }];
    const fillColor = averageScore <= 6.5 ? '#ee3557' : averageScore <= 8.5 ? '#58b4af' : '#8ec63d';

    return (
        <StyledNpsPage>
            <h2>NPS: A métrica que sua clínica precisa para reter clientes <LineChartOutlined /></h2>
            <p><CheckOutlined /> No botão abaixo você pode compartilhar o link da pesquisa com seus clientes.</p>
            <p><CheckOutlined /> Se você é um cliente Premiuim a pesquisa será enviada automaticamente</p>
            <Button style={{ marginBottom: '50px' }} type="primary" onClick={() => setIsResearchModalVisible(true)}>
                <LinkOutlined /> Gerar Link da Pesquisa.
            </Button>
            <h3>Aqui está sua nota na escala NPS:</h3>
            <img src={npsImage} alt="escala nps com carinhas" ref={imgRef} style={{ width: '80%', height: 'auto', margin: '1rem auto' }} />
            <div style={{ width: '80%', height: '110px', margin: '1rem auto' }}>
                <ResponsiveContainer>
                    <BarChart data={data} layout="vertical">
                        <XAxis type="number" domain={[0, 10]} />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip />
                        <Bar dataKey="value" fill={fillColor} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <h3>Aqui está os clientes que avaliaram:</h3>

            <CustomerRatingsTable customers={customers} />
            {isResearchModalVisible && (
                <ClientResearchModal
                    isResearchModalVisible={isResearchModalVisible}
                    onResearchModalClose={() => setIsResearchModalVisible(false)}
                    companyID={companyID}
                />
            )}
        </StyledNpsPage>
    );
}

export default NpsSystem;

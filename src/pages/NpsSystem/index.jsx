import React, { useState, useEffect, useRef } from 'react';
import api from 'components/api/api';
import { Button, Table } from 'antd';
import { Bar, BarChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { LinkOutlined } from '@ant-design/icons';
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
            <Button style={{ marginBottom: '50px' }} type="primary" onClick={() => setIsResearchModalVisible(true)}>
                <LinkOutlined /> Gerar Link da Pesquisa.
            </Button>

            <img src={npsImage} alt="" ref={imgRef} style={{ width: '80%', height: 'auto', margin: '0 auto' }} />

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

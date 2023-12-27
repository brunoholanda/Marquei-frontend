import React, { useState, useEffect } from 'react';
import { Card, Spin, message, Button } from 'antd';
import api from '../../../components/api/api';
import {
    cardStyle,
    titleSectionStyle,
    titleStyle,
    benefitsStyle,
    priceStyle,
    indicatorStyle, 
    cardColumStyle
} from './Styles'; // Adjust the path as needed


import { CheckOutlined } from '@ant-design/icons';
const PlanCard = ({ plan, isCurrent }) => {
    const price = parseFloat(plan.price).toFixed(2);

    const currentCardStyle = {
        ...cardStyle,
        borderColor: isCurrent ? '#1890ff' : '#e8e8e8', // Change the border color for the current plan
        borderWidth: isCurrent ? '2px' : '1px',
        borderStyle: 'solid',
    };
    const currentIndicatorStyle = {
        ...indicatorStyle,
        display: isCurrent ? 'flex' : 'none',
    };

    return (
        <div style={{ position: 'relative', width: '100%' }}> 
            <Card bordered={false} style={currentCardStyle}>
                <div style={cardColumStyle}>
                    <div style={titleSectionStyle}>
                        <div style={currentIndicatorStyle}>
                            {isCurrent && <CheckOutlined style={{ color: 'white' }} />}
                        </div>
                        <div style={titleStyle}>{plan.plan}</div>
                    </div>
                    <div style={benefitsStyle}>
                        <p>No plano {plan.plan} você conta com todos os beneficios do Marquei e ainda pode adicionar até {plan.persons} profissionais na sua clinica.</p>
                        {plan.benefits && plan.benefits.join(', ')}
                    </div>
                    <div style={priceStyle}>
                        {price ? `R$ ${price}/mês` : 'N/A'}
                    </div>
                </div>
                {isCurrent && <div type="primary" block>Plano Atual</div>}

            </Card>
        </div>
    );
};


function MyPlan() {
    const [loading, setLoading] = useState(false);
    const [plans, setPlans] = useState([]);
    const [currentPlanId, setCurrentPlanId] = useState(null);

    useEffect(() => {
        const storedCompanyID = localStorage.getItem('companyID');
        const token = localStorage.getItem('authToken');

        const fetchPlans = async () => {
            if (storedCompanyID && token) {
                setLoading(true);
                try {
                    // Fetch the company's current plan
                    const companyResponse = await api.get(`/companies/${storedCompanyID}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setCurrentPlanId(companyResponse.data.service_id);

                    // Fetch all plans
                    const plansResponse = await api.get('/services', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setPlans(plansResponse.data);
                } catch (error) {
                    console.error('Error fetching plans:', error);
                    message.error('Error fetching plans');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPlans();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '20px' }}>
            {loading ? (
                <Spin size="large" />
            ) : (
                plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} isCurrent={plan.id === currentPlanId} />
                ))
            )}
        </div>
    );
}

export default MyPlan;

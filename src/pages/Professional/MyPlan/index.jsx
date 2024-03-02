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
import { useAuth } from 'context/AuthContext';
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

    const renderBenefitsText = () => {
        if (plan.plan === 'Plano Teste') {
            return (
                <p>No plano {plan.plan} você conta com todos os benefícios do Marquei por um período de <b>7 dias</b>, podendo adicionar até {plan.persons} profissional na sua clínica e, caso queira, pode contratar um plano e seus dados serão mantidos.</p>
            );
        } else if (plan.plan === 'Plus') {
            return (
                <p>No plano {plan.plan} você conta com todos os benefícios do Marquei para {plan.persons} profissional, <b>plano ideal para profissionais que trabalham por conta própria.</b></p>
            );
        } else {
            return (
                <>
                    <p>No plano {plan.plan} você conta com todos os benefícios do Marquei e ainda pode adicionar até {plan.persons} profissionais na sua clínica.</p>
                    {plan.benefits && plan.benefits.join(', ')}
                </>
            );
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '93.75rem' }}>
            <Card bordered={false} style={currentCardStyle}>
                <div style={cardColumStyle}>
                    <div style={titleSectionStyle}>
                        <div style={currentIndicatorStyle}>
                            {isCurrent && <CheckOutlined style={{ color: 'white' }} />}
                        </div>
                        <div style={titleStyle}>{plan.plan}</div>
                    </div>
                    <div style={benefitsStyle}>
                        {renderBenefitsText()}
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
    const { authData } = useAuth(); 
    const companyID = authData.companyID
    const orderPlans = (a, b) => {
        const order = { 'Plus': 1, 'Pro': 2, 'Premium': 3, 'Plano Teste': 4 };
        return (order[a.plan] || 5) - (order[b.plan] || 5);
    };

    useEffect(() => {
        const fetchPlans = async () => {
            if (companyID && authData.authToken) {
                setLoading(true);
                try {
                    // Fetch the company's current plan
                    const companyResponse = await api.get(`/companies/${companyID}`, {
                        'Authorization': `Bearer ${authData.authToken}`
                    });
                    setCurrentPlanId(companyResponse.data.service_id);

                    // Fetch all plans
                    const plansResponse = await api.get('/services', {
                        headers: { 'Authorization': `Bearer ${authData.authToken}` }
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
    }, [companyID, authData.authToken]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '20px' }}>
            {loading ? (
                <Spin size="large" />
            ) : (
                plans
                    .filter(plan => plan.plan !== 'Plano Teste' || plan.id === currentPlanId)
                    .sort(orderPlans)
                    .map((plan) => (
                        <PlanCard key={plan.id} plan={plan} isCurrent={plan.id === currentPlanId} />
                    ))
            )}
        </div>
    );
}

export default MyPlan;

import React, { useEffect, useState } from 'react';
import styles from './SelerCards.module.scss';
import { useNavigate } from 'react-router-dom';
import api from '../../components/api/api';

const PlanCard = ({ userId }) => {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState({ holder: '', number: '', expMonth: '', expYear: '', securityCode: '' });
  const [plans, setPlans] = useState([]);

  const sortAndFilterPlans = (plans) => {
    // Primeiro, filtra os planos para incluir apenas Plus, Pro ou Premium
    const filteredPlans = plans.filter(plan => ['Plus', 'Pro', 'Premium'].includes(plan.plan));

    // Depois, classifica os planos filtrados
    return filteredPlans.sort((a, b) => {
      if (a.plan === 'Plus') return -1;  // Plus sempre em primeiro
      if (b.plan === 'Plus') return 1;
      
      // Se Plus não estiver envolvido, verifique se é Pro ou Premium
      if (a.plan === 'Pro' && b.plan !== 'Plus') return -1;  // Pro vem depois de Plus, mas antes de qualquer outro
      if (b.plan === 'Pro' && a.plan !== 'Plus') return 1;
      
      if (a.plan === 'Premium' && !['Plus', 'Pro'].includes(b.plan)) return -1;  // Premium vem depois de Plus e Pro, mas antes de outros
      if (b.plan === 'Premium' && !['Plus', 'Pro'].includes(a.plan)) return 1;
  
      return 0;  // Se nenhuma das condições especiais for atendida, mantenha a ordem original
    });
  };

  const sortPlans = (plans) => {
    return plans.sort((a, b) => {
    
    });
  };
  

  const fetchPlans = async () => {
    try {
      const response = await api.get('/services');
      const sortedAndFilteredPlans = sortAndFilterPlans(response.data);
      setPlans(sortedAndFilteredPlans);
    } catch (error) {
      console.error("Erro ao buscar os planos:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleInputChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const redirectToCheckout = (servicePlan, servicePrice, serviceId) => {
    navigate('/checkout', { state: { servicePlan, servicePrice, serviceId } });
  };

  return (
    <div>
      <div className={styles.planos}>
        {plans.map((service, index) => (
          <div key={index} className={`${styles.planCard} ${service.mostSold ? styles.mostSold : ''}`}>
            {service.mostSold && <div className={styles.mostSoldLabel}>MAIS VENDIDO!</div>}
            <h2>{service.plan}</h2>
            <div className={styles.price}>
              <span className={styles.originalPrice}>R${service.originalPrice}</span>
              R${service.price} <span className={styles.perMonth}>por mês</span>
            </div>
            <div className={styles.duration}>
              Por {service.persons} profissional(is) da saúde, durante {service.duration} meses.
            </div>
            <button
              className={styles.trialButton}
              onClick={() => redirectToCheckout(service.plan, service.price, service.id)}
            >
              Contratar Agora!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanCard;

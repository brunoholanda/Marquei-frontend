import React, { useEffect, useState } from 'react';
import styles from './SelerCards.module.scss';
import { useNavigate } from 'react-router-dom';
import api from '../../components/api/api';

const PlanCard = ({ maxProfessionals }) => {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState({ holder: '', number: '', expMonth: '', expYear: '', securityCode: '' });
  const [plans, setPlans] = useState([]);

  const sortAndFilterPlans = (plans) => {
    // Filtra os planos para excluir o plano "Teste" e depois com base em maxProfessionals
    let filteredPlans = plans.filter(plan => plan.plan !== 'Plano Teste');
  
    if (maxProfessionals === 1) {
      // Se maxProfessionals for 1, inclua apenas Pro e Premium (excluindo Teste)
      filteredPlans = filteredPlans.filter(plan => ['Pro', 'Premium'].includes(plan.plan));
    } else if (maxProfessionals === 5) {
      // Se maxProfessionals for 5, inclua apenas Premium (excluindo Teste)
      filteredPlans = filteredPlans.filter(plan => plan.plan === 'Premium');
    } // Não é necessário um else para outros valores, pois já filtramos o plano "Teste"
  
    // Classifica os planos filtrados
    return filteredPlans.sort((a, b) => {
      if (a.plan === 'Plus') return -1;  // Plus sempre em primeiro
      if (b.plan === 'Plus') return 1;
      
      // Se Plus não estiver envolvido, verifique se é Pro ou Premium
      if (a.plan === 'Pro' && b.plan !== 'Plus') return -1;  // Pro vem depois de Plus, mas antes de Premium
      if (b.plan === 'Pro' && a.plan !== 'Plus') return 1;
      
      if (a.plan === 'Premium' && !['Plus', 'Pro'].includes(b.plan)) return -1;  // Premium vem depois de Plus e Pro
      if (b.plan === 'Premium' && !['Plus', 'Pro'].includes(a.plan)) return 1;
  
      return 0;  // Se nenhuma das condições especiais for atendida, mantenha a ordem original
    });
  };
  


  const fetchPlans = async () => {
    try {
      const response = await api.get('/services');
      // Passa maxProfessionals para sortAndFilterPlans
      const sortedAndFilteredPlans = sortAndFilterPlans(response.data, maxProfessionals);
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

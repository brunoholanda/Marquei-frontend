import React, { memo, useEffect, useState } from 'react';
import styles from './SelerCards.module.scss';
import api from '../../components/api/api';
import AuthModal from 'components/Modals/AuthModal';

const PlanCard = memo(({ maxProfessionals, maxEnderecosPermitidos }) => {
  const [plans, setPlans] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedService, setSelectedService] = useState({ servicePlan: '', servicePrice: 0, serviceId: '' });

  const handleLoginSuccess = () => {
  };

  const handleServiceSelect = (service) => {
    setSelectedService({
      servicePlan: service.plan,
      servicePrice: service.price,
      serviceId: service.id,
      service_link: service.preapproval_plan_id,
    });
    setShowAuthModal(true);
  };

  const sortAndFilterPlans = (plans) => {
    let filteredPlans = plans.filter(plan => plan.plan !== 'Plano Teste');

    if (maxProfessionals === 1) {
      filteredPlans = filteredPlans.filter(plan => ['Pro', 'Premium'].includes(plan.plan));
    } else if (maxProfessionals === 5) {
      filteredPlans = filteredPlans.filter(plan => plan.plan === 'Premium');
    } // Não é necessário um else para outros valores, pois já filtramos o plano "Teste"

    if (maxEnderecosPermitidos === 1) {
      // Permite Plus, Pro, e Premium
      filteredPlans = filteredPlans.filter(plan => ['Plus', 'Pro', 'Premium'].includes(plan.plan));
    } else if (maxEnderecosPermitidos === 2) {
      // Permite Pro e Premium
      filteredPlans = filteredPlans.filter(plan => ['Pro', 'Premium'].includes(plan.plan));
    } else if (maxEnderecosPermitidos === 3) {
      // Permite apenas Premium
      filteredPlans = filteredPlans.filter(plan => plan.plan === 'Premium');
    }
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
      const sortedAndFilteredPlans = sortAndFilterPlans(response.data, maxProfessionals, maxEnderecosPermitidos);
      setPlans(sortedAndFilteredPlans);
    } catch (error) {
      console.error("Erro ao buscar os planos:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

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
            <button onClick={() => handleServiceSelect(service)}>Contratar Agora</button>
            <AuthModal
              isVisible={showAuthModal}
              onClose={() => setShowAuthModal(false)}
              onLoginSuccess={handleLoginSuccess}
              selectedService={selectedService} // Pass the selected service details to the AuthModal
            />
          </div>
        ))}
      </div>
    </div>
  );
});

export default PlanCard;

import React, { useEffect, useState } from 'react';
import styles from './SelerCards.module.scss';
import { useNavigate } from 'react-router-dom';
import api from '../../components/api/api';

const PlanCard = ({ userId }) => {
  const navigate = useNavigate(); // useNavigate em vez de useHistory
  const [cardData, setCardData] = useState({ holder: '', number: '', expMonth: '', expYear: '', securityCode: '' });
  const [plans, setPlans] = useState([]); // Estado para armazenar os planos


  const fetchPlans = async () => {
    try {
      // Atualize a URL conforme necessário para corresponder ao seu endpoint do backend
      const response = await api.get('/services');
      setPlans(response.data); // Atualiza o estado com os planos recebidos
    } catch (error) {
      console.error("Erro ao buscar os planos:", error);
    }
  };

  // Use o hook useEffect para buscar os dados quando o componente é montado
  useEffect(() => {
    fetchPlans();
  }, []); // Array vazio para executar apenas uma vez na montagem do componente


  const handleInputChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const redirectToCheckout = (servicePlan, servicePrice) => {
    navigate('/checkout', { state: { servicePlan, servicePrice } }); // Uso de navigate para redirecionar
  };

  return (
    <div>
      <div className={styles.cards}>
        {plans.map((service, index) => (
          <div key={index} className={`${styles.serviceCard} ${service.mostSold ? styles.mostSold : ''}`}>
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
              onClick={() => redirectToCheckout(service.service, service.price)}
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

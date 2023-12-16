import React, { useState } from 'react';
import styles from './SelerCards.module.scss';
import api from '../api/api';

const PlanCard = ({ userId }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const plans = [
    { title: "Plus", price: "69.99", originalPrice: "119", quantity: "1", duration: "1", mostSold: true },
    { title: "Pro", price: "99.99", originalPrice: "159", quantity: "5", duration: "1" },
    { title: "Premium", price: "189.99", originalPrice: "299", quantity: "10", duration: "1" }
  ];

  const handlePayment = async (price) => {
    setIsProcessing(true);

    try {
      const response = await api.post('/payment', {
        userId,
        valor: price,
      });
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error('Erro ao iniciar o pagamento:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.cards}>
      {plans.map((plan, index) => (
        <div key={index} className={`${styles.planCard} ${plan.mostSold ? styles.mostSold : ''}`}>
          {plan.mostSold && <div className={styles.mostSoldLabel}>MAIS VENDIDO!</div>}
          <h2>{plan.title}</h2>
          <div className={styles.price}>
            <span className={styles.originalPrice}>R${plan.originalPrice}</span>
            R${plan.price} <span className={styles.perMonth}>por mês</span>
          </div>
          <div className={styles.duration}>
            Por {plan.quantity} profissional(is) da saúde, durante {plan.duration} ano.
          </div>
          <button 
            className={styles.trialButton} 
            onClick={() => handlePayment(plan.price)}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processando...' : 'Contratar Agora!'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PlanCard;

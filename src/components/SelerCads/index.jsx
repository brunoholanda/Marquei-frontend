import React, { useState } from 'react';
import styles from './SelerCards.module.scss';
import { useNavigate } from 'react-router-dom';

const PlanCard = ({ userId }) => {
  const navigate = useNavigate(); // useNavigate em vez de useHistory
  const [cardData, setCardData] = useState({ holder: '', number: '', expMonth: '', expYear: '', securityCode: '' });
  const plans = [
    { title: "Plus", price: "69.99", originalPrice: "119", quantity: "1", duration: "1", mostSold: true },
    { title: "Pro", price: "99.99", originalPrice: "159", quantity: "5", duration: "1" },
    { title: "Premium", price: "189.99", originalPrice: "299", quantity: "10", duration: "1" }
  ];

  const handleInputChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const redirectToCheckout = (planPrice) => {
    navigate('/checkout', { state: { planPrice } }); // Uso de navigate para redirecionar
  };

  return (
    <div>
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
              onClick={() => redirectToCheckout(plan.price)}
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

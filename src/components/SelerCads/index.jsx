import React, { useState } from 'react';
import axios from 'axios';
import styles from './SelerCards.module.scss';
import api from '../api/api';

const PlanCard = ({ title, price, originalPrice, quantity, duration, mostSold, userId }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Substitua com a URL do seu backend e os dados necessários
      const response = await api.post('/start-payment', {
        userId,
        valor: price, // ou outro valor conforme sua lógica de negócio
        // Adicione quaisquer outros dados necessários para o pagamento
      });

      // Redirecionar para a URL de pagamento do PagSeguro
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error('Erro ao iniciar o pagamento:', error);
      // Trate os erros conforme necessário
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.planos}>
      <div className={`${styles.planCard} ${mostSold ? styles.mostSold : ''}`}>
        {mostSold && <div className={styles.mostSoldLabel}>MAIS VENDIDO!</div>}
        <h2>{title}</h2>
        <div className={styles.price}>
          <span className={styles.originalPrice}>R${originalPrice}</span>
          R${price} <span className={styles.perMonth}>por mês</span>
        </div>
        <div className={styles.duration}>
          Por {quantity} profissional(is) da saúde, durante {duration} ano.
        </div>
        <button 
          className={styles.trialButton} 
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processando...' : 'Contratar Agora!'}
        </button>
      </div>
    </div>
  );
};

export default PlanCard;

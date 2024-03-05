import React from 'react';
import wp from '../../public/icons/wp-page.png'
import './FloatingButton.css';

const FloatingWhatsAppButton = () => {
  return (
    <div className="floating-button">
      <a href="https://api.whatsapp.com/send?phone=551151946100" target="_blank" rel="noreferrer">
        <img src={wp} alt="WhatsApp" />
      </a>
    </div>
  );
};

export default FloatingWhatsAppButton;

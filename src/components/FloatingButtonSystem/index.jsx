// FloatingButton.js
import React, { useState } from 'react';
import chatIcon from '../../public/chat-icon.png';
import Chatbot from 'components/Chatboot';
import { Button } from './Styles';


const FloatingSystemButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatbotClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <Button onClick={handleChatbotClick} title='Precisa de algo?'>
        <img src={chatIcon} alt="icone de chat" />
      </Button>
      {isChatOpen && <Chatbot onClose={handleChatbotClick} />}
    </>
  );
};

export default FloatingSystemButton;

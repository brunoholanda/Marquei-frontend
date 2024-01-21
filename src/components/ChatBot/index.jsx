import React, { useState } from 'react';
import axios from 'axios';

const ChatComponent = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const sendMessage = async () => {
        try {
            const res = await axios.post('http://localhost:3333/chatbot', { message });
            setResponse(res.data.reply);
        } catch (error) {
            console.error('Erro ao enviar mensagem', error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)} 
            />
            <button onClick={sendMessage}>Enviar</button>
            <div>
                <p>Resposta: {response}</p>
            </div>
        </div>
    );
};

export default ChatComponent;

import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import * as S from './Styles';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Oi! Como posso ajudar você?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const systemMessageContent = `
  Você é um chatbot que auxilia os usuários a navegar e utilizar o sistema Marquei de agendamentos online. Aqui estão as descrições de cada funcionalidade do menu:
  
  1. **Agendamentos**: 
     - Verifique o calendário das consultas agendadas pelos clientes ou manualmente pela clínica.
     - Selecione o profissional para ver os horários agendados.
     - Configure a visualização do calendário para diferentes intervalos de dias e horários.
     - Clique sobre um agendamento para confirmar, reagendar ou enviar uma mensagem para o WhatsApp do paciente.
     - Acesse informações do cliente pelo calendário.
     - Inclua novos agendamentos clicando sobre o quadrado de tempo/dia no calendário. Se o cliente já possuir cadastro, os dados serão auto-completados.
  
  2. **Dashboards**: 
     - Confira uma visão analítica das consultas confirmadas, canceladas e a confirmar.
     - Mude o intervalo do filtro e verifique a quantidade de consultas particulares e por planos de saúde.
  
  3. **NpsSystem**: 
     - Confira a nota que os pacientes estão dando para a clínica.
     - Para clientes Premium, a pesquisa é enviada automaticamente para o e-mail cadastrado.
     - Gere o link da pesquisa e envie para os pacientes manualmente, se necessário.
     - **NPS** (Net Promoter Score) é uma métrica que mede a satisfação e a lealdade dos clientes em relação à clínica.
  
  4. **Histórico**: 
     - Verifique todo o histórico de consultas agendadas na clínica.
     - Efetue pesquisas pelo e-mail do paciente.
  
  5. **Clientes**: 
     - Verifique ou atualize todos os dados cadastrais dos clientes.
     - Emita atestados e declarações.
     - Alimente o prontuário médico do paciente.
  
  6. **Configurações**: 
     - Altere os dados da clínica.
     - Adicione profissionais e configure a agenda desses profissionais.
     - Adicione mais de um endereço de atendimento para os profissionais cadastrados.
     - Torne o perfil do profissional da saúde público para ser encontrado em pesquisas no Google ou dentro da plataforma.
  
  7. **Estoque**: 
     - Gerencie o inventário de suprimentos e medicamentos da clínica.
  
  8. **Contabilidade**: 
     - Acompanhe as finanças, incluindo receitas, despesas e relatórios contábeis.
  
  9. **Plano Alimentar**: 
     - Crie e gerencie planos alimentares personalizados para os pacientes.
  
  10. **Sair**: 
     - Encerre a sessão atual.
  
  11. **Administrador**: 
     - Acesse as funcionalidades administrativas avançadas do sistema.
  
  Por favor, faça perguntas relacionadas ao sistema Marquei e seus processos internos.
  `;

  useEffect(() => {
    if (!localStorage.getItem('systemMessage')) {
      localStorage.setItem('systemMessage', systemMessageContent);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages(newMessages);
      setInput('');

      const relevance = await checkRelevance(input);
      if (relevance === 'Sim') {
        const response = await getBotResponse(input);
        setMessages([...newMessages, { sender: 'bot', text: response }]);
      } else {
        setMessages([...newMessages, { sender: 'bot', text: 'Desculpe, só posso responder perguntas sobre o sistema Marquei de agendamentos online.' }]);
      }
    }
  };

  const checkRelevance = async (userInput) => {
    const API_KEY = import.meta.env.VITE_APP_OPENAI_API_KEY;
    const checkRelevanceMessage = {
      role: 'system',
      content: `
        Você é um chatbot que deve verificar se a pergunta é relevante para o sistema Marquei de agendamentos online. 
        Responda apenas "Sim" se a pergunta for relevante e "Não" se a pergunta não for relevante.
      `
    };

    try {
      const relevanceResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            checkRelevanceMessage,
            { role: 'user', content: userInput }
          ],
          max_tokens: 15
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          }
        }
      );

      return relevanceResponse.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error checking relevance:', error);
      return 'Não';
    }
  };

  const getBotResponse = async (userInput) => {
    const API_KEY = import.meta.env.VITE_APP_OPENAI_API_KEY;
    
    const systemMessage = {
      role: 'system',
      content: localStorage.getItem('systemMessage')
    };

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            systemMessage,
            { role: 'user', content: userInput }
          ],
          max_tokens: 200
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          }
        }
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error fetching the bot response:', error);
      return 'Desculpe, houve um problema ao obter a resposta. Tente novamente mais tarde.';
    }
  };

  return (
    <S.ChatContainer>
      <S.ChatHeader>
        Marquei IA
        <button onClick={onClose} style={{ float: 'right', color: 'white', background: 'none', border: 'none' }}>X</button>
      </S.ChatHeader>
      <S.ChatMessages>
        {messages.map((message, index) => (
          <div key={index} style={{ textAlign: message.sender === 'bot' ? 'left' : 'right' }}>
            {message.sender === 'bot' ? (
              <div dangerouslySetInnerHTML={{ __html: message.text }} />
            ) : (
              <p>{message.text}</p>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </S.ChatMessages>
      <S.ChatInput
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        placeholder="Digite sua mensagem..."
      />
    </S.ChatContainer>
  );
};

export default Chatbot;

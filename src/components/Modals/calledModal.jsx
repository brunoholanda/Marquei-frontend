import React, { useState } from 'react';
import { Modal, Select, Input, message, Button } from 'antd';
import api from '../api/api';

const { Option } = Select;

const CalledModal = ({ isVisible, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputText, setInputText] = useState('');
  const [ticketNumber, setTicketNumber] = useState(null);



  const handleOpenCalled = async () => {
    try {
      const companyId = localStorage.getItem('companyID');
      const response = await api.post('/chamados', {
        type: selectedOption,
        description: inputText,
        companyId
      });

      const data = response.data;
      setTicketNumber(data.ticket_number);
      setSelectedOption(null);
      setInputText('');

      onClose();
    } catch (error) {
      message.error(error.response?.data?.message || 'Preecha todos os campos!');
    }
  };


  return (
    <>
      <Modal
        title="Criar Chamado 😅"
        visible={isVisible}
        onCancel={() => {
          setSelectedOption(null);
          setInputText('');
          setTicketNumber(null); 
          onClose();
        }}
        footer={null}

      >
        <Select
          placeholder="Selecione uma opção"
          style={{ width: '100%' }}
          onChange={(value) => setSelectedOption(value)}
          value={selectedOption} // Garante que o Select reflita o estado atual

        >
          <Option value="problem">Relatar um problema!</Option>
          <Option value="suggestion">Sugerir melhoria!</Option>
        </Select>
        {selectedOption && (
          <Input.TextArea
            rows={4}
            placeholder="Descreva com detalhes"
            style={{ marginTop: '16px' }}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        )}

        <Button
          style={{ textAlign: 'center', width: '100%', marginTop: '1rem' }}
          type="primary" onClick={handleOpenCalled}>
          Abrir Chamado
        </Button>
      </Modal>
      {ticketNumber && (
        <Modal
          title="Chamado Criado"
          visible={!!ticketNumber}
          footer={null}
          onCancel={() => setTicketNumber(null)}
        >
          <p>Chamado número {ticketNumber} criado com sucesso e será atendido em até 24 horas úteis.</p>
        </Modal>
      )}
    </>
  );
};

export default CalledModal;

// ScheduleLinkModal.js
import React from 'react';
import { Modal, Button, Input, message } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { useAuth } from 'context/AuthContext';

const ScheduleLinkModal = ({ isLinkModalVisible, onLinkModalClose }) => {
  const { authData } = useAuth();
  const companyID = authData.companyID;
    const generateScheduleLink = () => {
        return `${window.location.origin}/#/agendar/${companyID}`;
      };
      

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generateScheduleLink()).then(() => {
      message.success('Link copiado para a área de transferência!');
      onLinkModalClose(); 
    }).catch(err => {
      message.error('Falha ao copiar o link.');
      console.error('Erro ao copiar o link:', err);
    });
  };

  return (
    <Modal
      title="Link do Agendamento Para Clientes !"
      open={isLinkModalVisible}
      onOk={handleCopyLink}
      onCancel={onLinkModalClose}
      footer={[
        <Button key="copy" type="primary" onClick={handleCopyLink}>
          Copiar Link
        </Button>,
        <Button key="close" onClick={onLinkModalClose}>
          Fechar
        </Button>
      ]}
    >
      <p>O link a seguir pode ser compartilhado com seus clientes após a configuração da agenda.</p>
      <p><LinkOutlined /> Copie e compartilhe este link para permitir o agendamento:</p>
      <Input value={generateScheduleLink()} readOnly />
    </Modal>
  );
};

export default ScheduleLinkModal;

// ScheduleResearchModal.js
import React from 'react';
import { Modal, Button, Input, message } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { useAuth } from 'context/AuthContext';

const ClientResearchModal = ({ isResearchModalVisible, onResearchModalClose }) => {
  const { authData } = useAuth();
  const companyID = authData.companyID;
    const generateScheduleLink = () => {
        return `${window.location.origin}/#/pesquisa-satisfacao/${companyID}`;
      };
      

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generateScheduleLink()).then(() => {
      message.success('Link copiado para a área de transferência!');
      onResearchModalClose(); 
    }).catch(err => {
      message.error('Falha ao copiar o link.');
      console.error('Erro ao copiar o link:', err);
    });
  };

  return (
    <Modal
      title="Link da pesquisa para seus clientes !"
      open={isResearchModalVisible}
      onOk={handleCopyLink}
      onCancel={onResearchModalClose}
      footer={[
        <Button key="copy" type="primary" onClick={handleCopyLink}>
          Copiar Link
        </Button>,
        <Button key="close" onClick={onResearchModalClose}>
          Fechar
        </Button>
      ]}
    >
      <p>O link a seguir pode ser compartilhado com seus clientes para que eles realizem uma pesquisa de satisfação na escala NPS.</p>
      <p><LinkOutlined /> Copie e compartilhe este link com seus clientes:</p>
      <p style={{color: 'red'}}>Caso queira o envio automático do link, contrate o Plano Premium.</p>
      <Input value={generateScheduleLink()} readOnly />
    </Modal>
  );
};

export default ClientResearchModal;

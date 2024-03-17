import React, { useEffect, useState } from 'react';
import { Modal, Select, Input, message, Button, Upload, Tooltip } from 'antd';
import api from '../api/api';
import { useAuth } from 'context/AuthContext';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const CalledModal = ({ isVisible, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputText, setInputText] = useState('');
  const [ticketNumber, setTicketNumber] = useState(null);
  const { authData } = useAuth();
  const companyID = authData.companyID;
  const [logoUrl, setLogoUrl] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    if (isVisible) {
      setSelectedOption(null);
      setInputText('');
      setLogoUrl(null);
      setLogoFile(null);
    }
  }, [isVisible]);

  function resizeImage(file, maxWidth, maxHeight, quality, callback) {
    const reader = new FileReader();
    reader.onload = event => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
  
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
  
        canvas.toBlob(blob => {
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          callback(resizedFile);
        }, file.type, quality);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
  
  
  const handleOpenCalled = async () => {
    const formData = new FormData();
    formData.append('type', selectedOption);
    formData.append('description', inputText);
    formData.append('companyId', companyID);
  
    if (logoFile) {
      formData.append('image', logoFile);
    }
    
    
  
    try {
      const response = await api.post('/chamados', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
  
      const data = response.data;
      setTicketNumber(data.ticket_number);
      setSelectedOption(null);
      setInputText('');
  
      onClose();
    } catch (error) {
      message.error(error.response?.data?.message || 'Preencha todos os campos!');
    }
  };
  

  const handleFileChange = info => {
    if (info.fileList.length === 0) {
      setLogoFile(null);
      return;
    }
  
    const file = info.fileList[0].originFileObj;
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      message.error("Por favor, selecione um arquivo PNG, JPG ou JPEG.");
      return;
    }
  
    resizeImage(file, 1000, 1000, 1, resizedFile => {
      const previewUrl = URL.createObjectURL(resizedFile);
      setLogoUrl(previewUrl);
      setLogoFile(resizedFile);
    });
  };
  

  return (
    <>
      <Modal
        title="Criar Chamado 😅"
        open={isVisible}
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
          value={selectedOption}
        >
          <Option value="problem">Relatar um problema!</Option>
          <Option value="suggestion">Sugerir melhoria!</Option>
        </Select>
        {selectedOption && (
          <>
            <Input.TextArea
              rows={4}
              placeholder="Descreva com detalhes"
              style={{ marginTop: '16px' }}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
              <h3>Evidência</h3>
              {logoUrl &&

                <img src={logoUrl} style={{ width: '45px', marginBottom: '10px' }} alt="Logo da Empresa" />}
              <Tooltip title="A imagem deve estar em PNG e ter até 500kb">
                <Upload
                  beforeUpload={() => false}
                  onChange={handleFileChange}
                  fileList={logoFile ? [logoFile] : []}
                >
                  <Button icon={<UploadOutlined />}>Selecionar Logo</Button>
                </Upload>
              </Tooltip>
            </div>
          </>
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
          open={!!ticketNumber}
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

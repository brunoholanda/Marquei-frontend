import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Spin, Tooltip, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { BASE_URL } from 'config';

import api from '../api/api';
import axios from 'axios';

const CompanyDataModal = ({ isVisible, onClose }) => {
    const [companyData, setCompanyData] = useState({});
    const [editedData, setEditedData] = useState({});
    const [logoFile, setLogoFile] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');
    const [referencia, setReferencia] = useState('');
    const [enderecoViaCep, setEnderecoViaCep] = useState({});
    const [enderecoEmpresa, setEnderecoEmpresa] = useState('');

    const fetchEnderecoByCep = async (cep) => {
        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                setEnderecoViaCep(response.data);
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            }
        }
    };

    useEffect(() => {
        fetchEnderecoByCep(cep);
    }, [cep]);

    const enderecoCompleto = `${enderecoViaCep.logradouro ?? ''}, ${numero ?? ''}, ${referencia ?? ''}, ${enderecoViaCep.bairro ?? ''} - ${enderecoViaCep.localidade ?? ''} / ${enderecoViaCep.uf ?? ''} - ${cep}`;


    useEffect(() => {
        const fetchCompanyData = async () => {
            const storedCompanyID = localStorage.getItem('companyID');
            const token = localStorage.getItem('authToken');

            if (storedCompanyID && token) {
                setLoading(true);
                try {
                    const response = await api.get(`/companies/${storedCompanyID}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });

                    setCompanyData(response.data);
                    setEnderecoEmpresa(response.data.endereco);

                } catch (error) {
                    if (error.response) {
                        console.error('API response error:', error.response);
                    } else {
                        console.error('Error fetching company data:', error);
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                console.error('Company ID or auth token not found in local storage');
            }
        };

        if (isVisible) {
            fetchCompanyData();
        }
    }, [isVisible]);

    useEffect(() => {
        setEditedData(companyData);
        if (companyData.logo_path) {
            setLogoUrl(`${BASE_URL}/${companyData.logo_path}`);
        }
    }, [companyData]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = info => {
        if (info.fileList.length === 0) {
            setLogoFile(null);
            return;
        }

        const file = info.fileList[0];
        if (file.type !== 'image/png' || file.size > 500000) {
            message.error("Por favor, selecione um arquivo PNG de até 500kb.");
            return;
        }
        if (file) {
            const previewUrl = URL.createObjectURL(file.originFileObj);
            setLogoUrl(previewUrl);
        }

        setLogoFile(file);
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        try {
            // Atualiza o estado editedData com o endereço completo
            const updatedData = {
                ...editedData,
                endereco: enderecoCompleto // Aqui você atribui o endereço completo ao campo 'endereco'
            };

            const formData = new FormData();
            formData.append('nome', updatedData.nome);
            formData.append('telefone', updatedData.telefone);
            formData.append('instagram', updatedData.instagram);
            formData.append('endereco', updatedData.endereco); // Agora enviando o endereço completo

            if (logoFile) {
                formData.append('logo', logoFile.originFileObj);
            }

            const response = await api.put(`/companies/${companyData.company_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setCompanyData(response.data.company);
            onClose();
        } catch (error) {
            console.error('Erro ao atualizar dados da empresa:', error);
        } finally {
            setLoading(false);
        }
    };




    return (
        <Modal
            title="Dados da Empresa"
            visible={isVisible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>Cancelar</Button>,
                <Button key="submit" type="primary" onClick={handleSaveChanges}>Salvar</Button>
            ]}
        >
            <p>Essas informações estão presentes nos atestados e declarações.</p>
            {loading ? <Spin /> : (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <h3>Logo:</h3>
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
                    <Input style={{ marginBottom: '15px' }} name="nome" value={editedData.nome} onChange={handleInputChange} placeholder="Nome" />
                    <Input style={{ marginBottom: '15px' }} name="telefone" value={editedData.telefone} onChange={handleInputChange} placeholder="WhatsApp" />
                    <Input style={{ marginBottom: '15px' }} name="instagram" value={editedData.instagram} onChange={handleInputChange} placeholder="Instagram" />
                    <label>Digite o CEP para atualizar o endereço:</label>
                    <Input style={{ marginBottom: '15px' }} name="cep" value={cep} onChange={(e) => setCep(e.target.value)} placeholder="CEP" />
                    <Input style={{ marginBottom: '15px' }} name="numero" value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Número" />
                    <Input style={{ marginBottom: '15px' }} name="referencia" value={referencia} onChange={(e) => setReferencia(e.target.value)} placeholder="Referência" />
                    {cep &&
                        <>
                            <label>Novo Endereço:</label>
                            <Input style={{ marginBottom: '15px' }} name="endereco" value={enderecoCompleto} onChange={handleInputChange} placeholder="Endereço Completo" />
                        </>
                    }
                    <label>Endereço Atual:</label>
                    <Input style={{ marginBottom: '15px' }} name="enderecoEmpresa" value={enderecoEmpresa} onChange={handleInputChange} placeholder="Endereço da Empresa" disabled />

                    <Input
                        name="cnpj"
                        value={editedData.cnpj}
                        onChange={handleInputChange}
                        placeholder="CNPJ"
                        disabled={true}
                    />

                    <h2>Plano</h2>
                </>
            )}
        </Modal>
    );
};

export default CompanyDataModal;

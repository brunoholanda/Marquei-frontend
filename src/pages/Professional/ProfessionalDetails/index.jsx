import React, { useState, useEffect, useRef } from 'react';
import { message, Button, Tabs, Input, Select } from 'antd';
import api from 'components/api/api';
import { useParams, useNavigate } from 'react-router-dom';
import ReactSignatureCanvas from 'react-signature-canvas';
import '../../Appointments/Appointments.css';
import { UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';

const { TabPane } = Tabs;

const DoctorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [professionalDetails, setProfessionalDetails] = useState(null);
    const [editedDetails, setEditedDetails] = useState({});
    const [signatureData, setSignatureData] = useState("");
    const sigCanvas = useRef({});
    const [todosPlanos, setTodosPlanos] = useState([]);
    const [planosSelecionados, setPlanosSelecionados] = useState([]);
    const [planosDeSaude, setPlanosDeSaude] = useState([]);
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [referencia, setReferencia] = useState("");
    const [cidade, setCidade] = useState("");
    const [estadoSelecionado, setEstadoSelecionado] = useState(null);
    const [form] = useForm();


    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await api.get(`/professionals/${id}`);
                console.log("Dados recebidos:", response.data);
                setProfessionalDetails(response.data);
                setEditedDetails(response.data);
                setCep(response.data.cep || ""); // Adiciona esta linha para definir o CEP inicial

            } catch (error) {
                console.error("Erro ao buscar detalhes", error);
                message.error("Erro ao buscar detalhes");
            }
        };

        fetchDetails();
    }, [id]);


    useEffect(() => {
        const fetchDetailsAndPlanos = async () => {
            try {
                const responseProfessional = await api.get(`/professionals/${id}`);
                const professionalData = responseProfessional.data;
                setProfessionalDetails(professionalData);
                setEditedDetails(professionalData);

                const responsePlanos = await api.get('/planos_medicos');
                if (responsePlanos.data && responsePlanos.data.length > 0) {
                    const planosOrdenados = responsePlanos.data.sort((a, b) => {
                        if (a.nome === 'Particular') return -1;
                        if (b.nome === 'Particular') return 1;
                        return 0;
                    });
                    setPlanosDeSaude(planosOrdenados);
                }
                setTodosPlanos(responsePlanos.data);

                // Carregar os planos de saúde associados ao profissional
                const responseProfissionalPlanos = await api.get(`/professionals/${id}/planos`);
                const selectedPlanosIds = responseProfissionalPlanos.data.map(plano => plano.id);
                setPlanosSelecionados(selectedPlanosIds);
            } catch (error) {
                console.error("Erro ao buscar dados", error);
            }
        };

        fetchDetailsAndPlanos();
    }, [id]);


    const handleCEPChange = async (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setCep(value);

        if (value.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
                if (!response.ok) {
                    throw new Error(`Erro ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                if (!data.erro) {
                    setEndereco(data.logradouro || '');
                    setNumero(data.numero || '');
                    setReferencia(data.complemento || '');
                    setCidade(data.localidade || '');
                    setEstadoSelecionado(data.uf || '');
        
                    // Atualiza editedDetails com os novos valores
                    handleInputChange('endereco', data.logradouro || '');
                    handleInputChange('numero', data.numero || '');
                    handleInputChange('referencia', data.complemento || '');
                    handleInputChange('cidade', data.localidade || '');
                    handleInputChange('estado', data.uf || '');

                    form.setFieldsValue({
                        endereco: data.logradouro || '',
                        numero: data.numero || '',
                        referencia: data.complemento || '',
                        cidade: data.localidade || '',
                        estado: data.uf || ''
                    });
                } else {
                    console.error("CEP não encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
            }
        }
    };

    const handleSaveChanges = async () => {
        try {
            const payload = {
                ...editedDetails,
                planosSaude: planosSelecionados // Enviar IDs dos planos selecionados
            };

            const response = await api.put(`/professionals/${id}`, payload);

            if (response.status === 200) {
                message.success("Detalhes atualizados com sucesso!");
                setProfessionalDetails({ ...professionalDetails, ...payload });
            } else {
                console.error('Resposta de erro da API:', response);
                message.error("Erro ao atualizar detalhes: " + response.statusText);
            }
        } catch (error) {
            console.error("Erro ao atualizar detalhes", error);
            message.error("Erro ao atualizar detalhes: " + error.message);
        }
    };


    const handleInputChange = (key, value) => {
        setEditedDetails(prevDetails => ({
            ...prevDetails,
            [key]: value
        }));
    };


    const handleGoBack = () => {
        navigate(-1);
    }

    if (!professionalDetails) return <p>Carregando...</p>;

    const handleUpdateSignature = async (newSignatureBase64) => {
        try {
            const payload = {
                ...professionalDetails,
                assinatura: newSignatureBase64
            };

            console.log('Enviando assinatura:', payload);
            const response = await api.put(`/professionals/${id}`, payload);

            if (response.status === 200) {
                message.success("Assinatura atualizada com sucesso!");
                setProfessionalDetails({
                    ...professionalDetails,
                    assinatura: newSignatureBase64
                });
                clearSignature();
            } else {
                message.error("Não foi possível atualizar a assinatura.");
            }
        } catch (error) {
            console.error("Erro ao atualizar a assinatura", error);
            message.error("Erro ao atualizar a assinatura");
        }
    };

    const clearSignature = () => {
        if (sigCanvas.current) {
            sigCanvas.current.clear();
            setSignatureData("");
        }
    };

    const saveSignature = () => {
        if (sigCanvas.current) {
            const signatureWithPrefix = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
            const signatureBase64 = signatureWithPrefix.split(',')[1];
            setSignatureData(signatureBase64);
            handleUpdateSignature(signatureBase64);
        }
    };


    return (
        <div className='tabela'>
            <h1>Detalhes do Proffisional <UserOutlined /></h1>
            <Button onClick={handleGoBack}>Voltar</Button>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Dados Pessoais" key="1">
                    <p><b>Nome:</b> <Input value={editedDetails.nome || professionalDetails.nome} onChange={(e) => handleInputChange('nome', e.target.value)} /></p>
                    <p><b>Telefone:</b> <Input value={editedDetails.celular || professionalDetails.celular} onChange={(e) => handleInputChange('celular', e.target.value)} /></p>
                    <p><b>Nascimento:</b> <Input value={editedDetails.data_de_nascimento || professionalDetails.data_de_nascimento} onChange={e => handleInputChange('data_de_nascimento', e.target.value)} /></p>
                    <p><b>CPF:</b> <Input value={editedDetails.cpf || professionalDetails.cpf} onChange={e => handleInputChange('cpf', e.target.value)} /></p>
                    <Button onClick={handleSaveChanges}>Salvar</Button>
                </TabPane>
                <TabPane tab="Informacoes Proffisionais" key="2">
                    <p><b>Registro Profissional:</b> <Input value={editedDetails.registro_profissional || professionalDetails.registro_profissional} onChange={(e) => handleInputChange('registro_profissional', e.target.value)} /></p>
                    <p><b>Título:</b> <Input value={editedDetails.titulo || professionalDetails.titulo} onChange={(e) => handleInputChange('titulo', e.target.value)} /></p>
                    <p><b>Planos que atende:</b>
                        {todosPlanos && (
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Selecione os planos de saúde"
                                defaultValue={planosSelecionados}
                                onChange={(selected) => setPlanosSelecionados(selected)}
                            >
                                {todosPlanos.map(plano => (
                                    <Select.Option key={plano.id} value={plano.id}>{plano.nome}</Select.Option>
                                ))}
                            </Select>
                        )}
                    </p>
                    <Button onClick={handleSaveChanges}>Salvar</Button>
                </TabPane>
                <TabPane tab="Endereço" key="3">
                    <p>
                        <b>CEP:</b>
                        <Input
                            value={cep}
                            onChange={handleCEPChange}
                        />
                    </p>
                    <p>
                        <b>Rua:</b>
                        <Input
                            value={editedDetails.endereco || endereco}
                            onChange={(e) => handleInputChange('endereco', e.target.value)}
                        />
                    </p>
                    <p>
                        <b>Número:</b>
                        <Input
                            value={editedDetails.numero || numero}
                            onChange={(e) => handleInputChange('numero', e.target.value)}
                        />
                    </p>
                    <p>
                        <b>Referência:</b>
                        <Input
                            value={editedDetails.referencia || referencia}
                            onChange={(e) => handleInputChange('referencia', e.target.value)}
                        />
                    </p>
                    <p>
                        <b>Estado:</b>
                        <Input
                            value={editedDetails.estado || estadoSelecionado}
                            onChange={(e) => handleInputChange('estado', e.target.value)}
                        />
                    </p>
                    <p>
                        <b>Cidade:</b>
                        <Input
                            value={editedDetails.cidade || cidade}
                            onChange={(e) => handleInputChange('cidade', e.target.value)}
                        />
                    </p>
                    <Button onClick={handleSaveChanges}>Salvar</Button>
                </TabPane>

                <TabPane tab="Assinatura" key="4">
                    <p><b>Assinatura Atual:</b></p>
                    {professionalDetails.assinatura && (
                        <img src={`data:image/png;base64,${professionalDetails.assinatura}`} alt="Assinatura" />
                    )}
                    <p><b>Você pode assinar novamnete para atualizar:</b></p>

                    <div style={{ border: '1px solid black', width: 500, margin: '20px' }}>

                        <ReactSignatureCanvas
                            ref={sigCanvas}
                            canvasProps={{
                                width: 500,
                                height: 200,
                                className: 'signatureCanvas'
                            }}
                        />
                    </div>
                    <Button onClick={clearSignature}>Limpar</Button>
                    <Button onClick={saveSignature} style={{ marginLeft: '10px' }}>Salvar Assinatura</Button>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default DoctorDetails;

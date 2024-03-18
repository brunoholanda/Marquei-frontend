import React, { useState, useEffect, useRef } from 'react';
import { message, Button, Tabs, Input, Select, Modal, Upload, Tooltip, notification } from 'antd';
import api from 'components/api/api';
import { useParams, useNavigate } from 'react-router-dom';
import ReactSignatureCanvas from 'react-signature-canvas';
import '../../Appointments/Appointments.css';
import { ShareAltOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { Spin } from 'hamburger-react';
import { StyledPublicModalContato, StyledPublicPicture, StyledSubContainerPublic } from './Styles';
import { BASE_URL } from 'config';
import { useAuth } from 'context/AuthContext';
import ResetDoctorPasswordModal from 'components/Modals/resetDoctorPassword';

const DoctorDetails = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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
    const [bairro, setBairro] = useState("");
    const [estadoSelecionado, setEstadoSelecionado] = useState(null);
    const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
    const [professionalCredentials, setProfessionalCredentials] = useState({ matricula: '', senha: '' });
    const [professionalId, setProfessionalId] = useState(null);
    const [isPublicProfileModalVisible, setIsPublicProfileModalVisible] = useState(false);
    const [publicProfileDetails, setPublicProfileDetails] = useState({});
    const [perfilPictureUrl, setPerfilPictureUrl] = useState(null);
    const [perfilPictureFile, setPerfilPictureFile] = useState(null);
    const [isProfilePublished, setIsProfilePublished] = useState(false);
    const [publicProfileId, setPublicProfileId] = useState(null);
    const [isResetDoctorModalVisible, setIsResetDoctorModalVisible] = useState(false);
    const [emailSaved, setEmailSaved] = useState(false);

    const { authData } = useAuth();
    const companyID = authData.companyID;

    const [form] = useForm();


    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await api.get(`/professionals/${id}`);
                setProfessionalDetails(response.data);
                setEditedDetails(response.data);
                setCep(response.data.cep || "");
                
                if (response.data.email) {
                    setEmailSaved(true);
                }

            } catch (error) {
                console.error("Erro ao buscar detalhes", error);
                message.error("Erro ao buscar detalhes");
            }
        };

        fetchDetails();
    }, [id]);

    useEffect(() => {
        const checkIfProfilePublished = async () => {
            try {
                const response = await api.get(`/publicProfessionals/professional/${id}`);
                if (response.data) {
                    setIsProfilePublished(true);
                    setPublicProfileDetails(response.data);
                }
            } catch (error) {
                console.error("Erro ao verificar perfil público", error);
            }
        };

        if (id) {
            checkIfProfilePublished();
        }
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

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



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
                    setBairro(data.bairro || '');
                    setReferencia(data.complemento || '');
                    setCidade(data.localidade || '');

                    setEstadoSelecionado(data.uf || '');

                    // Atualiza editedDetails com os novos valores
                    handleInputChange('endereco', data.logradouro || '');
                    handleInputChange('numero', data.numero || '');
                    handleInputChange('bairro', data.bairro || '');
                    handleInputChange('referencia', data.complemento || '');
                    handleInputChange('cidade', data.localidade || '');
                    handleInputChange('estado', data.uf || '');

                    form.setFieldsValue({
                        endereco: data.logradouro || '',
                        numero: data.numero || '',
                        bairro: data.bairro || '',
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
                planosSaude: planosSelecionados
            };

            const response = await api.put(`/professionals/${id}`, payload);

            if (response.status === 200) {
                message.success("Detalhes atualizados com sucesso!");
                setProfessionalDetails({ ...professionalDetails, ...payload });
                if (editedDetails.email) {
                    setEmailSaved(true);
                }
            } else {
                console.error('Resposta de erro da API:', response);
                message.error("Erro ao atualizar detalhes: " + response.statusText);
            }
        } catch (error) {
            console.error("Erro ao atualizar detalhes", error);
            message.error("Erro ao atualizar detalhes: " + error.message);
        }
    };

    const handleInputChange = (key, value, field) => {
        setEditedDetails(prevDetails => ({
            ...prevDetails,
            [key]: value
        }));

        if (field === 'email' && professionalDetails.email && !editedDetails.email) {
            setEmailSaved(true);
        }
    };


    const handleGoBack = () => {
        navigate(-1);
    }

    if (!professionalDetails) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    const handleUpdateSignature = async (newSignatureBase64) => {
        try {
            const payload = {
                ...professionalDetails,
                assinatura: newSignatureBase64
            };

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

    const tabList = [
        {
            key: '1',
            tab: isMobile ? 'Detalhes' : 'Dados Pessoais',
            content: (
                <>
                    <p><b>Nome:</b> <Input value={editedDetails.nome || professionalDetails.nome} onChange={(e) => handleInputChange('nome', e.target.value)} /></p>
                    <p><b>Telefone:</b> <Input value={editedDetails.celular || professionalDetails.celular} onChange={(e) => handleInputChange('celular', e.target.value)} /></p>
                    <p><b>Nascimento:</b> <Input value={editedDetails.data_de_nascimento || professionalDetails.data_de_nascimento} onChange={e => handleInputChange('data_de_nascimento', e.target.value)} /></p>
                    <p><b>Email:</b> <Input value={editedDetails.email || professionalDetails.email} onChange={(e) => handleInputChange('email', e.target.value)} disabled={emailSaved} /></p>
                    <p><b>CPF:</b> <Input value={editedDetails.cpf || professionalDetails.cpf} onChange={e => handleInputChange('cpf', e.target.value)} disabled={true}/></p>
                    <Button onClick={handleSaveChanges} type='primary'>Salvar</Button>
                </>
            ),
        },
        {
            key: '2',
            tab: isMobile ? 'Profissional' : 'Informacoes Proffisionais',
            content: (
                <>
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
                    <Button onClick={handleSaveChanges} type='primary'>Salvar</Button>                </>
            ),
        },
        {
            key: '3',
            tab: isMobile ? 'End. Prof' : 'Endereço Profissional', // Nome da tab ajustado para mobile
            content: (
                <>
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
                    <p>
                        <b>Bairro:</b>
                        <Input
                            value={editedDetails.bairro || bairro}
                            onChange={(e) => handleInputChange('bairro', e.target.value)}
                        />
                    </p>
                    <Button onClick={handleSaveChanges} type='primary'>Salvar</Button>                </>
            ),
        },
        {
            key: '4',
            tab: isMobile ? 'Ass.' : 'Assinatura',
            content: (
                <>
                    <p><b>Assinatura Atual:</b></p>
                    {professionalDetails.assinatura && (
                        <img
                            src={`data:image/png;base64,${professionalDetails.assinatura}`}
                            alt="Assinatura"
                            style={{
                                maxWidth: '100%',
                                height: 'auto'
                            }}
                        />)}
                    <p><b>Você pode assinar novamnete para atualizar:</b></p>

                    <div style={{
                        border: '1px solid black',
                        width: isMobile ? '75vw' : '500px',
                        margin: isMobile ? '2px 0 15px 0' : '20px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <ReactSignatureCanvas
                            ref={sigCanvas}
                            canvasProps={{
                                width: isMobile ? window.innerWidth * 0.8 : 500, // 80% da largura da tela no mobile
                                height: isMobile ? window.innerWidth * 0.4 : 200, // 40% da largura da tela no mobile
                                className: 'signatureCanvas'
                            }}
                        />
                    </div>
                    <Button onClick={clearSignature}>Limpar</Button>
                    <Button onClick={saveSignature} style={{ marginLeft: '10px' }} type='primary'>Salvar Assinatura</Button>
                </>
            ),
        },
    ].filter(Boolean);

    const handleAuthModalClose = () => {
        setIsAuthModalVisible(false);
    };

    const handleCredentialChange = (e) => {
        const { name, value } = e.target;
        setProfessionalCredentials(prevCreds => ({
            ...prevCreds,
            [name]: value
        }));
    };

    const handleAuthModalOpen = () => {
        setIsAuthModalVisible(true);
    };

    const loadPublicProfileDetails = async (professionalId) => {

        try {
            const responsePublicProfile = await api.get(`/publicProfessionals/professional/${professionalId}`);
            if (responsePublicProfile.data) {
                setIsProfilePublished(true);
                setPublicProfileDetails(responsePublicProfile.data);
                setPublicProfileId(responsePublicProfile.data.id);

                if (responsePublicProfile.data.foto) {
                    const imageUrl = `${BASE_URL}/uploads/ProfileDoctor/${responsePublicProfile.data.foto.split('/').pop()}`;
                    setPerfilPictureUrl(imageUrl);
                }

            } else {
                setPublicProfileDetails({
                    nome: professionalDetails.nome,
                    telefone: professionalDetails.celular, // Ajuste para 'telefone' se esse for o nome correto do campo
                    email: professionalDetails.email,
                    registro_profissional: professionalDetails.registro_profissional,
                    titulo: professionalDetails.titulo,
                    planos_que_atende: planosSelecionados.join(", "), // Assumindo que 'planosSelecionados' é um array de IDs ou nomes
                    endereco: professionalDetails.endereco,
                    numero: professionalDetails.numero,
                    bairro: professionalDetails.bairro,
                    cidade: professionalDetails.cidade,
                    uf: professionalDetails.estado,
                    cep: professionalDetails.cep,
                });
            }

            setIsPublicProfileModalVisible(true);
        } catch (error) {
            console.error("Erro ao carregar perfil público", error);
            setPublicProfileDetails({
                nome: professionalDetails.nome,
                telefone: professionalDetails.celular,
                email: professionalDetails.email,
                registro_profissional: professionalDetails.registro_profissional,
                titulo: professionalDetails.titulo,
                planos_que_atende: planosSelecionados.join(", "),
                endereco: professionalDetails.endereco,
                numero: professionalDetails.numero,
                bairro: professionalDetails.bairro,
                cidade: professionalDetails.cidade,
                uf: professionalDetails.estado,
                cep: professionalDetails.cep,
            });

            setPerfilPictureUrl(null);
            setIsPublicProfileModalVisible(true);
        }
    };


    const handleAuthSubmit = async () => {
        try {
            const response = await api.post('/professionals/authenticate', {
                login: professionalCredentials.matricula,
                senha: professionalCredentials.senha,
            });

            if (response.data.autenticado && String(response.data.professional_id) === String(id)) {
                setProfessionalId(response.data.professional_id);
                setIsAuthModalVisible(false);
                loadPublicProfileDetails(response.data.professional_id);
            } else {
                notification.error({ message: "Você inseriu as credenciais de outro profssional, por favor insira as credenciais do profissional selecionado" });
            }
        } catch (error) {
            console.error("Erro de autenticação", error);
            message.error("Erro na autenticação");
        }
    };

    const handleSaveOrUpdatePublicProfile = async () => {
        Modal.confirm({
            title: 'Consentimento para Divulgação das Informações',
            content: 'Ao prosseguir, você permite que as informações listadas (nome, contato, especialidade médica, endereço, redes sociais, e detalhes profissionais) sejam publicadas em nossa plataforma, tornando-as visíveis ao público. Esta ação visa facilitar seu encontro por potenciais pacientes.',
            onOk() {
                publishProfile();
            },
        });
    };
    const publishProfile = async () => {
        const formData = new FormData();

        const planosNomes = planosSelecionados.map(idSelecionado => {
            const plano = todosPlanos.find(plano => plano.id === idSelecionado);
            return plano ? plano.nome : null;
        }).filter(nome => nome !== null).join(", ");

        const cleanProfileDetails = { ...publicProfileDetails };
        delete cleanProfileDetails.company_id;
        delete cleanProfileDetails.professional_id;
        delete cleanProfileDetails.planos_que_atende;

        Object.keys(cleanProfileDetails).forEach(key => {
            formData.append(key, cleanProfileDetails[key]);
        });

        formData.append('planos_que_atende', planosNomes);
        formData.append('company_id', companyID);
        formData.append('professional_id', professionalId);

        if (perfilPictureFile) {
            formData.append('foto', perfilPictureFile, perfilPictureFile.name);
        }

        try {
            let response;
            if (isProfilePublished && publicProfileId) {
                response = await api.put(`/publicProfessionals/${publicProfileId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                response = await api.post('/publicProfessionals', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            if (response.status === 200 || response.status === 201) {
                notification.success({
                    message: isProfilePublished ? "Perfil atualizado com sucesso!" : "Perfil publicado com sucesso!"
                });
                setIsPublicProfileModalVisible(false);
            } else {
                notification.error({ message: "Erro ao salvar perfil público" });
            }
        } catch (error) {
            console.error("Erro ao salvar perfil público", error);
            message.error("Erro ao salvar perfil público: " + error.message);
        }
    };

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


    const handleFileChange = info => {
        if (info.fileList.length === 0) {
            setPerfilPictureFile(null);
            return;
        }

        const file = info.fileList[0].originFileObj;
        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
            message.error("Por favor, selecione um arquivo PNG, JPG ou JPEG.");
            return;
        }

        resizeImage(file, 500, 500, 1, resizedFile => {
            const previewUrl = URL.createObjectURL(resizedFile);
            setPerfilPictureUrl(previewUrl);
            setPerfilPictureFile(resizedFile);
        });
    };

    const isFormValid = () => {
        return (
            publicProfileDetails.nome &&
            publicProfileDetails.especialidade &&
            publicProfileDetails.telefone &&
            publicProfileDetails.atendimento &&
            perfilPictureUrl
        );
    };

    const submitButton = (
        <Tooltip title={!isFormValid() ? "Preencha todos os campos obrigatórios para continuar" : ""}>
            <Button
                type="primary"
                onClick={handleSaveOrUpdatePublicProfile}
                disabled={!isFormValid()}
            >
                {isProfilePublished ? "Atualizar" : "Publicar"}
            </Button>
        </Tooltip>
    );


    return (
        <div className='tabela'>
            <h1>Detalhes do Profissional <UserOutlined /></h1>
            <Button onClick={handleGoBack} type='primary' style={{ marginRight: '1rem' }}>Voltar</Button>
            <Button onClick={handleAuthModalOpen} type='primary'>
                {isProfilePublished ? 'Atualizar Perfil Público' : 'Tornar Público'}<ShareAltOutlined />
            </Button>
            <Tabs defaultActiveKey="1" type='card' style={{ margin: '2rem 0 0 0' }}>
                {tabList.map(tab => (
                    <Tabs.TabPane tab={tab.tab} key={tab.key}>
                        {tab.content}
                    </Tabs.TabPane>
                ))}
            </Tabs>
            <Modal
                title="Autenticação do Profissional"
                open={isAuthModalVisible}
                onCancel={handleAuthModalClose}
                onOk={handleAuthSubmit}
                okText="Autenticar"
                cancelText="Cancelar"
            >
                <p>Compartilhe suas informações e aumente seu alcance, com isso as pessoas vão poder te achar em nossa plataforma</p>
                <p>Somente o próprio profissional pode compartilhar suas informações</p>
                <Input
                    placeholder="Matrícula"
                    name="matricula"
                    value={professionalCredentials.matricula}
                    onChange={handleCredentialChange}
                    style={{ marginBottom: '.6rem' }}
                />
                <Input.Password
                    placeholder="Senha"
                    name="senha"
                    value={professionalCredentials.senha}
                    onChange={handleCredentialChange}
                />
                <Button
                    type='link'
                    onClick={() => setIsResetDoctorModalVisible(true)}
                    style={{ marginTop: '1rem' }}
                >
                    Esqueci a senha 😥
                </Button>
            </Modal>
            <Modal
                title="Informações do seu Perfil Publico 🔄"
                open={isPublicProfileModalVisible}
                onCancel={() => setIsPublicProfileModalVisible(false)}
                okText={isProfilePublished ? "Atualizar" : "Publicar"}
                cancelText="Cancelar"
                width={900}
                footer={[
                    <Button key="back" onClick={() => setIsPublicProfileModalVisible(false)}>
                        Cancelar
                    </Button>,
                    submitButton
                ]}
            >
                <p>As informações a seguir serão publicadas em nossa plataforma de agendamentos, possibilitando que pessoas do mundo inteiro te encontrem</p>
                <StyledPublicModalContato>
                    <StyledPublicPicture>
                        {perfilPictureUrl && (
                            <img src={perfilPictureUrl} alt="Perfil" style={{ maxWidth: '100%', height: 'auto' }} />
                        )}
                        <Tooltip title="Alterar foto de perfil">
                            <div className='upload-btn'>
                                <Upload
                                    beforeUpload={() => false}
                                    onChange={handleFileChange}
                                    showUploadList={false}
                                    accept="image/png, image/jpeg, image/jpg"
                                >
                                    <UploadOutlined />
                                </Upload>
                            </div>
                        </Tooltip>
                    </StyledPublicPicture>
                    <StyledSubContainerPublic>
                        <Input
                            placeholder="Nome"
                            value={publicProfileDetails.nome}
                            onChange={(e) => setPublicProfileDetails({ ...publicProfileDetails, nome: e.target.value })}
                        />
                        <Input
                            placeholder="Telefone"
                            value={publicProfileDetails.telefone}
                            onChange={(e) => setPublicProfileDetails({ ...publicProfileDetails, telefone: e.target.value })}
                        />
                    </StyledSubContainerPublic>
                    <StyledSubContainerPublic>
                        <Input
                            placeholder="Email"
                            value={publicProfileDetails.email}
                            onChange={(e) => setPublicProfileDetails({ ...publicProfileDetails, email: e.target.value })}
                        />
                        <Input
                            placeholder="Instagram"
                            value={publicProfileDetails.instagram}
                            onChange={(e) => setPublicProfileDetails({ ...publicProfileDetails, instagram: e.target.value })}
                        />
                    </StyledSubContainerPublic>
                </StyledPublicModalContato>
                <StyledPublicModalContato>
                    <Input
                        placeholder="Especialidade"
                        value={publicProfileDetails.especialidade}
                        onChange={(e) => setPublicProfileDetails({ ...publicProfileDetails, especialidade: e.target.value })}
                    />
                    <Input
                        placeholder="Registro Profissional"
                        value={publicProfileDetails.registro_profissional}
                        onChange={(e) => setPublicProfileDetails({ ...publicProfileDetails, registro_profissional: e.target.value })}
                    />
                    <Input
                        placeholder="Título"
                        value={publicProfileDetails.titulo}
                        onChange={(e) => setPublicProfileDetails({ ...publicProfileDetails, titulo: e.target.value })}
                    />
                </StyledPublicModalContato>
                <StyledPublicModalContato>
                    <StyledPublicModalContato>
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
                    </StyledPublicModalContato>
                    <StyledPublicModalContato>
                        <Select
                            placeholder="Tipo de Atendimento"
                            style={{ width: '100%' }}
                            onChange={(value) => setPublicProfileDetails({ ...publicProfileDetails, atendimento: value })}
                        >
                            <Select.Option value="1">Apenas Presencial</Select.Option>
                            <Select.Option value="2">Apenas Teleconsulta</Select.Option>
                            <Select.Option value="3">Ambos</Select.Option>
                        </Select>
                    </StyledPublicModalContato>
                </StyledPublicModalContato>
                <StyledPublicModalContato>
                    <Input
                        placeholder="Endereço"
                        value={publicProfileDetails.endereco}
                        onChange={(e) => setPublicProfileDetails({ ...publicProfileDetails, endereco: e.target.value })}
                    />
                    <Input
                        placeholder="Número"
                        value={publicProfileDetails.numero}
                        onChange={(e) => setPublicProfileDetails({ ...publicProfileDetails, numero: e.target.value })}
                    />
                    <Input
                        placeholder="Bairro"
                        value={publicProfileDetails.bairro}
                        onChange={(e) => setPublicProfileDetails({ ...publicProfileDetails, bairro: e.target.value })}
                    />
                </StyledPublicModalContato>

                <StyledPublicModalContato>
                    <Input
                        placeholder="Cidade"
                        value={publicProfileDetails.cidade}
                        onChange={(e) => setPublicProfileDetails({ ...publicProfileDetails, cidade: e.target.value })}
                    />
                    <Input
                        placeholder="UF"
                        maxLength={2}
                        value={publicProfileDetails.uf}
                        onChange={(e) => setPublicProfileDetails({ ...publicProfileDetails, uf: e.target.value.toUpperCase() })}
                    />
                    <Input
                        placeholder="CEP"
                        value={publicProfileDetails.cep}
                        onChange={(e) => setPublicProfileDetails({ ...publicProfileDetails, cep: e.target.value })}
                    />
                </StyledPublicModalContato>
            </Modal>
            {isResetDoctorModalVisible && (
                <ResetDoctorPasswordModal
                    isResetDoctorModalVisible={isResetDoctorModalVisible}
                    onResetDoctorModalClose={() => setIsResetDoctorModalVisible(false)}
                />
            )}
        </div>
    );
}

export default DoctorDetails;

import React, { useEffect, useState } from 'react';
import { StyledPublicDetailPage, StyledPublicDetaillCard } from '../styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from 'components/api/api';
import { BASE_URL } from 'config';
import { LoadingOverlay } from 'pages/ContactPage/styles';
import Loading from 'components/Loading';
import { CompassOutlined, FormOutlined, InstagramOutlined, MailOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const ProfessionalDetailPage = () => {
    const [professional, setProfessional] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfessionalDetails = async () => {
            try {
                const response = await api.get(`/publicProfessionals/${id}`);
                setProfessional(response.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do profissional', error);
            }
        };

        fetchProfessionalDetails();
    }, [id]);

    if (!professional) {
        return <LoadingOverlay><Loading /></LoadingOverlay>;
    }

    const getAtendimentoDescricao = (codigo) => {
        switch (codigo) {
            case '1': return 'Apenas Presencial';
            case '2': return 'Apenas Teleconsulta';
            case '3': return 'Presencial e Teleconsulta';
            default: return 'Não informado';
        }
    };
 

    return (
        <StyledPublicDetailPage>
            <div className='botaovoltar'>
                <Button onClick={() => navigate(-1)} type='primary'>Voltar</Button>
            </div>
            <StyledPublicDetaillCard key={professional?.id}>
                {professional?.foto && (
                    <img src={`${BASE_URL}/${professional.foto}`} alt="Perfil" />
                )}
                <div className='doctors-infos-card'>
                    <h2>{professional.nome.split(' ').slice(0, 2).join(' ')}</h2>
                    <p><strong>{professional.especialidade}</strong></p>
                    <p><FormOutlined /> {professional.registro_profissional}</p>
                    {professional.instagram && <p><InstagramOutlined /> {professional.instagram}</p>}
                    <p><WhatsAppOutlined /> {professional.telefone}</p>
                    <p><MailOutlined /> {professional.email}</p>
                </div>
                <div className='doctors-infos-card'>
                    <p><CompassOutlined /> {professional.endereco}, {professional.numero}, {professional.bairro}, {professional.cidade} - {professional.uf}</p>
                    <p><strong>Planos que atende:</strong>{professional.planos_que_atende}</p>
                    <Button type='primary'>{getAtendimentoDescricao(professional.atendimento)}</Button>
                </div>
                <div className='doctors-infos-agendar'>
                    <Link to={`/agendar/${professional.company_id}`}>
                        <Button type='primary'>Agendar Consulta</Button>
                    </Link>
                </div>
            </StyledPublicDetaillCard>
        </StyledPublicDetailPage>
    );
};

export default ProfessionalDetailPage;

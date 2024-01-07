import React from 'react';
import {
    StyledBanner,
    StyledContainer,
    StyledRow,
    StyledCol,
    StyledCard,
    StyledIcon,
    StyledTitle,
    StyledDescription,
    StyledTest
} from './Styles';
import {
    CalendarOutlined,
    BellOutlined,
    UsergroupAddOutlined,
    FileTextOutlined,
    DollarOutlined,
    ClockCircleOutlined,
    SnippetsOutlined,
    BarChartOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Btn from 'components/Btn';
import computerPhone from '../../public/computerPhone.png';

const services = [
    {
        Icon: CalendarOutlined,
        title: "Gerenciamento de Agenda Intuitivo",
        description: "Mantenha sua agenda organizada e acessível a qualquer momento e em qualquer lugar."
    },
    {
        Icon: ClockCircleOutlined,
        title: "Reserva Online Simplificada",
        description: "Proporcione a seus clientes o conforto de agendar serviços online sem você precisar fazer nada."
    },
    {
        Icon: UsergroupAddOutlined,
        title: "Cadastro de Clientes",
        description: "Centralize informações de clientes em um único lugar, garantindo facilidade e segurança de acesso, quando o cliente agenda o sistema faz um pré cadastro."
    },
    {
        Icon: SnippetsOutlined,
        title: "Documentos Digitais",
        description: "Agilize a criação e gestão de documentos essenciais, como declarações, atestados, receitas médicas e orçamentos."
    },
    {
        Icon: BellOutlined,
        title: "Alertas de Compromisso Automatizados",
        description: "Minimize as ausências inesperadas com alertas automáticos por e-mail e SMS, diminuindo faltas em até 70%."
    },
    {
        Icon: FileTextOutlined,
        title: "Gestão de Prontuários Digitais",
        description: "Prontuários eletrônicos para atender às especificidades do seu empreendimento."
    },
    {
        Icon: DollarOutlined,
        title: "Administração Financeira Eficiente",
        description: "Gerencie as finanças com uma ferramenta completa, intuitiva e projetada para eficiência."
    },
    {
        Icon: BarChartOutlined,
        title: "Análise de Dados",
        description: "Obtenha insights detalhados do desempenho da sua clinica para fundamentar decisões estratégicas."
    },
    {
        Icon: PhoneOutlined,
        title: "Suporte simplificado",
        description: "Obtenha Suporte da equipe técnica e ainda tenha a possibilidade de melhorar a plataforma para atender as necessidades do seu negócio"
    }
];

const ResourcesGrid = () => {
    const navigate = useNavigate();
    const goToSignUp = () => navigate('/cadastro');

    return (
        <>
<StyledBanner backgroundImage={computerPhone}>
  <h1>Solução abrangente para agendamentos Online</h1>
  <p>
    Descubra o poder de uma plataforma de agendamento online projetada para transformar a forma como você gerencia seu tempo e seus clientes.
  </p>
</StyledBanner>
            <StyledContainer>
                <StyledRow gutter={[16, 16]}>
                    {services.map((service, index) => (
                        <StyledCol xs={24} sm={24} md={12} lg={8} xl={8} key={index}>
                            <StyledCard>
                                <StyledIcon as={service.Icon} />
                                <StyledTitle>{service.title}</StyledTitle>
                                <StyledDescription>{service.description}</StyledDescription>
                            </StyledCard>
                        </StyledCol>
                    ))}
                </StyledRow>
            </StyledContainer>
            <StyledTest>
                <p>O Marquei É grátis por 7 dias, aproveite e ...</p>
                <Btn onClick={goToSignUp}>Crie seu cadastro !</Btn>
            </StyledTest>
        </>
    );
};

export default ResourcesGrid;

import React, { useRef, useState } from 'react';
import styles from './Home.module.scss';
import Carousel from 'components/PageBody/Carousel';
import horas from '../../public/home/woman.png'
import controle from '../../public/home/woman-2.png'
import digital from '../../public/home/digital.png'
import Btn from 'components/Btn';
import PlanCard from 'components/SelerCads';
import { Link } from 'react-router-dom';


const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const contentRef = useRef(new Array(items.length).fill(React.createRef())); // Uma referência para cada item de conteúdo

  const onTitleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderedItems = items.map((item, index) => {
    const isActive = index === activeIndex;
    const contentStyle = {
      maxHeight: isActive ? `${contentRef.current[index].current.scrollHeight}px` : "0px",
      padding: isActive ? "1.5rem" : "0" // Adicionando padding aqui
    };

    return (
      <div key={item.title} className={styles.accordionItem}>
        <div
          className={`${styles.title} ${isActive ? styles.activeTitle : ''}`}
          onClick={() => onTitleClick(index)}
        >
          <span className={styles.titleText}>{item.title}</span>
          <span className={isActive ? styles.iconMinus : styles.iconPlus}>
            {isActive ? '-' : '+'}
          </span>
        </div>
        <div
          className={styles.content}
          style={contentStyle}
          ref={contentRef.current[index]} // Adicionando a referência aqui
        >
          {item.content}
        </div>
      </div>
    );
  });

  return <div className={styles.accordion}>{renderedItems}</div>;
};

const faqItems = [
  {
    title: 'Se eu testar e não quiser contratar, haverá multa ou taxas?',
    content: 'Experimente sem receio ! Não existe cobrança alguma se decidir que as soluções Marquei.com não atendem às suas necessidades após o período de avaliação. Ademais, iniciar seu teste não demanda a inclusão de um método de pagamento.',
  },
  {
    title: 'Marquei é um sistema exclusivo para médicos?',
    content: 'No momento o Marquei atende bem as demandas de medicos, dentistas e fisioterapeutas. Também estamos em constante transformação, isso significa que recebemos sugestões de melhorias e funcionalidades as quais analisamos e implantamos diariamente.',
  },
  {
    title: 'Como funciona o suporte?',
    content: 'Oferecemos suporte para todos os usuários via chamados na plataforma, e-mail e WhatsApp, com resposta em até 30 minutos. Nosso horário de atendimento é de segunda a sexta das 08h às 18h, exceto em feriados nacionais. ',
  },
  {
    title: 'Como contratar o Marquei.com?',
    content: 'Você pode assinar em qualquer momento durante ou ao final do seu teste clicando no botão “Assine agora” no sistema, ou, se preferir, você pode falar com um consultor e tirar suas dúvidas antes da contratação.',
  },
  {
    title: 'Como é realizado o treinamento para uso do sistema?',
    content: 'A plataforma é intuitiva e fácil de usar. Mas, mesmo assim, disponibilizamos vídeo treinamentos feitos por nosso time de especialistas que entende suas necessidades e visam garantir o maximo aproveitamento do sistema',
  },
  {
    title: 'Tem contrato de fidelidade?',
    content: 'Estamos livres de compromissos de longo prazo, refletindo nossa confiança no valor do serviço que fornecemos. O cancelamento está ao seu alcance sempre, contanto que não existam débitos em aberto. Qualquer dado ou informação no sistema pode ser requisitado e será fornecido com total segurança.',
  },
];

function Home() {
  return (
    <div>
      <Carousel />
      <div className={styles.home}>
        <section className={styles.analogica}>
          <div className={styles.analogica__texto}>
            <h2>Agendamento 24 horas por dia!</h2>
            <p>Simplifique o agendamento para seus pacientes e automatize os processos repetitivos da sua clínica.</p>
            <ul>
              <li>Agendamento 100% digital e em poucos cliques</li>
              <li>Conexão com o prontuário eletrônico</li>
              <li>Agenda disponível para acesso a qualquer hora e lugar</li>
            </ul>
            <Btn>CONFIRA OS PLANOS</Btn>
          </div>
          <div className={styles.analogica__img}>
            <img src={digital} alt="medica com olhar analitico digital" />
          </div>
        </section>
        <section className={styles.controle}>
          <div className={styles.controle__img}>
            <img src={controle} alt="" />
          </div>
          <div className={styles.controle__texto}>
            <h2>Controle da clínica de ponta a ponta !</h2>
            <p>Reduza até 38% das ausências de pacientes nos atendimentos.</p>
            <ul>
              <li>Agenda inteligente com confirmação automática de consulta</li>
              <li>Gestão de estoque com controle de entradas e saídas</li>
              <li>Emissão automatizada de termos e documentos</li>
            </ul>
            <Btn>CONTROLE SUA CLINICA</Btn>
          </div>
        </section>
        <section className={styles.analogica}>
          <div className={styles.analogica__texto}>
            <h2>Sua Clínica precisa deixar de ser analógica !</h2>
            <p>Se você está exausto de lidar com planilhas complexas ou se perder em montanhas de papéis, e busca uma maneira eficiente de prevenir sobreposições nos agendamentos dos seus pacientes, o "Marquei" é a solução perfeita para a sua clínica, independentemente do seu tamanho. Com o nosso software de gestão de agendas, simplifique seu dia a dia e concentre-se no que realmente importa: cuidar da saúde dos seus pacientes!</p>
            <Btn>DEIXAR DE SER ANALOGICA</Btn>
          </div>
          <div className={styles.analogica__img}>
            <img src={horas} alt="medica com olhar analitico digital" />
          </div>
        </section>
        <section className={styles.solucao}>
          <h3>Solução ultraconfiável para profissionais de qualquer lugar do país !</h3>
        </section>
        <section className={styles.planos}>
          <h2>Temos o plano certo para o seu consultório médico</h2>
          <div className={styles.cards}>
            <PlanCard
              title="Plus"
              price="69,99"
              originalPrice="119"
              quantity="1"
              duration="1"
              mostSold
            />
            <PlanCard
              title="Pro"
              price="99,99"
              originalPrice="159"
              quantity="5"
              duration="1"
            />
            <PlanCard
              title="Premium"
              price="189,99"
              originalPrice="299"
              quantity="10"
              duration="1"
            />
          </div>
          <Link to="/cadastro">
            <Btn>Experimente grátis</Btn>
          </Link>
        </section>
      </div>
      <section className={styles.faq}>
        <h2>Confira nossas perguntas frequentes</h2>
        <Accordion items={faqItems} />
      </section>
    </div>
  );
}

export default Home;

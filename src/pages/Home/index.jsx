import React from 'react';
import styles from './Home.module.scss';
import Carousel from 'components/PageBody/Carousel';
import horas from '../../public/home/woman.png'
import controle from '../../public/home/woman-2.png'
import digital from '../../public/home/digital.png'
import Btn from 'components/Btn';
import PlanCard from 'components/SelerCads';
import { Link } from 'react-router-dom';
import Faq from 'components/Faq';


function Home() {
  return (
    <div>
      <div className={styles.carouselHome}>
        <Carousel />
      </div>
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
            <PlanCard />
          </div>
          <Link to="/cadastro">
            <Btn>Experimente grátis</Btn>
          </Link>
        </section>
      </div>
      <section className={styles.faq}>
        <h2>Confira nossas perguntas frequentes</h2>
        <Faq />
      </section>
    </div>
  );
}

export default Home;

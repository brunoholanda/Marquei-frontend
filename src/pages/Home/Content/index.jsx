import React, { useRef } from 'react';
import styles from '../Home.module.scss';
import horas from '../../../public/home/nps-doctor.webp';
import controle from '../../../public/home/woman-2.webp';
import digital from '../../../public/home/digital.webp';
import Btn from 'components/Btn';
import { useNavigate } from 'react-router-dom';
import computerPhone from '../../../public/computerPhone.png';
import useOnScreen from 'hooks/useOnScreen';
function ContentHome() {
    const navigate = useNavigate();
    const goToSignUp = () => navigate('/cadastro');

    const digitalImgRef = useRef();
    const controleImgRef = useRef();
    const horasImgRef = useRef();
    const computerPhoneImgRef = useRef();

    const isDigitalImgVisible = useOnScreen(digitalImgRef);
    const isControleImgVisible = useOnScreen(controleImgRef);
    const isHorasImgVisible = useOnScreen(horasImgRef);
    const isComputerPhoneImgVisible = useOnScreen(computerPhoneImgRef);


    return (
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
                    <Btn onClick={goToSignUp} >CONFIRA OS PLANOS</Btn>
                </div>
                <div className={styles.analogica__img} ref={digitalImgRef}>
                    {isDigitalImgVisible && <img src={digital} alt="medica com olhar analitico digital" />}
                </div>
            </section>
            <section className={styles.controle}>
                <div className={styles.controle__img} ref={controleImgRef}>
                    {isControleImgVisible && <img src={controle} alt="homem de branco serio olhando para voce" />}
                </div>
                <div className={styles.controle__texto}>
                    <h2>Controle da clínica de ponta a ponta !</h2>
                    <p>Reduza ausências de pacientes nos atendimentos.</p>
                    <ul>
                        <li>Agenda inteligente com confirmação automática de consulta</li>
                        <li>Gestão de estoque com controle de entradas e saídas</li>
                        <li>Emissão automatizada de termos e documentos</li>
                    </ul>
                    <Btn onClick={goToSignUp}>CONTROLE SUA CLINICA</Btn>
                </div>
            </section>
            <section className={styles.analogica}>
                <div className={styles.analogica__texto}>
                    <h2>Sua Clínica precisa deixar de ser analógica !</h2>
                    <p>Se você está cansado de lidar com planilhas e papéis, o "Marquei" é a solução ideal para sua clínica. Simplifique sua rotina com nosso software de gestão de agendas e foque no cuidado dos pacientes!</p>
                    <ul>
                        <li>Pesquisa de satisfação automatizada.</li>
                        <li>Prontuário eletrônico.</li>
                        <li>Seu perfil médico pode ser compartilhado com o mundo.</li>
                    </ul>
                    <Btn onClick={goToSignUp}>DEIXAR DE SER ANALOGICA</Btn>
                </div>
                <div className={styles.analogica__img} ref={horasImgRef}>
                    {isHorasImgVisible && <img src={horas} alt="medica com olhar analitico digital" />}
                </div>
            </section>
            <section className={styles.solucao} ref={computerPhoneImgRef}>
                {isComputerPhoneImgVisible && <img src={computerPhone} alt="imagem de computador e telefone" />}
                <h3>Solução ultraconfiável para profissionais de qualquer lugar do país !</h3>
            </section>
        </div>
    );
}

export default ContentHome;

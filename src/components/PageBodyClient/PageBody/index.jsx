import { Link, Outlet } from "react-router-dom";
import styles from './PageBody.module.scss';
import FloatingWhatsAppButton from "components/FloatingButton";
import { CompassOutlined } from "@ant-design/icons";
import logo from '../../../public/logo.png';
import HeaderClient from "./HeaderClient";

export default function PageBodyClient() {
    return (
        <>
            <HeaderClient />
            <Outlet />
            <Footer />
            <FloatingWhatsAppButton />
        </>
    )
}

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footer__topicos}>
                <img src={logo} alt="logo marquei.com" />
                <p><CompassOutlined />  Av. Paulista 1106 - Bela Vista, São Paulo - SP - SL01 Andar 16, 01310-914 </p>
                <p> (11) 5194-6100 </p>
                <a href="mailto:drawaleskacaetano@gmail.com?subject=Contato">holanda_rodrigues@hotmail.com</a>
            </div>
            <div className={styles.footer__topicos}>
                <h3>Marquei</h3>
                <div className={styles.link}>
                    <Link to="/servicos/clinico">
                        Sobre nós
                    </Link>
                    <Link to="/resources">
                        Como funciona?
                    </Link>
                    <Link to="/cadastro">
                        Colabore com a plataforma
                    </Link>
                </div>
            </div>
            <div className={styles.footer__topicos}>
                <h3>Produto</h3>
                <div className={styles.link}>
                    <Link to="/servicos/clinico">
                        Planos
                    </Link>
                    <Link to="/cadastro">
                        Experimente grátis
                    </Link>
                </div>
            </div>
            <div className={styles.footer__topicos}>
                <h3>Ajuda</h3>
                <div className={styles.link}>
                    <Link to="/ajuda">
                        Central de ajuda
                    </Link>
                    <Link to="/contato">
                        Contato
                    </Link>
                </div>
            </div>
        </div>

    )
} 


function FooterDev() {
    return (
        <div className={styles.footer__dev}>
            <p>Holanda Desenvolvimento de Software ME 50.509.731/0001-35</p>
            <p>Copyright© Holanda Dev Software 2023. Todos os direitos reservados.</p>
        </div>
    )
}
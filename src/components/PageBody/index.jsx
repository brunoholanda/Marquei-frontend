import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import styles from './PageBody.module.scss';
import FloatingWhatsAppButton from "components/FloatingButton";
import { CompassOutlined, RightOutlined } from "@ant-design/icons";
import logo from '../../public/logo.png'

export default function PageBody() {
    return (
        <>
            <HighHeader />
            <Header />
            <Outlet />
            <Footer />
            <FooterDev />
            <FloatingWhatsAppButton />
        </>
    )
}

function HighHeader() {
    return (
        <div className={styles.highHeader}>
            <p>Estamos em conformidade com as normas LGPD e a resolução CFM/2299</p>
            <Link to='./login'>
                Acesse a plataforma <RightOutlined />
            </Link>
        </div>
    )
}


function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footer__topicos}>
                <img src={logo} alt="logo marquei.com" />
                <p><CompassOutlined />  Av. Paulista 1106 - Bela Vista, São Paulo - SP - SL01 Andar 16, 01310-914 </p>
                <p> (83) 99815-0712</p>
                <a href="mailto:drawaleskacaetano@gmail.com?subject=Contato">holanda_rodrigues@hotmail.com</a>
            </div>
            <div className={styles.footer__topicos}>
                <h3>Marquei</h3>
                <div className={styles.link}>
                    <Link to="/servicos/clinico">
                        Sobre nós
                    </Link>
                    <Link to="/servicos/canal">
                        Como funciona?
                    </Link>
                    <Link to="/servicos/estetica">
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
                    <Link to="/servicos/clinico">
                        Central de ajuda
                    </Link>
                    <Link to="/servicos/canal">
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
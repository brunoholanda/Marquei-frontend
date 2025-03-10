import { Link } from "react-router-dom";
import styles from '../PageBody.module.scss';
import { CompassOutlined, InstagramOutlined, MailOutlined, WhatsAppOutlined } from "@ant-design/icons";
import logo from '../../../public/logo.webp'

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footer__topicos}>
                <img src={logo} loading="lazy" alt="logo marquei.com" />
                <p><CompassOutlined />  Av. Paulista 1106 - Bela Vista, São Paulo - SP - SL01 Andar 16, 01310-914 </p>
                <p><WhatsAppOutlined /> (11) 5194-6100</p>
                <a href="mailto:contato@marquei.com.br?subject=Contato"><MailOutlined /> contato@marquei.com.br</a>
                <a href="https://www.instagram.com/marqueiagenda?igsh=NjltNW92a2plYm4z" target="__blank" style={{ margin: '0' }}>
                    <p><InstagramOutlined /> marqueiagenda </p>
                </a>
            </div>
            <div className={styles.footer__topicos}>
                <h3>Marquei</h3>
                <div className={styles.link}>
                    <Link to="/como-usar">
                        Sobre nós
                    </Link>
                    <Link to="/como-usar">
                        Como funciona?
                    </Link>
                </div>
            </div>
            <div className={styles.footer__topicos}>
                <h3>Produto</h3>
                <div className={styles.link}>
                    <Link to="/planos">
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

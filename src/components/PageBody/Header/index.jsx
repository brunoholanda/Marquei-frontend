import { Link } from "react-router-dom";
import styles from './Header.module.scss';
import logo from '../../../public/logo.png';
import Btn from "components/Btn";
import MenuMobile from "components/MenuMobile";

function MenuLinks() {
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    return (
        <div className={styles.menuLinks}>
            <Link to="./">
                Serviços
            </Link>
            <Link to="./">
                Planos
            </Link>
            <Link to="./sobre">
                Como Funciona
            </Link>
            <Link to="./contato">
                Contrate
            </Link>
        </div>
    )
}

function SocialLinks() {
    return (
        <div className={styles.socialLinks}>
            <a href="https://www.instagram.com/drawaleskacaetano_/" target="_blank" rel="noreferrer">
                <div className={styles.socialLinks__li}></div>
            </a>
            <a href="https://wa.me/5583998472670" target="_blank" rel="noreferrer">
                <div className={styles.socialLinks__wp}></div>
            </a>
        </div>
    )
}

export default function Header() {
    return (
        <div className={styles.header}>
            <Link to="./">
                <img src={logo} alt="logo da pagina" />
            </Link>
            <div className={styles.header__mobile}>
                <MenuMobile />
            </div>
            <div className={styles.header__links}>
                <MenuLinks />
            </div>
            <Link to='./cadastro'>
                <Btn>Experimentar grátis</Btn>
            </Link>
        </div>
    )
}
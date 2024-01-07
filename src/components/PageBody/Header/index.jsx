import { Link } from "react-router-dom";
import styles from './Header.module.scss';
import logo from '../../../public/logo.png';
import Btn from "components/Btn";
import MenuMobile from "components/MenuMobile";

function MenuLinks() {

    return (
        <div className={styles.menuLinks}>
            <Link to="./resources">
                Recursos
            </Link>
            <Link to="./">
                Planos
            </Link>
            <Link to="./sobre">
                Como Funciona
            </Link>
            <Link to="./cadastro">
                Contrate
            </Link>
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
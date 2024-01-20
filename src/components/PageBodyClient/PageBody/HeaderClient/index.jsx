import { Link } from "react-router-dom";
import styles from './HeaderClient.module.scss';
import logob from '../../../../public/logo-branca-2.png';
import MenuMobile from "components/MenuMobile";
import Btn from "components/Btn";

function MenuLinksClient() {

    return (
        <div className={styles.menuLinks}>
            <Link to="./resources">
                Recursos
            </Link>
            <Link to="./planos">
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


export default function HeaderClient() {
    return (
        <div className={styles.header}>
            <Link to="./">
                <img src={logob} alt="logo da pagina" />
            </Link>
            <div className={styles.header__mobile}>
                <MenuMobile />
            </div>
            <div className={styles.header__links}>
                <MenuLinksClient />
            </div>
            <div className={styles.header__access}>
                <Link to='./login'>
                    Acessar
                </Link>
                <Link to='./cadastro'>
                    <Btn>Teste grátis</Btn>
                </Link>
            </div>
        </div>
    )
}
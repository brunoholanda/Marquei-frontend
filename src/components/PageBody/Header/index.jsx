import { Link } from "react-router-dom";
import styles from './Header.module.scss';
import logob from '../../../public/logo-branca-2.webp';

import Btn from "components/Btn";
import { Suspense, lazy, useEffect, useState } from "react";
const MenuMobileLazy = lazy(() => import("components/MenuMobile"));

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return isMobile;
  }

function MenuLinks() {

    return (
        <div className={styles.menuLinks}>
            <Link to="./resources">
                Recursos
            </Link>
            <Link to="./planos">
                Planos
            </Link>
            <Link to="/search-professionals">
               Encontre o profissionais
            </Link>
            <Link to="./cadastro">
                Contrate
            </Link>
        </div>
    )
}


export default function Header() {
    const isMobile = useIsMobile();

    return (
        <div className={styles.header}>
            <Link to="./">
                <img src={logob} loading="lazy" alt="logo da página" />
            </Link>
            <div className={styles.header__mobile}>
                {isMobile && (
                  <Suspense fallback={<div>Carregando...</div>}>
                    <MenuMobileLazy />
                  </Suspense>
                )}
            </div>
            <div className={styles.header__links}>
                <Suspense fallback={null}>
                    <MenuLinks />
                </Suspense>
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
    );
}
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './PageBody.module.scss'; 
import Sidebar from 'components/Sidebar';
import { CompassOutlined } from '@ant-design/icons';

export default function PageBodySystem() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className={styles.content}>
        <Outlet /> 
        <Footer />
        <FooterDev />
      </div>
    </div>
  );    
}

function Footer() {
    return (
      <div className={styles.footer}>
      <div className={styles.footer__topicos}>
          <h3>Marquei</h3>
          <div className={styles.link}>
              <Link to="/servicos/clinico">
                  Sobre
              </Link>
              <Link to="/servicos/estetica">
                  Sugira uma melhoria !
              </Link>
          </div>
      </div>
      <div className={styles.footer__topicos}>
          <h3>Indique</h3>
          <div className={styles.link}>
              <Link to="/servicos/clinico">
                  Indique a um amigo !
              </Link>
              <Link to="/cadastro">
                  Mensalidade Gratis
              </Link>
          </div>
      </div>
      <div className={styles.footer__topicos}>
          <h3>Suporte</h3>
          <div className={styles.link}>
              <Link to="/servicos/clinico">
                  Central de ajuda
              </Link>
              <Link to="/servicos/canal">
                  Abra um chamado 
              </Link>
          </div>
      </div>
      
  </div>
    )
} 

function FooterDev() {
  return (
      <div className={styles.footer__dev}>
          <p>Holanda Desenvolvimento de Software 50.509.731/0001-35</p>
          <p>Copyright© Holanda Dev Software 2023. Todos os direitos reservados.</p>
      </div>
  )
}
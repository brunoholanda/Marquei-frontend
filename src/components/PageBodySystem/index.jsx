import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './PageBody.module.scss';
import Sidebar from 'components/Sidebar';
import CalledModal from 'components/Modals/calledModal';
import RecommendationModal from 'components/Modals/recommendationModal';

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
    const [showCalledModal, setShowCalledModal] = useState(false);
    const [showRecommentationModal, setShowRecommentationModal] = useState(false);

    const handleOpenCalled = () => {
        setShowCalledModal(true);
    };

    const handleOpenRecommentation = () => {
        setShowRecommentationModal(true);
    };

    return (
        <div className={styles.footer}>
            <div className={styles.footer__topicos}>
                <h3>Marquei</h3>
                <div className={styles.link}>
                    <Link to="/servicos/clinico">
                        Sobre
                    </Link>
                    <span onClick={handleOpenCalled} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                        Sugira uma melhoria !
                    </span>
                </div>
            </div>
            <div className={styles.footer__topicos}>
                <h3>Indique</h3>
                <div className={styles.link}>
                    <span onClick={handleOpenRecommentation} className={styles.link}>
                        Indique a um amigo !
                    </span>
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
                    <span onClick={handleOpenCalled} className={styles.link}>
                        Abra um chamado
                    </span>
                </div>
            </div>
            <CalledModal
                isVisible={showCalledModal}
                onClose={() => setShowCalledModal(false)}
            />
            <RecommendationModal
                modalRecommendationisVisible={showRecommentationModal}
                modalRecommendationisClose={() => setShowRecommentationModal(false)}
            />
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
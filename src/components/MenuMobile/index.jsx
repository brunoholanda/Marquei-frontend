import React, { useState } from 'react';
import HamburgerMenu from 'hamburger-react';
import styles from './MenuMobile.module.scss';
import { Link } from 'react-router-dom';

export default function MenuMobile() {
    const [isOpen, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!isOpen);
    };

    const handleItemClick = (e) => {
        setOpen(false);
    }

    return (
        <>
            <nav>
                <HamburgerMenu
                    toggled={isOpen}
                    toggle={toggleMenu}
                    color="#fff"
                    size={45}
                />
            </nav>
            {isOpen && (
                <ul className={styles.mobileMenu} onClick={handleItemClick}>
                    <Link to="./">
                        <li>Inicio</li>
                    </Link>
                    <Link to="./resources">
                        <li>Recursos</li>
                    </Link>
                    <Link to="./planos">
                        <li>Planos</li>
                    </Link>
                    <Link to="./sobre">
                        <li>Como Funciona</li>
                    </Link>
                    <Link to="./cadastro">
                        <li>Contrate</li>
                    </Link>
                </ul>
            )}
        </>
    );
}



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
                    color="#ab7b3b"
                    size={60}
                />
            </nav>
            {isOpen && (
                <ul className={styles.mobileMenu} onClick={handleItemClick}>
                    <Link to="./">
                        <li>Inicio</li>
                    </Link>
                    <Link to="/servicos/estetica">
                        <li>Estética</li>
                    </Link>
                    <Link to="/servicos/canal">
                        <li>Canal</li>
                    </Link>
                    <Link to="/servicos/protese">
                        <li>Prótese</li>
                    </Link>
                    <Link to="/servicos/clinico">
                        <li>Clínico Geral</li>
                    </Link>
                    <Link to="./sobre">
                        <li>Sobre</li>
                    </Link>
                    <Link to="./contato">
                        <li>Contato</li>
                    </Link>
                </ul>
            )}
        </>
    );
}



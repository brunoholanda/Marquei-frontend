import React, { useState } from 'react';

import { useSwipeable } from 'react-swipeable';
import { CloseIcon, MenuBar, MenuIcon, MenuText, StyledHeader, StyledLink, StyledNav } from './styles';

export default function MenuMobile() {
    const [isOpen, setIsOpen] = useState(false);

    const handlers = useSwipeable({
        onSwipedLeft: () => setIsOpen(false),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <StyledHeader>
            <MenuIcon onClick={() => setIsOpen(!isOpen)}>&#9776;</MenuIcon>
            <StyledNav {...handlers} isOpen={isOpen}>
                <MenuBar>
                    <MenuText>Menu</MenuText>
                    <CloseIcon onClick={() => setIsOpen(false)}>&times;</CloseIcon>
                </MenuBar>
                <StyledLink to="/" onClick={() => setIsOpen(false)}>Home</StyledLink>
                <StyledLink to="/resources" onClick={() => setIsOpen(false)}>Recursos</StyledLink>
                <StyledLink to="/planos" onClick={() => setIsOpen(false)}>Planos</StyledLink>
                <StyledLink to="/sobre" onClick={() => setIsOpen(false)}>Como Funciona?</StyledLink>
                <StyledLink to="/cadastro" onClick={() => setIsOpen(false)}>Contrate!</StyledLink>
            </StyledNav>
        </StyledHeader>
    );
};




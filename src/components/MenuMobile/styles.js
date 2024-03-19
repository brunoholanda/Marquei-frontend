import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background-color: var(--azul);
`;

export const MenuIcon = styled.div`
  font-size: 35px;
  cursor: pointer;
  color: var(--branco);

`;

export const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  height: 100vh;
  width: 150px;
  transition: left 0.3s;
  padding: 15px;
  background-color: var(--azul);
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.7);
  z-index: 2;
`;

export const MenuBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const MenuText = styled.div`
  font-size: 28px;
  color: var(--branco);
`;

export const CloseIcon = styled.div`
  cursor: pointer;
`;

export const StyledLink = styled(Link)`
  display: block;
  padding: 8px 0;
  text-decoration: none;
  color: var(--branco);
`;

// Dentro do seu arquivo de estilos
export const LogoImage = styled.img`
  height: 50px; // Ajuste conforme necessário
  width: auto; // Mantém a proporção da imagem
  display: block; // Garante que a imagem será exibida
`;

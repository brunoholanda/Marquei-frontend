// style.js
import styled from 'styled-components';
import { Form, Input, Button, Card } from 'antd';

export const StyledCard = styled(Card)`
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  margin: 2rem;
`;

export const StyledForm = styled(Form)`
  width: 30rem;
  display: flex;
  flex-direction: column;
  margin: 0;
  display: center;
  .ant-form-item-label > label {
    color: #333; // Exemplo
    // Adicione mais estilos conforme necessário
  }
`;

export const StyledContainerButton = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  button {
    margin-bottom: .8rem;
  }

`;


export const StyledPlanCard = styled.div`
  width: 500px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  margin: 2rem;
  padding: 1rem;
  border-radius: 8px;
  border: ${({ selected }) => (selected ? '3px solid #3f51b5' : 'none')}; /* Altere a cor e o estilo conforme necessário */
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px 0 rgba(0,0,0,0.3);
  }
`;

export const StyledPlanContainer = styled.div`
  width: 800px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;

  button {
    margin-bottom: .8rem;
  }

`;

export const StyledInput = styled(Input)`
  border-radius: 4px;
  // Adicione mais estilos conforme necessário
`;

export const StyledButton = styled(Button)`
  width: 100%;
  background-color: #4CAF50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
  // Adicione mais estilos conforme necessário
`;

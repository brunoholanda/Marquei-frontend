// style.js
import styled from 'styled-components';
import { Form, Input, Button, Card } from 'antd';

export const StyledCard = styled(Card)`
  width: 300px;
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

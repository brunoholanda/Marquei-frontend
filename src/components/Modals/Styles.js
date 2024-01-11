import styled from 'styled-components';
import { Modal, Form, Input, Button, DatePicker, TimePicker, Select } from 'antd';

// Estilização para o Modal
export const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    margin: 0;
  }


  .ant-form {
    margin: 1rem;
  }
  .ant-modal-header {
    border-bottom: 1px solid #ebeef0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .ant-modal-title {
    color: #333;
    font-weight: 500;
    text-align: center;
    margin-bottom: .5rem;
  }

  .ant-modal-footer {
    border-top: 1px solid #ebeef0;
    padding: 10px 16px;
  }
`;

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 14px;
`;

export const StyledInput = styled(Input)`
  border-radius: 4px;
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  font-weight: 500;

  &:hover, &:focus {
    border-color: #1890ff;
    color: #1890ff;
  }
`;

export const StyledDateTime = styled.div`
  display: flex;
  justify-content: space-between;
`;


// Estilização para DatePicker
export const StyledDatePicker = styled(DatePicker)`
  border-radius: 4px;
`;

// Estilização para TimePicker
export const StyledTimePicker = styled(TimePicker)`
  border-radius: 4px;
`;

// Estilização para Select
export const StyledSelect = styled(Select)`
  width: 100%;
  .ant-select-selector {
    border-radius: 4px !important;
  }
`;

export const StyledPlanContainer = styled.div`
  width: 800px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2:first-of-type {
    color: #3f51b5;
  }

  button {
    margin-bottom: .8rem;
  }
  

  @media (max-width: 768px) { 
    width: 100%; 
    padding: 0 10px; 

    h2 {
      font-size: 14px;
    }

    h2:nth-child(1) {
      font-size: 20px;
    }

    h3 {
      font-size: 16px;
    }
  }

`;

export const StyledPlanCard = styled.div`
  width: 375px;
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

  button {
      width: 90%;
      height: 38px;
      margin-top: 1rem;
      color: var(--branco);
      background-color: var(--azul);
    }

    button:hover {
      color: var(--branco);
      background-color: var(--azul);
    }

  @media (max-width: 768px) { 
    width: 88%; 
    margin: .5rem 0; 
    padding: .5rem;

  }
`;

export const StyledTextCard = styled.p`
  text-align: center;
  color: #666666;
`;
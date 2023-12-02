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

// Adicione estilizações para outros componentes conforme necessário

import styled from 'styled-components';

export const StyledFormClient = styled.div`
 background-color: #f4f7fb;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 40rem; 
  margin: 8rem auto 2rem auto;

  .ant-form-vertical {
    margin: 3rem;
}
  .ant-form-item {
    margin-bottom: 16px; 
  }

  .ant-input,
  .ant-picker,
  .ant-select-selector {
    border-radius: 5px; 
    height: 40px; 
  }

  .ant-form-item-label > label {
    font-weight: bold; 
    font-size: 16px;
  }

  .ant-btn-primary {
    background-color: #4CAF50;
    border-color: #4CAF50;
    border-radius: 5px;
    font-weight: bold;
    height: 40px;
    width: 100%;
  }

  .ant-modal-content {
    border-radius: 10px; // Bordas arredondadas para o modal
  }

  .ant-modal-header {
    border-bottom: none; // Remove a borda inferior do cabeçalho do modal
  }

  .ant-modal-footer {
    border-top: none; // Remove a borda superior do rodapé do modal
  }

  @media (max-width: 768px) {
    padding: .2rem 0; // Reduz o preenchimento para telas menores
    max-width: 92%; // Ocupa toda a largura da tela

    .ant-form-vertical {
    margin: 1rem;
}
    .ant-input,
    .ant-picker,
    .ant-select-selector {
      height: 36px; // Reduz a altura dos inputs para economizar espaço
    }

    .ant-btn-primary {
      height: 36px;
    }
  }

`;

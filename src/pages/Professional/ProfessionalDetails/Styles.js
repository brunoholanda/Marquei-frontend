import { Card } from 'antd';
import styled from 'styled-components';

export const StyledPublicModalContato = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;

    input {
        width: 250px;
    }

    select {
        width: 250px;
    }
`;

export const StyledPublicPicture = styled.div`
  position: relative;
  width: 130px; // Ajuste para o tamanho desejado
  height: 130px; // Ajuste para o tamanho desejado
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #fff; // Cor da borda
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); // Sombra para dar profundidade

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .ant-upload {
    color: var(--branco);
  }
  .upload-btn {
    position: absolute;
    bottom: 5px; 
    right: 48px; 
    background: var(--azul);
    padding: 5px 10px;
    border-radius: 20px;
    cursor: pointer;
    
    &:hover {
      background: #4e68fc;
    }
  }
`;

export const StyledSubContainerPublic = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 1rem 0;

    input {
        width: 320px;
    }
`;

export const StyledCardLine = styled.div`
  display: grid;
  grid-template-columns: 30% 50% 20%;
  margin: 0;
`;

export const StyledCardLineModal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
`;


export const StyledCardEndereco = styled(Card)`
  margin-bottom: 1rem;
  width: 600px;

  p {
    font-size: 14px;
    color: var(--cinza-texto);
    margin-block-start: 0em;
    margin-block-end: .2em;
  }

  button {
    margin-top: 1rem;
  }

  @media (max-width: 768px) { 
    width: 350px;

    }
`;
import styled from 'styled-components';
import { Row, Col, Card } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

export const StyledBanner = styled.div`
  position: relative;
  margin: 5rem 0rem;
  padding: 4rem;
  text-align: center;
  background-color: #3f51b5; /* Cor de fundo como fallback */
  background-image: url(${props => props.backgroundImage});
  background-size: 15%;
  background-repeat: no-repeat;
  background-position: calc(100% - 50px) center; /* 50px é a margem que você quer da direita */
  color: #fff;

  h1, p {
    position: relative; /* Isso garante que o texto fique em cima da imagem de fundo */
    z-index: 2;
    color: #fff;

  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1; /* Isso garante que a sobreposição fique entre o texto e a imagem de fundo */
  }
  
@media (max-width: 768px) {
  padding: 1rem;

  h1 {
    font-size: 22px;
  }

  p {
    font-size: 14px;
  }
  
  }


  

`;

export const StyledContainer = styled.div`
  margin: 5rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin: 5rem 0rem;
  }

`;

export const StyledRow = styled(Row)`
  margin: 0 16px;
  display: flex;
  justify-content: center;
`;

export const StyledCol = styled(Col)`

  @media (max-width: 768px) {
    margin-bottom: 2px;
  }
  
  text-align: center;
  display: flex;
  justify-content: center;
`;

export const StyledCard = styled(Card)`
  transition: all 0.3s ease;
  width: 350px;
  height: 280px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }

  @media (max-width: 768px) {
    width: 330px;
  height: 270px;  }
`;
export const StyledIcon = styled(ClockCircleOutlined)`
  font-size: 50px;
  color: #3f51b5;
  margin-bottom: 16px;
`;

export const StyledTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 12px;
`;

export const StyledDescription = styled.p`
  color: rgba(0, 0, 0, 0.65);
`;


export const StyledTest = styled.div`
  margin: 5rem 0rem;
  padding: 2rem;
  text-align: center;
  background-color: #3f51b5;
  
  p {
    color: #fff;
    font-weight: bold;
  }

  button {
    background-color: #fff;
    color: #666666;
    font-weight: bold;
    width: 250px;
  }

  button:hover {
    background-color: #fff;
    color: #666666;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }

`;
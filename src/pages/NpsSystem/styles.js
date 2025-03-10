import { Form } from 'react-router-dom';
import styled from 'styled-components';

export const StyledResearchPage = styled.div`
    margin: 10rem 0;

    h2 {
        text-align: center;
    }

    .pesquisa-form {
        width: 600px;
        display: flex;
        flex-direction: column;
        margin: 5rem auto 1rem auto;
        background: #f7f7f7;
        padding: 3rem 5rem;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

    .ant-row .ant-form-item-row {
        display: flex;
        flex-direction: column !important;
    }

    .ant-col .ant-form-item-label {
        text-align: start !important;
    }
    
    }

    button {
        width: 100%;
    }

    @media (max-width: 768px) {
        h2 {
        font-size: 18px;
        margin: 0 1.5rem 2rem 1.5rem;
    }
    .ant-form-vertical {
        margin: 0 auto;
    }

    .pesquisa-form {
        justify-content: center;
        width: 360px;
        padding: 1rem 1rem;
    }
}
`;

export const StyledFormResearch = styled(Form)`
    width: 600px;
    display: flex;
    flex-direction: column;
    margin-right: 5rem;
    margin-top: 2rem;
    background: #f7f7f7;
    padding: 1.5rem 5rem;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

    .ant-row .ant-form-item-row {
        display: flex;
        flex-direction: column !important;
    }

    .ant-col .ant-form-item-label {
        text-align: start !important;
    }

    @media (max-width: 768px) { 
        justify-content: center;
        width: 350px;
        margin-right: 6rem;
        padding: 1rem 3rem;

    }
`;



export const StyledNpsPage = styled.div`
    margin: 3rem 3rem;
    display: flex;
        justify-content: center;
        flex-direction: column;


    @media (max-width: 768px) { 
        margin: 2rem 1rem;

    }
    
`;

export const RateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  @media (max-width: 768px) {
    align-items: center; 
  }
`;

export const RateWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-left: 5px;
  
`;

export const RateLabel = styled.span`
  padding-top: 4px;
  text-align: center;
  
`;

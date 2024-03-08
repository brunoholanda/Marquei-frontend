import { Form } from 'antd';
import styled from 'styled-components';

export const StyledContactPage = styled.div`
    margin: 10rem 3rem 1.5rem 3rem;
    text-align: center;

    h1 {
        color: var(--cinza-texto);
    }
    
    p {
        font-size: 18px;
        margin-bottom: 1rem;
    }

    @media (max-width: 768px) { 
        margin: 8rem 3rem 5rem 3rem;
    }
`;

export const StyledContactPageForms = styled.div`
    display: flex;
    justify-content: center;
    align-items: baseline;
    text-align: start;
    

    @media (max-width: 768px) { 
        flex-direction: column;
        align-items: center;
    }
`;


export const StyledFormContactPage =  styled(Form)`
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

export const StyledContactsPage = styled.div`

    h2 {
        margin-bottom: 2.5rem;
    }

    @media (max-width: 768px) { 
        flex-direction: column;
    }
`;


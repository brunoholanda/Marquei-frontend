import { Form } from 'antd';
import styled from 'styled-components';

export const StyledContactPage = styled.div`
    margin: 10rem 3rem 5rem 3rem;
    text-align: center;
    
    p {
        font-size: 18px;
    }

    @media (max-width: 768px) { 
        margin: 8rem 3rem 5rem 3rem;
    }
`;

export const StyledContactPageForms = styled.div`
    display: flex;
    justify-content: center;

    @media (max-width: 768px) { 
        flex-direction: column;
    }
`;


export const StyledFormContactPage = styled(Form.Item)`
    width: 500px;
    display: flex;
    flex-direction: column;
    margin-right: 5rem;

    .ant-row .ant-form-item-row {
        display: flex;
        flex-direction: column !important;
    }

    .ant-col .ant-form-item-label {
        text-align: start !important;
    }

    @media (max-width: 768px) { 
        justify-content: center;
        width: 280px;
        
    }
`;

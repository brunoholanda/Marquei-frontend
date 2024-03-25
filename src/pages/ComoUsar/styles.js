import styled from 'styled-components';

export const StyledHowUsePage = styled.div`
    margin: 10rem 3rem 1.5rem 3rem;

    @media (max-width: 768px) { 
        margin: 8rem 3rem 1.5rem 3rem;

    }
`;

export const StyledPageTitle = styled.div`
    text-align: center;


    @media (max-width: 768px) { 
    }
`;


export const StyledVideosContainer = styled.div`
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    

    @media (max-width: 768px) { 
        
    }
`;

export const StyledVideoCard = styled.div`
    text-align: center;
    margin: 0 2rem;
    
    @media (max-width: 768px) { 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        .videoframe {
        width: 300px;
        height: 170px;
    }
    }
`;






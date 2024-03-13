import styled from 'styled-components';

export const StyledEncontreContainer = styled.div`
    margin: 10rem 5rem;
    text-align: center;

    h2 {
        margin-bottom: 4rem;
    }
`;


export const StyledInputsEncontre = styled.div`
    display: flex;
    justify-content: center;
    align-items: last baseline;
    background: #f7f7f7;
    padding: 4rem 5rem;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

    .input-group {
        text-align: start;
    }

  input {
    width: 350px;
    height: 50px;
    margin-right: 1rem;
    margin-top: .5rem;
  }

  button {
    height: 50px;
    width: 200px;
    font-size: 20px;
  }
`;

export const StyledResultsBeforeSearch = styled.div`

`;

export const StyledResultBeforeSearch = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: #f7f7f7;
    padding: 4rem 5rem;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

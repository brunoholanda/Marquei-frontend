import styled from 'styled-components';

export const StyledEncontreContainer = styled.div`
    margin: 10rem auto;
    text-align: center;
    max-width: 1200px;
    width: 100%;
    padding: 0 2rem; 
`;

export const StyledInputsEncontre = styled.div`
    display: flex;
    justify-content: center;
    align-items: last baseline;
    background: #f7f7f7;
    padding: 4rem 5rem;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    margin: 4rem 2rem 2rem 2rem;
    
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

export const StyledDoctorsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;

    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
    }

    .doctors-card {
        width: 91%;
        padding: 20px;
        border: 1px solid #ccc;
        margin: .8rem 0;
        display: grid;
        grid-template-columns: 15% 50% 35%;
        align-items: center;
        max-width: 1200px;

        button {
          width: 180px;
          height: 50px;
          font-size: 16px;
        }
        
    }

    .doctors-infos {
        text-align: start;
        margin: 0 1.5rem;

        p {
            font-size: 15px;
            color: var(--cinza-texto);
            margin-bottom: .5rem;
        }
    }
`;

export const StyledPublicDetailPage = styled.div`
    margin: 15rem auto;
    text-align: center;
    max-width: 1200px;
    width: 100%;
    padding: 0 2rem; 

    .botaovoltar {
      display: flex;
      margin: 0 2rem;
      button {
        width: 200px;
        height: 40px;
      }
    }

    @media (max-width: 768px) { 
      padding: 0; 
    }
`;


export const StyledPublicDetaillCard = styled.div`
    display: grid;
    grid-template-columns: 15% 37% 37% 11%;
    justify-content: center;
    align-items: center;
    background: #f7f7f7;
    padding: 2rem 5rem;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    margin: 4rem 2rem 2rem 2rem;


       img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
    }

    .doctors-infos-card {
      text-align: start;
      margin: 0 1rem;

      p {
        margin: 10px 0 0 0;
      }

      button {
        margin: 10px 0 0 0;
      }
    }

    .doctors-infos-agendar {
      text-align: start;

      button {
        height: 50px;
      }
    }

    @media (max-width: 768px) { 
      display: flex;
      flex-direction: column;
      margin: 4rem 2rem 2rem 2rem;
      padding: 2rem 2rem;



        button {
          margin: 10px;
        }
      }

      .doctors-infos-card {
      text-align: center;
      margin: 0;
      
    }

      .doctors-infos-agendar {
        text-align: center;
        button {
          height: 50px;
        }
      }
      
`;
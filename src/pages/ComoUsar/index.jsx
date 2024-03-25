import { StyledHowUsePage, StyledPageTitle, StyledVideoCard, StyledVideosContainer } from "./styles";

export default function ComoUsar() {
    return (
        <StyledHowUsePage>
            <StyledPageTitle>
                <h2>Bem vindo ao MarqueiFlix!</h2>
                <p>Aqui você encontra tudo que você precisa em vídeos para aproveitar o máximo que o marquei pode oferecer ao seu negócio...</p>
            </StyledPageTitle>
            <StyledVideosContainer>
                <StyledVideoCard>
                    <h3>Fazendo o cadastro</h3>
                    <iframe
                        width="500"
                        height="280"
                        src="https://www.youtube.com/embed/cmyYynuO-1s?si=orLE8YnuDEsHjzYW"
                        frameborder="0"
                        allowfullscreen
                        title="Primeiro acesso ao Marquei"
                        className="videoframe"
                    ></iframe>
                </StyledVideoCard>
                <StyledVideoCard>
                    <h3>Cadastrando profissional e Agenda</h3>
                    <iframe
                        width="500"
                        height="280"
                        src="https://www.youtube.com/embed/kWwVLKAzyro?si=mUudpUj0CkMg5YMg"
                        frameborder="0"
                        allowfullscreen 
                        title="Cadastrando profissionais no marquei"
                        className="videoframe"
                    ></iframe>
                </StyledVideoCard>
            </StyledVideosContainer>
        </StyledHowUsePage>
    )
}

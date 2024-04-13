import React from 'react';
import { StyledHowUsePage, StyledPageTitle, StyledVideoCard, StyledVideosContainer } from "./styles";

const videos = [
    { title: "Apresentação", src: "https://www.youtube.com/embed/Iluc8UmJWuI?si=raj9owIk8cndtuby" },
    { title: "1- Fazendo o cadastro", src: "https://www.youtube.com/embed/cmyYynuO-1s?si=orLE8YnuDEsHjzYW" },
    { title: "2- Cadastrando profissional", src: "https://www.youtube.com/embed/kWwVLKAzyro?si=mUudpUj0CkMg5YMg" },
    { title: "3- Configurando Agenda", src: "https://www.youtube.com/embed/2iEKQknGgU0?si=7m59luxsXORsnQAd" },
    { title: "4- Navegando pelo calendário", src: "https://www.youtube.com/embed/G04B_0Lub2o?si=u4a_Ms35kNJ41Pgv" },
    { title: "5- Métricas da Clínica", src: "https://www.youtube.com/embed/6JH5PeVvTCA?si=Gb3rjxrpyXXRim_Z" },
    { title: "6- Medindo a satisfação dos pacientes", src: "https://www.youtube.com/embed/TwcPAvdCdPk?si=MvuGuNp_F8OqV7AY" },
    { title: "7- Emitindo atestados e declarações", src: "https://www.youtube.com/embed/uDi2RdShGk4?si=t2kVgTauCfnBEYiJ" },
    { title: "8- Contabilidade e Estoque da clínica", src: "https://www.youtube.com/embed/A4DtprhCXk8?si=YIr7gmwgxYljfWI8" }
];

export default function ComoUsar() {
    return (
        <StyledHowUsePage>
            <StyledPageTitle>
                <h2>Bem vindo ao MarqueiFlix!</h2>
                <p>Aqui você encontra tudo que você precisa em vídeos para aproveitar o máximo que o marquei pode oferecer ao seu negócio...</p>
            </StyledPageTitle>
            <StyledVideosContainer>
                {videos.map((video, index) => (
                    <StyledVideoCard key={index}>
                        <h3>{video.title}</h3>
                        <iframe
                            width="500"
                            height="280"
                            src={video.src}
                            allowFullScreen
                            title={video.title}
                            className="videoframe"
                        ></iframe>
                    </StyledVideoCard>
                ))}
            </StyledVideosContainer>
        </StyledHowUsePage>
    );
}

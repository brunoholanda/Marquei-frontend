import React, { useRef, useState } from 'react';
import styles from './Faq.module.scss';

const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const contentRef = useRef(new Array(items.length).fill(React.createRef())); // Uma referência para cada item de conteúdo

    const onTitleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const renderedItems = items.map((item, index) => {
        const isActive = index === activeIndex;
        const contentStyle = {
            maxHeight: isActive ? `${contentRef.current[index].current.scrollHeight}px` : "0px",
            padding: isActive ? "1.5rem" : "0"
        };

        return (
            <div key={item.title} className={styles.accordionItem}>
                <div
                    className={`${styles.title} ${isActive ? styles.activeTitle : ''}`}
                    onClick={() => onTitleClick(index)}
                >
                    <span className={styles.titleText}>{item.title}</span>
                    <span className={isActive ? styles.iconMinus : styles.iconPlus}>
                        {isActive ? '-' : '+'}
                    </span>
                </div>
                <div
                    className={styles.content}
                    style={contentStyle}
                    ref={contentRef.current[index]}
                >
                    {item.content}
                </div>
            </div>
        );
    });

    return <div className={styles.accordion}>{renderedItems}</div>;
};

const faqItems = [
    {
        title: 'Se eu testar e não quiser contratar, haverá multa ou taxas?',
        content: 'Experimente sem receio ! Não existe cobrança alguma se decidir que as soluções Marquei.com não atendem às suas necessidades após o período de avaliação. Ademais, iniciar seu teste não demanda a inclusão de um método de pagamento.',
    },
    {
        title: 'Marquei é um sistema exclusivo para médicos?',
        content: 'No momento o Marquei atende bem as demandas de medicos, dentistas e fisioterapeutas. Também estamos em constante transformação, isso significa que recebemos sugestões de melhorias e funcionalidades as quais analisamos e implantamos diariamente.',
    },
    {
        title: 'Como funciona o suporte?',
        content: 'Oferecemos suporte para todos os usuários via chamados na plataforma, e-mail e WhatsApp, com resposta em até 30 minutos. Nosso horário de atendimento é de segunda a sexta das 08h às 18h, exceto em feriados nacionais. ',
    },
    {
        title: 'Como contratar o Marquei.com?',
        content: 'Você pode assinar em qualquer momento durante ou ao final do seu teste clicando no botão “Assine agora” no sistema, ou, se preferir, você pode falar com um consultor e tirar suas dúvidas antes da contratação.',
    },
    {
        title: 'Como é realizado o treinamento para uso do sistema?',
        content: 'A plataforma é intuitiva e fácil de usar. Mas, mesmo assim, disponibilizamos vídeo treinamentos feitos por nosso time de especialistas que entende suas necessidades e visam garantir o maximo aproveitamento do sistema',
    },
    {
        title: 'Tem contrato de fidelidade?',
        content: 'Estamos livres de compromissos de longo prazo, refletindo nossa confiança no valor do serviço que fornecemos. O cancelamento está ao seu alcance sempre, contanto que não existam débitos em aberto. Qualquer dado ou informação no sistema pode ser requisitado e será fornecido com total segurança.',
    },
];

function Faq() {
    return (
        <div>
            <section className={styles.faq}>
                <Accordion items={faqItems} />
            </section>
        </div>
    );
}

export default Faq;

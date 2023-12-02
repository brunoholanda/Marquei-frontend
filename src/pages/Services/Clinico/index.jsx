import styles from './Clinico.module.scss';
import fluor from '../../../public/fluor.jpg';
import polimento from '../../../public/polimento.jpg';
import limpeza from '../../../public/checkup.jpg';
import crianca from '../../../public/crianca.jpg';
import restauracao from '../../../public/restauracao.jpg';
import Convenios from 'components/Convenios';
import { Helmet } from 'react-helmet';
export default function Clinico() {
    return (
        <section>
            <Fluor />
            <Limpeza />
            <Polimento />
            <Crianca />
            <Restauracao />
            <Convenios />
        </section>
    )
}

function Fluor() {
    const serviceData = {
        "@context": "http://schema.org",
        "@type": "Product",
        "name": "Aplicação tópica de flúor",
        "image": "URL da imagem do serviço",
        "description": "A aplicação tópica de flúor é um tratamento eficaz que fortalece os dentes e combate a cárie. Ao aplicar diretamente um produto fluoretado nos dentes, o esmalte se fortalece e se torna mais resistente à decomposição. É uma maneira simples e rápida de proporcionar proteção extra ao seu sorriso, especialmente útil para aqueles propensos a cáries ou que consomem muitos açúcares.",
        "brand": "Waleska Caetano Dentista",
        "offers": {
            "@type": "Offer",
            "priceCurrency": "BRL",
            "price": "Preço do serviço"
        }
    };

    return (
        <section className={styles.clinico}>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(serviceData)}
                </script>
            </Helmet>
            <div>
                <h2>Aplicação tópica de flúor</h2>
                <img src={fluor} alt="Aplicação tópica de flúor em joao pessoa" />
            </div>
            <div className={styles.clinico__texto}>
                <p>A aplicação tópica de flúor é um tratamento eficaz que fortalece os dentes e combate a cárie. Ao aplicar diretamente um produto fluoretado nos dentes, o esmalte se fortalece e se torna mais resistente à decomposição. É uma maneira simples e rápida de proporcionar proteção extra ao seu sorriso, especialmente útil para aqueles propensos a cáries ou que consomem muitos açúcares.</p>
            </div>
        </section>
    )
}

function Limpeza() {
    const serviceData = {
        "@context": "http://schema.org",
        "@type": "Product",
        "name": "Profilaxia - Limpeza Dental",
        "image": "URL da imagem do serviço",
        "description": "A profilaxia, ou limpeza dental, é um procedimento preventivo essencial que mantém seus dentes e gengivas saudáveis. Realizada por um profissional, envolve a remoção de tártaro e placa bacteriana que a escovação diária não consegue alcançar, evitando problemas como cárie e doença gengival. Imagine desfrutar de uma sensação de limpeza e frescor em sua boca, além de um sorriso mais brilhante e saudável, tudo graças a essa simples e eficaz rotina de cuidado dental.",
        "brand": "Waleska Caetano Dentista",
        "offers": {
            "@type": "Offer",
            "priceCurrency": "BRL",
            "price": "Preço do serviço"
        }
    };
    return (
        <section className={styles.clinico}>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(serviceData)}
                </script>
            </Helmet>
            <div>
                <h2>Profilaxia - Limpeza Dental</h2>
                <img src={limpeza} alt="Limpeza dos dentes em joao pessoa" />
            </div>
            <div className={styles.clinico__texto}>
                <p>A profilaxia, ou limpeza dental, é um procedimento preventivo essencial que mantém seus dentes e gengivas saudáveis. Realizada por um profissional, envolve a remoção de tártaro e placa bacteriana que a escovação diária não consegue alcançar, evitando problemas como cárie e doença gengival. Imagine desfrutar de uma sensação de limpeza e frescor em sua boca, além de um sorriso mais brilhante e saudável, tudo graças a essa simples e eficaz rotina de cuidado dental.</p>
            </div>
        </section>
    )
}

function Polimento() {
    const serviceData = {
        "@context": "http://schema.org",
        "@type": "Product",
        "name": "Polimento Dentário",
        "image": "URL da imagem do serviço",
        "description": "O polimento dentário é um procedimento que aprimora a estética do seu sorriso, deixando seus dentes mais lisos e brilhantes. Após uma limpeza, é utilizada uma pasta especial para remover manchas superficiais e prevenir a acumulação de placa, garantindo um sorriso mais luminoso e uma sensação de limpeza intensa.",
        "brand": "Waleska Caetano Dentista",
        "offers": {
            "@type": "Offer",
            "priceCurrency": "BRL",
            "price": "Preço do serviço"
        }
    };
    return (
        <section className={styles.clinico}>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(serviceData)}
                </script>
            </Helmet>
            <div>
                <h2>Polimento Dentário</h2>
                <img src={polimento} alt="Polimento Dentário em joao pessoa" />
            </div>
            <div className={styles.clinico__texto}>
                <p>O polimento dentário é um procedimento que aprimora a estética do seu sorriso, deixando seus dentes mais lisos e brilhantes. Após uma limpeza, é utilizada uma pasta especial para remover manchas superficiais e prevenir a acumulação de placa, garantindo um sorriso mais luminoso e uma sensação de limpeza intensa.</p>
            </div>
        </section>
    )
}

function Crianca() {
    const serviceData = {
        "@context": "http://schema.org",
        "@type": "Product",
        "name": "Odontopediatria - Dentística em crianças",
        "image": "URL da imagem do serviço",
        "description": "A odontopediatria é a área da odontologia dedicada à saúde bucal das crianças. Ela engloba a prevenção, diagnóstico e tratamento de problemas dentários desde a infância até a adolescência. Com abordagens gentis e acolhedoras, os odontopediatras garantem que as visitas ao dentista sejam experiências positivas, contribuindo para a formação de bons hábitos de higiene bucal. Imagine a tranquilidade de saber que seu filho está crescendo com um sorriso saudável e o conforto de uma boa saúde bucal desde cedo.",
        "brand": "Waleska Caetano Dentista",
        "offers": {
            "@type": "Offer",
            "priceCurrency": "BRL",
            "price": "Preço do serviço"
        }
    };
    return (
        <section className={styles.clinico}>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(serviceData)}
                </script>
            </Helmet>
            <div>
                <h2>Odontopediatria - Dentística em crianças</h2>
                <img src={crianca} alt="Dentística para crianças em joao pessoa" />
            </div>
            <div className={styles.clinico__texto}>
                <p>A odontopediatria é a área da odontologia dedicada à saúde bucal das crianças. Ela engloba a prevenção, diagnóstico e tratamento de problemas dentários desde a infância até a adolescência. Com abordagens gentis e acolhedoras, os odontopediatras garantem que as visitas ao dentista sejam experiências positivas, contribuindo para a formação de bons hábitos de higiene bucal. Imagine a tranquilidade de saber que seu filho está crescendo com um sorriso saudável e o conforto de uma boa saúde bucal desde cedo.</p>
            </div>
        </section>
    )
}

function Restauracao() {
    const serviceData = {
        "@context": "http://schema.org",
        "@type": "Product",
        "name": "Restauração Estética",
        "image": "URL da imagem do serviço",
        "description": "A restauração estética é um procedimento dentário que visa melhorar a aparência dos seus dentes, enquanto restaura a função e a saúde bucal. Utilizando materiais modernos, como resinas compostas e porcelanas, dentes quebrados, desgastados, manchados ou com cáries podem ser restaurados para um visual natural e atraente. Imagine recuperar a confiança em seu sorriso e a funcionalidade dos seus dentes com um procedimento simples, transformando a sua autoestima e bem-estar.",
        "brand": "Waleska Caetano Dentista",
        "offers": {
            "@type": "Offer",
            "priceCurrency": "BRL",
            "price": "Preço do serviço"
        }
    };
    return (
        <section className={styles.clinico}>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(serviceData)}
                </script>
            </Helmet>
            <div>
                <h2>Restauração Estética</h2>
                <img src={restauracao} alt="Restauração do dente em joao pessoa" />
            </div>
            <div className={styles.clinico__texto}>
                <p>A restauração estética é um procedimento dentário que visa melhorar a aparência dos seus dentes, enquanto restaura a função e a saúde bucal. Utilizando materiais modernos, como resinas compostas e porcelanas, dentes quebrados, desgastados, manchados ou com cáries podem ser restaurados para um visual natural e atraente. Imagine recuperar a confiança em seu sorriso e a funcionalidade dos seus dentes com um procedimento simples, transformando a sua autoestima e bem-estar.</p>
            </div>
        </section>
    )
}
import styles from './Protese.module.scss';
import protese from '../../../public/protese.jpg';
import Convenios from 'components/Convenios';

export default function Protese() {
    return (
        <section>
            <Elemento />
            <Convenios />
        </section>
    )
}


function Elemento() {
    return (
        <section className={styles.protese}>
            <div>
            <h2>Protese Total, Parcial e Fixa</h2>
                <img src={protese} alt="protese dentaria em joao pessoa" />
            </div>
            <div className={styles.protese__texto}>
                <p>A prótese total parcial fixa, também conhecida como ponte fixa, é um tratamento dentário que ajuda a substituir dentes perdidos, melhorando a estética e a funcionalidade do seu sorriso. É uma solução estável e duradoura, que oferece um conforto semelhante ao dos dentes naturais.</p>
                <p>Este tipo de prótese é fixado permanentemente na boca por meio de coroas que são colocadas nos dentes naturais ou em implantes ao lado do espaço vazio, proporcionando uma sensação mais natural e a segurança de uma prótese que não se move. Esta solução pode ser particularmente útil para quem perdeu um ou mais dentes, mas ainda tem dentes saudáveis remanescentes que podem servir de apoio para a prótese.</p>
                <p>Imagine ter a liberdade de comer seus alimentos favoritos e sorrir sem preocupações, sem ter que lidar com próteses removíveis. A prótese total parcial fixa não apenas repõe os dentes perdidos, mas também traz de volta a confiança e a alegria de um belo sorriso, melhorando significativamente a sua qualidade de vida.</p>
            </div>
        </section>
    )
}
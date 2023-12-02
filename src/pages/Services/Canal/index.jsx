import styles from './Canal.module.scss';
import canal from '../../../public/canal.jpg';
import Convenios from 'components/Convenios';

export default function Canal() {
    return (
        <section>
            <Endodontia />
            <Convenios />
        </section>
    )
}


function Endodontia() {
    return (
        <section className={styles.canal}>
            <div>
            <h2>Tratamento de Canal - Endodontia</h2>
                <img src={canal} alt="tratamento de canal em joao pessoa" />
            </div>
            <div className={styles.canal__texto}>
                <p>O tratamento de canal, também conhecido como endodontia, é um procedimento comum, porém poderoso, que salva e preserva dentes que foram danificados por cárie profunda, doença das gengivas ou trauma. O processo envolve a remoção da polpa danificada do dente - a parte interna que contém nervos e vasos sanguíneos - e a posterior limpeza, desinfecção e preenchimento do espaço vazio com material especial.</p>
                <p>O tratamento é realizado sob anestesia, o que significa que você não sentirá dor durante o procedimento. Após a recuperação, você terá um dente que parece e funciona como um dente normal, mas sem a dor e desconforto que pode estar associado a um dente danificado.</p>
                <p>O tratamento de canal é uma maneira eficaz de manter a saúde bucal, evitando a extração do dente danificado. Pense na possibilidade de se livrar da dor de dente e ainda manter o seu dente natural. É uma intervenção que não apenas resolve problemas de saúde oral, mas também melhora a qualidade de vida, permitindo-lhe comer, falar e sorrir com confiança e sem dor.</p>
            </div>
        </section>
    )
}
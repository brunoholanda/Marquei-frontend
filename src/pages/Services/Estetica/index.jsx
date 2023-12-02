import styles from './Estetica.module.scss';
import clareamento from '../../../public/carrossel/clarear-02.webp';
import resina from '../../../public/estetica/resina.jpg';
import Convenios from 'components/Convenios';
export default function Estetica() {
    return (
        <section>
            <Clareamento />
            <Resina />
            <Convenios />
        </section>
    )
}

function Clareamento() {
    return (
        <section className={styles.estetica}>
            <div>
            <h2>Clareamento Dental</h2>
                <img src={clareamento} alt="clareamento dental em joao pessoa" />
            </div>
            <div className={styles.estetica__clareamento}>
                <p>O clareamento dental é um procedimento maravilhoso que pode trazer de volta o brilho do seu sorriso. É um tratamento que usa produtos especiais para eliminar manchas e amarelados que se acumulam nos dentes com o tempo, tornando-os mais brancos e brilhantes.</p>
                <p>Existem duas opções principais: você pode fazer o clareamento no consultório do dentista, onde um laser especial é usado para maximizar o efeito do produto clareador, geralmente em duas sessões. Alternativamente, você pode fazer o tratamento caseiro, que envolve o uso de placas de clareamento com um gel especial, que você coloca nos dentes por algumas horas todos os dias por cerca de dois meses.</p>
                <p>Ambos os métodos são eficazes, mas é importante lembrar que eles devem ser sempre supervisionados por um dentista para garantir a sua segurança. Imagine o quanto seu sorriso poderia brilhar após esse procedimento. Pense em como seria bom sentir-se mais confiante e feliz ao sorrir. É uma grande oportunidade para realçar a beleza natural do seu sorriso!</p>
            </div>
        </section>
    )
}

function Resina() {
    return (
        <section className={styles.resina}>
            <div className={styles.resina__resina}>
                <p>Facetas dentárias, sejam de resina ou porcelana, são finas "capas" colocadas sobre os dentes para aprimorar o sorriso. Elas solucionam diversos problemas estéticos, como dentes descoloridos, desalinhados, quebrados ou com espaços.</p>
                <p>As facetas de resina são moldadas diretamente na boca do paciente, permitindo a correção de imperfeições rapidamente, com menos desgaste do dente e a um custo mais acessível. Já as facetas de porcelana, feitas em laboratório a partir de um molde dental, são mais resistentes a manchas e desgastes, proporcionando um aspecto mais natural.</p>
                <p>Ambas as opções podem transformar drasticamente o sorriso, oferecendo dentes alinhados e brancos, sem manchas ou rachaduras. Isso pode proporcionar uma confiança renovada ao sorrir, impactando positivamente na autoestima e na percepção que outros têm de você.</p>
            </div>
            <div>
            <h2>Facetas Em Resina e Porcelana</h2>
                <img src={resina} alt="facetas dentarias de resina ou porcelana em joao pessoa" />
            </div>
        </section>
    )
}
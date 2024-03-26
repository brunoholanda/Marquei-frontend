import styles from './NotFound.module.scss';
import erro403 from '../../public/proibido.png';
import { useNavigate } from 'react-router-dom';
import Btn from 'components/Btn';

export default function Forbidden() {

    const navegar = useNavigate ();

    return (
        <section className={styles.erro}>
            <img src={erro403} alt="imagem da pagina de erro" />
            <div>
                <h1>Ops... Você não tem acesso ao profissional de outra empresa... Clique em voltar!</h1>
                <p>O marquei se preocupa com seus dados !</p>
                <div  onClick={() => navegar('/configs')}>
                    <Btn>VOLTAR</Btn>
                </div>
            </div>
        </section>
    )
}

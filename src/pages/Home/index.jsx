import React, { Suspense, lazy } from 'react';
import styles from './Home.module.scss';

import Btn from 'components/Btn';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import ContentHome from './Content';

const Carousel = lazy(() => import('components/PageBody/Carousel'));
const PlanCard = lazy(() => import('components/SelerCads'));
const Faq = lazy(() => import('components/Faq'));

function Home() {

  return (
    <>
      <div>
        <div className={styles.carouselHome}>
          <Suspense fallback={<Loading />}>
            <Carousel />
          </Suspense >
        </div>
        <Suspense fallback={<Loading />}>
          <ContentHome />
        </Suspense >
        <section className={styles.planos}>
          <h2>Temos o plano certo para você !</h2>
          <div className={styles.cards}>
            <Suspense fallback={<Loading />}>
              <PlanCard />
            </Suspense >
          </div>
          <Link to="/cadastro">
            <Btn>Experimente grátis</Btn>
          </Link>
        </section>
      </div >
      <section className={styles.faq}>
        <h2>Confira nossas perguntas frequentes ...</h2>
        <Suspense fallback={<Loading />}>
          <Faq />
        </Suspense >
      </section>
    </>
  );
}

export default Home;

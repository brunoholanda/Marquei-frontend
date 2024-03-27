import React from 'react';
import Faq from 'components/Faq';
import ComoUsar from 'pages/ComoUsar';
import { StyledHelpPageContent } from './styles';
import ContactPage from 'pages/ContactPage';

function HelpCenter() {
  return (
    <StyledHelpPageContent>
      <section>
        <h2 style={{ textAlign: 'center' }}>Perguntas frequentes</h2>
        <Faq />
      </section>
      <section>
        <ComoUsar />
      </section>
      <section>
        <h2 style={{ textAlign: 'center' }}>Não encontrou o que precisava?</h2>
      <ContactPage />
      </section>
    </StyledHelpPageContent>
  );
}

export default HelpCenter;

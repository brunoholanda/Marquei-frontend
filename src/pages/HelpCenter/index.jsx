import React from 'react';

import Faq from 'components/Faq';


function HelpCenter() {
  return (
    <div>
      <section>
        <h2 style={{textAlign: 'center', marginTop: '2rem'}}>Perguntas frequentes</h2>
        <Faq />
      </section>
    </div>
  );
}

export default HelpCenter;

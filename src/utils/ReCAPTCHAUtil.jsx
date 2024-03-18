// ReCAPTCHAUtil.js
import React, { forwardRef, useImperativeHandle } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const ReCAPTCHAUtil = forwardRef(({ onChange }, ref) => {
  const recaptchaRef = React.createRef();

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    },
  }));

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey="6LdQaYcpAAAAAHaX_ZIhgaOTN0olO9KyoijpMNTH"
      onChange={onChange}
    />
  );
});

export default ReCAPTCHAUtil;

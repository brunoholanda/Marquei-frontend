import React, { useEffect, useRef, useState } from 'react';

const LazyLoad = ({ children, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentElement); // Desassocia o observador se necessário
        }
      });
    }, { rootMargin: "0px", threshold: 0.1 }); // Ajuste conforme necessário

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return <div ref={domRef}>{isVisible ? children : placeholder}</div>;

};

export default LazyLoad;

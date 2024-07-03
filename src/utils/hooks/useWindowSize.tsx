import {useEffect, useState} from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    platform: 'mweb',
    width: 0,
    height: 0,
    isMobile: false,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= 880,
        platform: window.innerWidth <= 880 ? 'mweb' : 'web',
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
import { useState, useEffect } from 'react';

const useMobileHook = () : boolean => {
  const mobileBreakpoint = 599;
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < mobileBreakpoint);

  const handleResize = () => {
    setIsMobile(window.innerWidth < mobileBreakpoint);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};

export default useMobileHook;

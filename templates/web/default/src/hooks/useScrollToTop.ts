import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useScrollToTop() {
  // Get current path location
  const { pathname, search } = useLocation();

  // Scroll to top when the path changes
  useEffect(() => {
    const screen = document.getElementById('root');
    if (screen) {
      screen.scrollIntoView();
    }
  }, [pathname, search]);
}

export default useScrollToTop;

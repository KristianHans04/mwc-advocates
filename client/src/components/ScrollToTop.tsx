import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component to handle scroll behavior:
 * - Scrolls to top when navigating to a new page via links
 * - Preserves scroll position on page refresh
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    // Don't scroll if there's a hash (anchor link)
    if (hash) return;

    // Check if pathname actually changed (not just a refresh)
    if (prevPathname.current !== null && prevPathname.current !== pathname) {
      // This is a navigation to a different page, scroll to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior
      });
    }
    
    // Update previous pathname
    prevPathname.current = pathname;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
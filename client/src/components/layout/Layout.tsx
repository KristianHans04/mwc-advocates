  /**
 * Layout component for MWC Advocates
 * Provides consistent structure with header and footer for all pages
 * Excludes footer on home page to showcase 'Get in Touch Today' section
 */

import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
};

export default Layout;

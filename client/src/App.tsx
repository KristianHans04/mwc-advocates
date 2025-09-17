/**
 * Main App component for MWC Advocates
 * Sets up routing and global providers
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/ScrollToTop';
import apiService from './services/api';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Insights from './pages/Insights';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';

function App() {
  // Wake up the backend server on app load
  useEffect(() => {
    apiService.healthCheck().then(isHealthy => {
      console.log(isHealthy ? '✅ Backend is ready' : '⏳ Backend is starting up...');
    });
  }, []);

  // Enable browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto';
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          
          {/* Fallback route */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center pt-16">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                <a 
                  href="/" 
                  className="inline-flex items-center px-6 py-3 bg-[var(--color-primary-green)] text-white font-semibold rounded-lg hover:bg-opacity-90 transition duration-300"
                >
                  Go Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

import React, { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import ExamplesSection from './components/ExamplesSection';
import SignupSection from './components/SignupSection';
import Footer from './components/Footer';
import { initMetaPixel, trackPageView, trackViewContent } from './lib/analytics';
import { config } from './lib/config';
import { useLocation } from 'react-router-dom';
import { SignupProvider } from './components/SignupContext';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Add smooth scrolling behavior with enhanced easing
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize Meta Pixel if enabled
    if (config.enableMetaPixel) {
      initMetaPixel(config.metaPixelId);
      
      // Track initial page view
      trackPageView();
      
      // Track when user views the main content
      trackViewContent('Landing Page', 'Homepage');
    }
    
    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    // Fire Meta Pixel PageView on every route change
    if (config.enableMetaPixel) {
      trackPageView();
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <SignupProvider>
        <HeroSection />
        <HowItWorksSection />
        <ExamplesSection />
        <SignupSection />
      </SignupProvider>
      <Footer />
      {config.enableVercelAnalytics && <Analytics />}
    </div>
  );
}

export default App;
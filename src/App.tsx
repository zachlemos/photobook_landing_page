import React, { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import ExamplesSection from './components/ExamplesSection';
import SignupSection from './components/SignupSection';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Add smooth scrolling behavior with enhanced easing
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <ExamplesSection />
      <SignupSection />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
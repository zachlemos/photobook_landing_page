import React, { useEffect, useState } from 'react';
import { track } from '@vercel/analytics';
import SignupForm from './SignupForm';
import SignupModal from './SignupModal';

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Track hero section view
    track('hero_viewed');

    return () => clearTimeout(timer);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('how-it-works');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
    
    // Track scroll interaction
    track('hero_scroll_to_section', {
      section: 'how_it_works'
    });
  };

  return (
    <section className="min-h-screen bg-charcoal text-off-white flex flex-col items-center justify-center relative px-6 overflow-hidden">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className={`font-playfair text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 opacity-0 ${
          isLoaded ? 'animate-hero-fade-in' : ''
        }`}>
          Turn your favorite family photos into{' '}
          <span className="bg-gradient-accent bg-clip-text text-transparent">
            magical coloring books
          </span>
        </h1>
        
        <p className={`font-inter text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed opacity-0 ${
          isLoaded ? 'animate-hero-fade-in-delayed' : ''
        }`}>
          Upload your memories. We'll turn them into a custom coloring book your child will love.
        </p>
        
        {/* CTA Buttons - horizontal row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
          <button 
            onClick={() => {
              track('hero_join_waitlist_clicked', { location: 'top' });
              setShowModal(true);
            }}
            className={`bg-gradient-accent hover:bg-gradient-accent-hover text-charcoal font-inter font-semibold px-8 py-4 rounded-full text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl opacity-0 ${
              isLoaded ? 'animate-hero-fade-in-more-delayed' : ''
            }`}
          >
            Join the waitlist
          </button>
          <button
            onClick={scrollToNextSection}
            className={`bg-white/10 border border-white/20 text-off-white font-inter font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:bg-white/20 hover:text-white opacity-0 ${
              isLoaded ? 'animate-hero-fade-in-more-delayed' : ''
            }`}
          >
            Learn More
          </button>
        </div>
        
        <div className={`mt-6 opacity-0 ${isLoaded ? 'animate-hero-fade-in-more-delayed' : ''}`}>
          <p className="text-off-white/60 font-inter text-sm md:text-base">
            Limited early invites. We're starting with just 50 spots
          </p>
        </div>
      </div>
      
      <SignupModal open={showModal} onClose={() => setShowModal(false)}>
        <SignupForm location="top" showFamiliesJoined={true} />
      </SignupModal>
    </section>
  );
};

export default HeroSection;
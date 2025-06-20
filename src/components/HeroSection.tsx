import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('how-it-works');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-charcoal text-off-white flex flex-col items-center justify-center relative px-6 overflow-hidden">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className={`font-playfair text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 opacity-0 ${
          isLoaded ? 'animate-hero-fade-in' : ''
        }`}>
          Turn your favorite family photos into{' '}
          <span className="bg-gradient-accent bg-clip-text text-transparent">
            magical coloring pages
          </span>
        </h1>
        
        <p className={`font-inter text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed opacity-0 ${
          isLoaded ? 'animate-hero-fade-in-delayed' : ''
        }`}>
          Upload a memory. We'll turn it into a printable or shippable coloring page 
          your child will love.
        </p>
        
        <button 
          onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
          className={`bg-gradient-accent hover:bg-gradient-accent-hover text-charcoal font-inter font-semibold px-8 py-4 rounded-full text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl opacity-0 ${
            isLoaded ? 'animate-hero-fade-in-more-delayed' : ''
          }`}
        >
          Join the waitlist — bring your memories to life
        </button>
      </div>
      
      <div 
        className={`absolute bottom-8 cursor-pointer opacity-0 ${
          isLoaded ? 'animate-hero-fade-in-more-delayed animate-float-gentle' : ''
        }`}
        onClick={scrollToNextSection}
      >
        <ChevronDown className="w-8 h-8 text-gray-400 hover:text-off-white transition-colors duration-500" />
      </div>
    </section>
  );
};

export default HeroSection;
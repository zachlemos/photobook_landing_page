import React, { useEffect, useRef, useState } from 'react';
import { Heart, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <footer ref={sectionRef} className="py-12 bg-cream border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className={`flex items-center justify-center mb-6 opacity-0 ${
          isVisible ? 'animate-scroll-fade-up' : ''
        }`}>
          <Heart className="w-5 h-5 text-pink-400 mr-2" />
          <p className="font-inter text-charcoal font-medium">
            Created by parents, for parents
          </p>
        </div>
        
        <div className={`flex items-center justify-center mb-8 opacity-0 ${
          isVisible ? 'animate-scroll-fade-up-delayed' : ''
        }`}>
          <MapPin className="w-4 h-4 text-gray-500 mr-2" />
          <p className="font-inter text-gray-600 text-sm">
            Built with love by a small team in Portland, Oregon
          </p>
        </div>
        
        <div className={`bg-white rounded-lg p-6 max-w-xl mx-auto shadow-sm transform transition-all duration-700 hover:scale-105 hover:shadow-md opacity-0 ${
          isVisible ? 'animate-scroll-fade-up-more-delayed' : ''
        }`}>
          <p className="font-inter text-gray-700 italic text-sm leading-relaxed">
            "My daughter squealed when she saw herself as a coloring page! 
            It's like magic seeing her favorite memories come to life in a way she can create with."
          </p>
          <p className="font-inter text-gray-500 text-xs mt-3">
            — Sarah, Mom of 2
          </p>
        </div>
        
        <div className={`mt-8 pt-6 border-t border-gray-200 opacity-0 ${
          isVisible ? 'animate-scroll-fade-up-more-delayed' : ''
        }`}>
          <p className="font-inter text-gray-500 text-sm">
            © 2025 ColorMagic. Turning memories into magic, one coloring page at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
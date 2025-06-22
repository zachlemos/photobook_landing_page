import React, { useState, useEffect, useRef } from 'react';
import SplitViewCard from './SplitViewCard';

const ExamplesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateCard, setAnimateCard] = useState([false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
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

  useEffect(() => {
    if (isVisible) {
      const staggerDelay = 667; // Corresponds to 2/3 of the 1s animation returning to the top
      const timeouts = [
        setTimeout(() => setAnimateCard(prev => [true, prev[1], prev[2]]), 0),
        setTimeout(() => setAnimateCard(prev => [prev[0], true, prev[2]]), staggerDelay),
        setTimeout(() => setAnimateCard(prev => [prev[0], prev[1], true]), staggerDelay * 2),
      ];

      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
  }, [isVisible]);

  const examples = [
    {
      title: "Turn birthday chaos into crayon magic",
      originalImage: "/images/family-photo-1.jpeg",
      coloredImage: "/images/family-photo-1-after.png",
      description: "Capture the love, laughter, and frosting"
    },
    {
      title: "From snapshot to keepsake",
      originalImage: "/images/grandmother-baby-before.jpeg",
      coloredImage: "/images/grandmother-baby-after.png",
      description: "Transform generations of love into something little hands can color"
    },
    {
      title: "The bump, the bestie, the memory",
      originalImage: "/images/two-friends-before.jpeg",
      coloredImage: "/images/two-friends-after.jpeg",
      description: "Freeze this sweet chapter in a playful page"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-soft-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`font-playfair text-3xl md:text-5xl font-bold text-charcoal mb-6 opacity-0 ${
            isVisible ? 'animate-scroll-fade-up' : ''
          }`}>
            More Examples
          </h2>
          <p className={`font-inter text-lg text-gray-600 max-w-2xl mx-auto opacity-0 ${
            isVisible ? 'animate-scroll-fade-up-delayed' : ''
          }`}>
            See how we transform different types of family moments into beautiful coloring experiences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <div
              key={index}
              className={`opacity-0 ${isVisible ? 'animate-scroll-fade-up' : ''}`}
              style={{ 
                animationDelay: isVisible ? `${0.3 + index * 0.15}s` : '0s',
                animationFillMode: 'forwards'
              }}
            >
              <SplitViewCard
                title={example.title}
                description={example.description}
                originalImage={example.originalImage}
                coloredImage={example.coloredImage}
                shouldAnimate={animateCard[index]}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExamplesSection;
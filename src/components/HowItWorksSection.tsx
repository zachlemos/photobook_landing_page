import React, { useEffect, useRef, useState } from 'react';
import { Upload, Paintbrush, Package } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
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

  const steps = [
    {
      icon: Upload,
      title: "Upload your photo",
      description: "Pick a memory your child loves — birthdays, pets, holidays."
    },
    {
      icon: Paintbrush,
      title: "We turn it into a coloring page",
      description: "Hand-drawn style, designed for little hands."
    },
    {
      icon: Package,
      title: "Delivered to you",
      description: "Get a printable PDF or order a shippable book."
    }
  ];

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Before/After Module */}
        <div className="text-center mb-16">
          <h2 className={`font-playfair text-3xl md:text-5xl font-bold text-charcoal mb-8 opacity-0 ${
            isVisible ? 'animate-scroll-fade-up' : ''
          }`}>
            How It Works
          </h2>
          
          <div className={`bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto opacity-0 ${
            isVisible ? 'animate-scroll-fade-up-delayed' : ''
          }`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <h3 className="font-inter font-semibold text-lg text-charcoal mb-4">Your Family Photo</h3>
                <div className="bg-gradient-to-br from-pink-100 to-yellow-100 rounded-lg p-4 aspect-[3/4] w-3/4 mx-auto flex items-center justify-center transform transition-all duration-700 hover:scale-105 hover:shadow-xl">
                  <img 
                    src="/images/fourth-july-before.jpeg"
                    alt="Family photo for coloring page"
                    className="rounded-lg shadow-md w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-inter font-semibold text-lg text-charcoal mb-4">Your Custom Coloring Page</h3>
                <div className="bg-gradient-to-br from-pink-100 to-yellow-100 rounded-lg p-4 aspect-[3/4] w-3/4 mx-auto flex items-center justify-center transform transition-all duration-700 hover:scale-105 hover:shadow-xl">
                  <img 
                    src="/images/fourth-july-after.png"
                    alt="Coloring page created from family photo"
                    className="rounded-lg shadow-md w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`text-center p-6 opacity-0 ${
                isVisible ? 'animate-scroll-fade-up' : ''
              }`}
              style={{ 
                animationDelay: isVisible ? `${0.4 + index * 0.15}s` : '0s',
                animationFillMode: 'forwards'
              }}
            >
              <div className="bg-gradient-accent rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 transform transition-all duration-500 hover:scale-110 hover:shadow-lg">
                <step.icon className="w-10 h-10 text-charcoal" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
                {step.title}
              </h3>
              <p className="font-inter text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
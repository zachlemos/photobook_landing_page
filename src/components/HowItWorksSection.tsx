import React, { useEffect, useRef, useState } from 'react';
import { Upload, Package, Mail } from 'lucide-react';

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
      icon: Mail,
      title: "Upload",
      description: "Pick a memory your child loves — birthdays, pets, holidays."
    },
    {
      icon: Upload,
      title: "Transform",
      description: "We turn your photo into a hand-drawn coloring page, made for little hands."
    },
    {
      icon: Package,
      title: "Deliver",
      description: "Your custom coloring book arrives at your door."
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
                <div className="bg-gradient-to-br from-pink-100 to-yellow-100 rounded-lg p-4 aspect-[3/4] w-full max-w-xs sm:w-3/4 mx-auto flex items-center justify-center transform transition-all duration-700 hover:scale-105 hover:shadow-xl">
                  <img 
                    src="/images/fourth-july-before.jpeg"
                    alt="Family photo for coloring page"
                    className="rounded-lg shadow-md w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-inter font-semibold text-lg text-charcoal mb-4">Your Custom Coloring Page</h3>
                <div className="bg-gradient-to-br from-pink-100 to-yellow-100 rounded-lg p-4 aspect-[3/4] w-full max-w-xs sm:w-3/4 mx-auto flex items-center justify-center transform transition-all duration-700 hover:scale-105 hover:shadow-xl">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-12 gap-y-10 text-center">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`p-4 sm:p-6 opacity-0 ${
                isVisible ? 'animate-scroll-fade-up' : ''
              }`}
              style={{ 
                animationDelay: isVisible ? `${0.4 + index * 0.15}s` : '0s',
                animationFillMode: 'forwards'
              }}
            >
              <div className="bg-gradient-accent rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105">
                <step.icon className="w-10 h-10 text-charcoal" strokeWidth={2.2} />
              </div>
              <h3 className="font-playfair font-bold text-2xl text-charcoal mt-2 mb-2">
                {step.title}
              </h3>
              <p className="text-base sm:text-sm text-gray-600 mt-2 text-center max-w-xs mx-auto">
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
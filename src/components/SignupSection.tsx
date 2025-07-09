import React, { useEffect, useRef } from 'react';
import SignupForm from './SignupForm';
import { track } from '@vercel/analytics';

const SignupSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track('bottom_viewed');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="signup" className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-4 text-center animate-scroll-fade-up">
            Bring your favorite family moments to life
          </h2>
          <div className="font-inter text-base md:text-lg text-gray-700 text-center max-w-xl mx-auto animate-scroll-fade-up-delayed">
            🖍️ Join our waitlist and be the first to get a custom coloring book your child will love.<br/>
            <span className="inline-block mt-2">💛 Just $30 for a 15-page book, shipped to you.</span>
          </div>
        </div>
        <SignupForm location="bottom" showFamiliesJoined={true} />
      </div>
    </section>
  );
};

export default SignupSection;
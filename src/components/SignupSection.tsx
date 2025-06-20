import React, { useState, useEffect, useRef } from 'react';
import { Heart, FileText, Package, Sparkles } from 'lucide-react';
import { supabase, type WaitlistSubmission } from '../lib/supabase';

const SignupSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '' as 'pdf' | 'book' | 'both' | ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showInterestOptions, setShowInterestOptions] = useState(false);
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

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const userAgent = navigator.userAgent;
      
      const submission: Omit<WaitlistSubmission, 'id' | 'created_at'> = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        interest: formData.interest || null,
        user_agent: userAgent,
        ip_address: null
      };

      const { error: insertError } = await supabase
        .from('waitlist_submissions')
        .insert([submission]);

      if (insertError) {
        throw insertError;
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInterestSelect = (interest: 'pdf' | 'book' | 'both') => {
    setFormData({
      ...formData,
      interest
    });
    setShowInterestOptions(false);
  };

  const toggleInterestOptions = () => {
    setShowInterestOptions(!showInterestOptions);
  };

  const interestOptions = [
    {
      id: 'pdf',
      title: 'PDF pages to print at home',
      icon: FileText,
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      id: 'book',
      title: 'A complete coloring book shipped to me',
      icon: Package,
      gradient: 'from-purple-400 to-purple-600',
    },
    {
      id: 'both',
      title: 'Both options',
      icon: Sparkles,
      gradient: 'from-pink-400 to-yellow-400',
    },
  ];

  const selectedOption = interestOptions.find(option => option.id === formData.interest);

  if (isSubmitted) {
    return (
      <section ref={sectionRef} id="signup" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-gradient-accent rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 animate-scroll-fade-up">
            <Heart className="w-10 h-10 text-charcoal" />
          </div>
          <h2 className="font-playfair text-3xl font-bold text-charcoal mb-4 animate-scroll-fade-up-delayed">
            Thank you!
          </h2>
          <p className="font-inter text-lg text-gray-600 animate-scroll-fade-up-more-delayed">
            We'll be in touch soon with updates about ColorMagic. 
            Get ready to turn your favorite memories into magical coloring adventures!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="signup" className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={`font-playfair text-3xl md:text-4xl font-bold text-charcoal mb-6 opacity-0 ${
            isVisible ? 'animate-scroll-fade-up' : ''
          }`}>
            Be first to try it
          </h2>
          <p className={`font-inter text-lg text-gray-600 leading-relaxed opacity-0 ${
            isVisible ? 'animate-scroll-fade-up-delayed' : ''
          }`}>
            Leave your info and we'll reach out when ColorMagic is ready. 
            No spam, just an update when we're ready to turn your precious memories into coloring magic.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={`opacity-0 ${
          isVisible ? 'animate-scroll-fade-up-more-delayed' : ''
        }`}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-inter font-medium text-charcoal mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none transition-all duration-500 font-inter transform focus:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block font-inter font-medium text-charcoal mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none transition-all duration-500 font-inter transform focus:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email"
              />
            </div>

            <div className="relative">
              <label className="block font-inter font-medium text-charcoal mb-2">
                What are you interested in? <span className="text-gray-400 text-sm">(optional)</span>
              </label>
              
              {/* Custom Select Button */}
              <button
                type="button"
                onClick={toggleInterestOptions}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none transition-all duration-500 font-inter transform focus:scale-105 bg-white text-left flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:border-gray-300"
              >
                <div className="flex items-center space-x-3">
                  {selectedOption ? (
                    <>
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${selectedOption.gradient} flex items-center justify-center`}>
                        <selectedOption.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-charcoal">{selectedOption.title}</span>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-gray-500" />
                      </div>
                      <span className="text-gray-500">Select an option...</span>
                    </>
                  )}
                </div>
                <div className={`transform transition-transform duration-300 ${showInterestOptions ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Dropdown Options */}
              {showInterestOptions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden animate-scroll-fade-up">
                  {interestOptions.map((option, index) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleInterestSelect(option.id as 'pdf' | 'book' | 'both')}
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-all duration-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed opacity-0 animate-scroll-fade-up`}
                        style={{ 
                          animationDelay: `${index * 0.1}s`,
                          animationFillMode: 'forwards'
                        }}
                      >
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${option.gradient} flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-inter text-charcoal">{option.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-accent hover:bg-gradient-accent-hover text-charcoal font-inter font-semibold py-4 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignupSection;
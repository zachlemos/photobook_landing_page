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
        user_agent: userAgent,
        ip_address: null
      };

      if (formData.interest) {
        submission.interest = formData.interest;
      }

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
  };

  const interestOptions = [
    {
      id: 'pdf',
      title: 'PDF Pages',
      description: 'Print at home instantly',
      icon: FileText,
      gradient: 'from-blue-400 to-blue-600',
      hoverGradient: 'from-blue-500 to-blue-700',
    },
    {
      id: 'book',
      title: 'Coloring Book',
      description: 'Shipped to your door',
      icon: Package,
      gradient: 'from-purple-400 to-purple-600',
      hoverGradient: 'from-purple-500 to-purple-700',
    },
    {
      id: 'both',
      title: 'Both Options',
      description: 'Best of both worlds',
      icon: Sparkles,
      gradient: 'from-pink-400 to-yellow-400',
      hoverGradient: 'from-pink-500 to-yellow-500',
    },
  ];

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
          <div className="space-y-8">
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

            <div>
              <label className="block font-inter font-medium text-charcoal mb-4">
                What are you interested in?
              </label>
              <div className="grid gap-4">
                {interestOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isSelected = formData.interest === option.id;
                  
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleInterestSelect(option.id as 'pdf' | 'book' | 'both')}
                      disabled={isSubmitting}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                        isSelected
                          ? 'border-transparent shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      {/* Background gradient for selected state */}
                      {isSelected && (
                        <div className={`absolute inset-0 bg-gradient-to-r ${option.gradient} rounded-2xl opacity-10`} />
                      )}
                      
                      <div className="relative flex items-center space-x-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isSelected
                            ? `bg-gradient-to-r ${option.gradient} text-white shadow-lg`
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1 text-left">
                          <h3 className={`font-inter font-semibold text-lg transition-colors duration-300 ${
                            isSelected ? 'text-charcoal' : 'text-gray-800'
                          }`}>
                            {option.title}
                          </h3>
                          <p className={`font-inter text-sm transition-colors duration-300 ${
                            isSelected ? 'text-gray-700' : 'text-gray-600'
                          }`}>
                            {option.description}
                          </p>
                        </div>
                        
                        {/* Selection indicator */}
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                          isSelected
                            ? `bg-gradient-to-r ${option.gradient} border-transparent`
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
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
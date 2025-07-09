import React, { useState, useEffect, useRef } from 'react';
import { Heart, FileText, Package, Sparkles } from 'lucide-react';
import { track } from '@vercel/analytics';
import { supabase, type WaitlistSubmission } from '../lib/supabase';
import { trackSignUp, trackLead, trackCustomEvent } from '../lib/analytics';
import { config } from '../lib/config';
import { useSignupContext, SignupFormData } from './SignupContext';

interface SignupFormProps {
  location: 'top' | 'bottom';
  showFamiliesJoined?: boolean;
  onSignupComplete?: () => void;
  onFormView?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  location,
  showFamiliesJoined = true,
  onSignupComplete,
  onFormView,
}) => {
  const { isSubmitted, setIsSubmitted, formData, setFormData } = useSignupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number>(32);
  const [hasStartedForm, setHasStartedForm] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (onFormView) onFormView();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const { data, error } = await supabase.rpc('get_waitlist_count');
        if (error) throw error;
        if (data != null) setWaitlistCount(data);
      } catch (err) {
        // fallback to default
      }
    };
    if (showFamiliesJoined) fetchWaitlistCount();
  }, [showFamiliesJoined]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2, rootMargin: '-50px 0px' }
    );
    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    track('waitlist_signup_attempted', {
      hasName: !!formData.name.trim(),
      hasEmail: !!formData.email.trim(),
      location
    });
    if (config.enableMetaPixel) {
      trackCustomEvent('FormSubmissionAttempt', {
        form_name: 'Waitlist Signup',
        has_name: !!formData.name.trim(),
        has_email: !!formData.email.trim(),
        location
      });
    }
    try {
      const userAgent = navigator.userAgent;
      const submission: Omit<WaitlistSubmission, 'id' | 'created_at'> = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        user_agent: userAgent,
        ip_address: null
      };
      const { error: insertError } = await supabase
        .from('waitlist_submissions')
        .insert([submission]);
      if (insertError) throw insertError;
      track('waitlist_signup_success', { location });
      if (config.enableMetaPixel) {
        trackSignUp();
        trackLead(0, 'USD');
        trackCustomEvent('WaitlistSignupSuccess', {
          user_name: formData.name.trim(),
          user_email: formData.email.trim(),
          location
        });
      }
      setIsSubmitted(true);
      if (onSignupComplete) onSignupComplete();
    } catch (err) {
      track('waitlist_signup_error', {
        error: err instanceof Error ? err.message : 'Unknown error',
        location
      });
      if (config.enableMetaPixel) {
        trackCustomEvent('FormSubmissionError', {
          form_name: 'Waitlist Signup',
          error: err instanceof Error ? err.message : 'Unknown error',
          location
        });
      }
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getDynamicDenominator = (count: number): number => {
    let denominator = 50;
    while (count >= denominator) denominator += 25;
    return denominator;
  };
  const denominator = getDynamicDenominator(waitlistCount);

  if (isSubmitted) {
    return (
      <section ref={sectionRef} className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-gradient-accent rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 animate-scroll-fade-up">
            <Heart className="w-10 h-10 text-charcoal" />
          </div>
          <h2 className="font-playfair text-3xl font-bold text-charcoal mb-4 animate-scroll-fade-up-delayed">
            Thank you!
          </h2>
          <p className="font-inter text-lg text-gray-600 animate-scroll-fade-up-more-delayed">
            We'll be in touch soon with updates about Color My Moments. 
            Get ready to turn your favorite memories into magical coloring adventures!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-10 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        {showFamiliesJoined && (
          <div className="mb-8 text-center">
            <p className="font-inter text-gray-700">
              🎉 <span className="font-semibold">{waitlistCount}/{denominator}</span> families have already joined the waitlist!
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none transition-all duration-500 font-inter transform focus:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-charcoal"
                placeholder="Enter your email"
              />
            </div>
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none transition-all duration-500 font-inter transform focus:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-charcoal"
                placeholder="Enter your name"
              />
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

export default SignupForm; 
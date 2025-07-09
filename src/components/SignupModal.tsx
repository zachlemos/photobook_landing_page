import React, { useEffect } from 'react';
import { track } from '@vercel/analytics';

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SignupModal: React.FC<SignupModalProps> = ({ open, onClose, children }) => {
  useEffect(() => {
    if (open) {
      track('modal_opened', { location: 'top' });
    }
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      {/* Modal Content - fade in as a whole */}
      <div className="relative bg-white text-charcoal rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8 z-10 animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-charcoal text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {/* Explainer Text */}
        <div className="mb-8">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-4 text-center">
            Bring your favorite family moments to life
          </h2>
          <div className="font-inter text-base md:text-lg text-gray-700 text-left max-w-xl mx-auto">
            🖍️ Join our waitlist and be the first to get a custom coloring book your child will love.<br/>
            <span className="inline-block mt-2">💛 Just $30 for a 15-page book, shipped to you.</span>
          </div>
        </div>
        {/* Children (form and counter) - no extra animation classes */}
        {children}
      </div>
    </div>
  );
};

export default SignupModal; 
import React, { createContext, useContext, useState } from 'react';

export type SignupFormData = {
  name: string;
  email: string;
  interest: 'pdf' | 'book' | 'both' | '';
};

interface SignupContextType {
  isSubmitted: boolean;
  setIsSubmitted: (val: boolean) => void;
  formData: SignupFormData;
  setFormData: (data: SignupFormData) => void;
}

const defaultFormData: SignupFormData = {
  name: '',
  email: '',
  interest: '',
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>(defaultFormData);

  return (
    <SignupContext.Provider value={{ isSubmitted, setIsSubmitted, formData, setFormData }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignupContext = () => {
  const ctx = useContext(SignupContext);
  if (!ctx) throw new Error('useSignupContext must be used within a SignupProvider');
  return ctx;
}; 
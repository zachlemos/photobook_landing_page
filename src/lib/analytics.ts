// Meta Pixel Analytics Utility
declare global {
  interface Window {
    fbq: any;
  }
}

// Initialize Meta Pixel
export const initMetaPixel = (pixelId: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }
};

// Track page views
export const trackPageView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Common event tracking functions
export const trackSignUp = (method?: string) => {
  trackEvent('CompleteRegistration', { content_name: 'Sign Up', content_category: 'User Registration' });
};

export const trackLead = (value?: number, currency?: string) => {
  trackEvent('Lead', { 
    content_name: 'Lead Generation',
    value: value,
    currency: currency || 'USD'
  });
};

export const trackPurchase = (value: number, currency: string = 'USD', contentName?: string) => {
  trackEvent('Purchase', {
    content_name: contentName || 'Purchase',
    value: value,
    currency: currency
  });
};

export const trackAddToCart = (value: number, currency: string = 'USD', contentName?: string) => {
  trackEvent('AddToCart', {
    content_name: contentName || 'Add to Cart',
    value: value,
    currency: currency
  });
};

export const trackViewContent = (contentName: string, contentCategory?: string) => {
  trackEvent('ViewContent', {
    content_name: contentName,
    content_category: contentCategory
  });
};

export const trackCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
  trackEvent(eventName, parameters);
}; 
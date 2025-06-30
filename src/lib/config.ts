// Environment Configuration
export const config = {
  // Meta Pixel Configuration
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID || 'YOUR_PIXEL_ID_HERE',
  
  // Supabase Configuration (if needed)
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  
  // App Configuration
  appName: 'Color My Moments',
  appUrl: 'https://www.colormymoments.app',
  
  // Analytics Configuration
  enableMetaPixel: import.meta.env.VITE_ENABLE_META_PIXEL !== 'false',
  enableVercelAnalytics: import.meta.env.VITE_ENABLE_VERCEL_ANALYTICS !== 'false',
} as const; 
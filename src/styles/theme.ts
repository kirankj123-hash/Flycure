// FlyCure Health Design System
// This theme is consumed by Tailwind CSS and design tokens

export const theme = {
  colors: {
    // Primary brand color - Emerald/Teal for medical/health theme
    primary: '#10b981', // emerald-500
    secondary: '#2563eb', // blue-600
    
    // Text colors
    text: {
      primary: '#374151',   // gray-700
      secondary: '#6b7280', // gray-600
      light: '#9ca3af'      // gray-500
    },
    
    // Background colors
    background: {
      primary: '#ffffff',   // white
      secondary: '#f9fafb', // gray-50
      muted: '#f3f4f6'      // gray-100
    },
    
    // Semantic colors
    success: '#10b981',   // emerald-500
    warning: '#f59e0b',   // amber-500
    error: '#ef4444',     // red-500
    info: '#3b82f6',      // blue-500
    
    // Border and UI colors
    border: '#e5e7eb',    // gray-200
    ring: '#10b981',      // emerald-500 (matches primary)
  },
  

  typography: {
    fontFamily: {
      // System font stacks for better performance and consistency
      primary: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      heading: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'
    },
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem'       // 48px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },
  
  spacing: {
    // Based on 4px grid system
    px: '1px',
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};
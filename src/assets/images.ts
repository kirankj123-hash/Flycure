// Centralized Image Assets Management
// Single source of truth for all images used in the application

export const imageAssets = {
  // Brand and Logo Images
  brand: {
    logo: '/flycure_image.png',
    logoAlt: 'FlyCure Health',
    logoSvg: '/logo.svg',
    favicon: '/favicon.ico',
  },

  // Partner Hospital Logos
  partners: {
    manipal: {
      src: '/manipal-logo.svg',
      alt: 'Manipal Hospital - Leading Healthcare Provider',
      width: 120,
      height: 40,
    },
    apollo: {
      src: '/apollo-logo.svg', 
      alt: 'Apollo Hospital - Premier Medical Services',
      width: 120,
      height: 40,
    },
    srisai: {
      src: '/srisai-logo.svg',
      alt: 'Sri Sai Hospital - Quality Healthcare Solutions', 
      width: 120,
      height: 40,
    },
  },

  // Hero Section Images
  hero: {
    consultation: {
      src: '/flycure_image.png',
      alt: 'Medical Consultation - Professional healthcare consultation',
      width: 400,
      height: 300,
    },
    facility: {
      src: '/flycure_image.png',
      alt: 'Medical Facility - State-of-the-art medical facility',
      width: 400,
      height: 300,
    },
    team: {
      src: '/flycure_image.png',
      alt: 'Medical Team - Expert medical professionals',
      width: 400,
      height: 300,
    },
    care: {
      src: '/flycure_image.png',
      alt: 'Patient Care - Comprehensive patient care services',
      width: 400,
      height: 300,
    },
  },

  // Navigation Images  
  navigation: {
    logo: {
      src: '/flycure_image.png',
      alt: 'FlyCure Health',
      width: 40,
      height: 40,
      className: 'rounded-full',
    },
  },

  // Footer Images
  footer: {
    logo: {
      src: '/logo.svg',
      alt: 'FlyCure Health',
      width: 120,
      height: 40,
      className: 'h-10 mb-4',
    },
  },

  // Icons and UI Elements
  icons: {
    file: '/file.svg',
    globe: '/globe.svg', 
    window: '/window.svg',
    next: '/next.svg',
    vercel: '/vercel.svg',
  },

  // Placeholder and fallback images
  placeholders: {
    default: '/flycure_image.png',
    heroFallback: '/flycure_image.png',
  },
} as const;

// Helper function to get image props
export function getImageProps(category: keyof typeof imageAssets, key: string) {
  const categoryImages = imageAssets[category] as Record<string, unknown>;
  const imageConfig = categoryImages[key];
  
  if (!imageConfig) {
    console.warn(`Image not found: ${category}.${key}`);
    return null;
  }

  return imageConfig;
}

// Helper function to get all partner images
export function getPartnerImages() {
  return Object.values(imageAssets.partners);
}

// Helper function to get all hero images  
export function getHeroImages() {
  return Object.values(imageAssets.hero);
}

// Type definitions for better TypeScript support
export type ImageCategory = keyof typeof imageAssets;
export type BrandImages = keyof typeof imageAssets.brand;
export type PartnerImages = keyof typeof imageAssets.partners;
export type HeroImages = keyof typeof imageAssets.hero;
export type NavigationImages = keyof typeof imageAssets.navigation;
export type FooterImages = keyof typeof imageAssets.footer;

// Image presets for common use cases
export const imagePresets = {
  // Partner logo with standard styling
  partnerLogo: 'object-contain grayscale hover:grayscale-0 transition-all duration-300',
  
  // Hero image with responsive sizing
  heroImage: 'object-cover rounded-lg shadow-md w-full',
  
  // Navigation logo styling
  navLogo: 'rounded-full',
  
  // Footer logo styling  
  footerLogo: 'h-10 mb-4',
  
  // General responsive image
  responsive: 'w-full h-auto',
} as const;

export type ImagePreset = keyof typeof imagePresets;
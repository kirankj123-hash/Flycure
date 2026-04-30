/**
 * Image Paths Configuration
 * Centralized image path constants for organized asset management
 * 
 * Directory Structure:
 * public/images/
 * ├── brand/        - Brand logos and identity
 * ├── partners/     - Partner hospital logos
 * ├── icons/        - UI icons and symbols
 * ├── departments/  - Department-specific images
 * ├── doctors/      - Doctor profile images
 * └── hospitals/    - Hospital facility images
 */

import { logger } from '@/lib/logger';

export const imagePaths = {
  // Brand Assets
  brand: {
    logo: '/images/brand/flycure_image.png',
    logoSvg: '/images/brand/logo.svg',
    logoAlt: 'FlyCure Health',
    favicon: '/favicon.ico',
  },

  // Partner Hospital Logos
  partners: {
    manipal: {
      src: '/images/partners/manipal-logo.svg',
      alt: 'Manipal Hospital - Leading Healthcare Provider',
      width: 120,
      height: 40,
    },
    apollo: {
      src: '/images/partners/apollo-logo.svg',
      alt: 'Apollo Hospital - Premier Medical Services',
      width: 120,
      height: 40,
    },
    srisai: {
      src: '/images/partners/srisai-logo.svg',
      alt: 'Sri Sai Hospital - Quality Healthcare Solutions',
      width: 120,
      height: 40,
    },
  },

  // UI Icons
  icons: {
    file: '/images/icons/file.svg',
    globe: '/images/icons/globe.svg',
    window: '/images/icons/window.svg',
    next: '/next.svg', // Next.js default icons stay in root
    vercel: '/vercel.svg',
  },

  // Department Images (placeholders - add actual images later)
  departments: {
    cardiology: {
      src: '/images/brand/flycure_image.png', // Placeholder
      alt: 'Cardiology Department - Heart Care Specialists',
      width: 400,
      height: 300,
    },
    orthopedics: {
      src: '/images/brand/flycure_image.png',
      alt: 'Orthopedics Department - Bone and Joint Care',
      width: 400,
      height: 300,
    },
    oncology: {
      src: '/images/brand/flycure_image.png',
      alt: 'Oncology Department - Cancer Treatment Center',
      width: 400,
      height: 300,
    },
    neurology: {
      src: '/images/brand/flycure_image.png',
      alt: 'Neurology Department - Brain and Nervous System',
      width: 400,
      height: 300,
    },
    gastroenterology: {
      src: '/images/brand/flycure_image.png',
      alt: 'Gastroenterology Department - Digestive Health',
      width: 400,
      height: 300,
    },
    dermatology: {
      src: '/images/brand/flycure_image.png',
      alt: 'Dermatology Department - Skin Care Specialists',
      width: 400,
      height: 300,
    },
  },

  // Doctor Profile Images (placeholders - add actual images later)
  doctors: {
    default: {
      src: '/images/brand/flycure_image.png',
      alt: 'Professional Medical Doctor',
      width: 300,
      height: 300,
    },
  },

  // Hospital Facility Images (placeholders - add actual images later)
  hospitals: {
    thailand: {
      src: '/images/brand/flycure_image.png',
      alt: 'Medical Facility in Thailand',
      width: 400,
      height: 300,
    },
    india: {
      src: '/images/brand/flycure_image.png',
      alt: 'Medical Facility in India',
      width: 400,
      height: 300,
    },
    turkey: {
      src: '/images/brand/flycure_image.png',
      alt: 'Medical Facility in Turkey',
      width: 400,
      height: 300,
    },
  },

  // Hero Section Images
  hero: {
    consultation: {
      src: '/images/brand/flycure_image.png',
      alt: 'Medical Consultation - Professional healthcare consultation',
      width: 600,
      height: 400,
    },
    facility: {
      src: '/images/brand/flycure_image.png',
      alt: 'Medical Facility - State-of-the-art medical facility',
      width: 600,
      height: 400,
    },
    team: {
      src: '/images/brand/flycure_image.png',
      alt: 'Medical Team - Expert medical professionals',
      width: 600,
      height: 400,
    },
    care: {
      src: '/images/brand/flycure_image.png',
      alt: 'Patient Care - Comprehensive patient care services',
      width: 600,
      height: 400,
    },
  },

  // Placeholders
  placeholders: {
    default: '/images/brand/flycure_image.png',
    avatar: '/images/brand/flycure_image.png',
  },
} as const;

// Image presets for consistent styling
export const imagePresets = {
  // Partner logo with hover effects
  partnerLogo: 'object-contain grayscale hover:grayscale-0 transition-all duration-300',
  
  // Hero images with responsive sizing
  heroImage: 'object-cover rounded-lg shadow-md w-full',
  
  // Navigation logo
  navLogo: 'rounded-full object-cover',
  
  // Footer logo
  footerLogo: 'h-10 mb-4 object-contain',
  
  // Profile images
  profileImage: 'rounded-full object-cover',
  
  // Card images
  cardImage: 'object-cover rounded-t-lg w-full',
  
  // General responsive image
  responsive: 'w-full h-auto object-cover',
  
  // Icon styling
  icon: 'w-6 h-6',
  iconLarge: 'w-8 h-8',
} as const;

// Type exports for TypeScript support
export type ImageCategory = keyof typeof imagePaths;
export type ImagePreset = keyof typeof imagePresets;
export type PartnerKey = keyof typeof imagePaths.partners;
export type DepartmentKey = keyof typeof imagePaths.departments;
export type HospitalKey = keyof typeof imagePaths.hospitals;

// Helper function to get image configuration
export function getImageConfig(
  category: ImageCategory,
  key: string
): { src: string; alt: string; width?: number; height?: number } | null {
  const categoryImages = imagePaths[category] as Record<string, unknown>;
  const config = categoryImages[key];
  
  if (!config || typeof config !== 'object') {
    logger.warn('Image configuration not found', { category, key });
    return null;
  }
  
  return config as { src: string; alt: string; width?: number; height?: number };
}

// Helper to get all partner logos
export function getAllPartnerLogos() {
  return Object.entries(imagePaths.partners).map(([key, value]) => ({
    id: key,
    ...value,
  }));
}

// Helper to get department image by slug
export function getDepartmentImage(slug: string) {
  return imagePaths.departments[slug as DepartmentKey] || imagePaths.placeholders.default;
}

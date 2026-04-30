/**
 * Centralized SEO Metadata Management
 * Single source of truth for all page metadata
 * 
 * Features:
 * - Centralized metadata definitions
 * - SEO best practices built-in
 * - Type-safe metadata generation
 * - OpenGraph and Twitter card support
 */

import type { Metadata } from 'next';

export interface PageMetadata extends Metadata {
  canonical?: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
  keywords?: string[];
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
}

// Base metadata for all pages
const baseMetadata: PageMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000'),
  applicationName: 'FlyCure Health',
  authors: [{ name: 'FlyCure Health' }],
  generator: 'Next.js',
  keywords: ['medical tourism', 'healthcare', 'international treatment'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'FlyCure Health',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@flycurehealth',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/**
 * Centralized page metadata registry
 * Add new pages here for consistent SEO
 */
export const pageMetadata: Record<string, PageMetadata> = {
  // ============================================
  // HOME & MAIN PAGES
  // ============================================
  '/': {
    title: 'FlyCure Health - World-Class Medical Tourism Services',
    description: 'Access world-class medical treatments abroad. FlyCure connects you with top hospitals and specialists for affordable, high-quality healthcare.',
    keywords: ['medical tourism', 'international healthcare', 'medical travel', 'affordable treatment'],
    openGraph: {
      title: 'FlyCure Health - Medical Tourism Platform',
      description: 'World-class medical treatments at affordable prices',
      images: [
        {
          url: '/og/home.jpg',
          width: 1200,
          height: 630,
          alt: 'FlyCure Health - Medical Tourism',
        },
      ],
    },
    canonical: '/',
  },

  // ============================================
  // MEDICAL DOMAIN
  // ============================================
  '/departments': {
    title: 'Medical Departments | FlyCure Health',
    description: 'Explore our specialized medical departments including cardiology, orthopedics, cosmetic surgery, and more. Find the right specialists for your needs.',
    keywords: ['medical departments', 'medical specialties', 'healthcare services'],
    openGraph: {
      title: 'Medical Departments',
      description: 'Specialized medical departments for your healthcare needs',
      images: [{ url: '/og/departments.jpg', width: 1200, height: 630 }],
    },
    canonical: '/departments',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Departments', href: '/departments' },
    ],
  },

  '/doctors': {
    title: 'Medical Professionals | FlyCure Health',
    description: 'Meet our network of experienced medical professionals. Board-certified doctors and specialists ready to provide world-class care.',
    keywords: ['doctors', 'medical professionals', 'specialists', 'physicians'],
    openGraph: {
      title: 'Medical Professionals',
      description: 'Experienced doctors and specialists',
      images: [{ url: '/og/doctors.jpg', width: 1200, height: 630 }],
    },
    canonical: '/doctors',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Doctors', href: '/doctors' },
    ],
  },

  '/treatments': {
    title: 'Medical Treatments & Procedures | FlyCure Health',
    description: 'Browse comprehensive list of medical treatments and procedures available through our partner hospitals worldwide.',
    keywords: ['medical treatments', 'procedures', 'surgeries', 'therapies'],
    openGraph: {
      title: 'Medical Treatments',
      description: 'Comprehensive medical treatments and procedures',
      images: [{ url: '/og/treatments.jpg', width: 1200, height: 630 }],
    },
    canonical: '/treatments',
  },

  '/packages': {
    title: 'Treatments and Packages | FlyCure Health',
    description: 'Browse treatment categories and transparent package planning options for your medical travel journey.',
    keywords: ['treatment packages', 'medical packages', 'transparent pricing', 'medical treatments'],
    openGraph: {
      title: 'Treatments and Packages',
      description: 'Transparent treatment planning and package discovery',
      images: [{ url: '/og/packages.jpg', width: 1200, height: 630 }],
    },
    canonical: '/packages',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Packages', href: '/packages' },
    ],
  },

  // ============================================
  // FACILITIES DOMAIN
  // ============================================
  '/hospitals': {
    title: 'Partner Hospitals | FlyCure Health',
    description: 'Our network of accredited partner hospitals providing world-class facilities and cutting-edge medical technology.',
    keywords: ['hospitals', 'medical facilities', 'healthcare centers', 'accredited hospitals'],
    openGraph: {
      title: 'Partner Hospitals',
      description: 'World-class accredited hospitals',
      images: [{ url: '/og/hospitals.jpg', width: 1200, height: 630 }],
    },
    canonical: '/hospitals',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Hospitals', href: '/hospitals' },
    ],
  },

  '/care': {
    title: 'Hospitals and Doctors | FlyCure Health',
    description: 'Explore accredited hospitals and verified doctors to compare the right care path for your treatment journey.',
    keywords: ['hospitals', 'doctors', 'medical specialists', 'patient care'],
    openGraph: {
      title: 'Hospitals and Doctors',
      description: 'Compare accredited hospitals and verified doctors',
      images: [{ url: '/og/care.jpg', width: 1200, height: 630 }],
    },
    canonical: '/care',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Care', href: '/care' },
    ],
  },

  '/destinations': {
    title: 'Medical Tourism Destinations | FlyCure Health',
    description: 'Explore top medical tourism destinations offering quality healthcare, experienced specialists, and affordable treatment options.',
    keywords: ['medical tourism destinations', 'healthcare countries', 'medical travel'],
    openGraph: {
      title: 'Medical Tourism Destinations',
      description: 'Top destinations for medical tourism',
      images: [{ url: '/og/destinations.jpg', width: 1200, height: 630 }],
    },
    canonical: '/destinations',
  },

  // ============================================
  // RESOURCES DOMAIN
  // ============================================
  '/blog': {
    title: 'Medical Tourism Blog | FlyCure Health',
    description: 'Latest insights, tips, and guides on medical tourism, healthcare trends, and patient success stories.',
    keywords: ['medical tourism blog', 'healthcare articles', 'patient stories'],
    openGraph: {
      title: 'Medical Tourism Blog',
      description: 'Insights and guides on medical tourism',
      images: [{ url: '/og/blog.jpg', width: 1200, height: 630 }],
    },
    canonical: '/blog',
  },

  '/stories': {
    title: 'Patient Stories | FlyCure Health',
    description: 'Read real treatment journeys and recovery stories from international patients supported by FlyCure.',
    keywords: ['patient stories', 'medical tourism testimonials', 'recovery journeys'],
    openGraph: {
      title: 'Patient Stories',
      description: 'Real journeys from patients who trusted FlyCure',
      images: [{ url: '/og/stories.jpg', width: 1200, height: 630 }],
    },
    canonical: '/stories',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Stories', href: '/stories' },
    ],
  },

  '/guides': {
    title: 'Travel & Medical Guides | FlyCure Health',
    description: 'Comprehensive guides for medical travelers covering visas, accommodation, recovery, and more.',
    keywords: ['medical travel guides', 'patient guides', 'healthcare travel tips'],
    canonical: '/guides',
  },

  '/faq': {
    title: 'Frequently Asked Questions | FlyCure Health',
    description: 'Find answers to common questions about medical tourism, treatments, costs, and the process.',
    keywords: ['medical tourism faq', 'healthcare questions', 'patient questions'],
    canonical: '/faq',
  },

  // ============================================
  // COMPANY PAGES
  // ============================================
  '/about': {
    title: 'About Us | FlyCure Health',
    description: 'Learn about FlyCure Health, our mission to make quality healthcare accessible worldwide, and our commitment to patient care.',
    keywords: ['about flycure', 'company', 'mission', 'medical tourism company'],
    canonical: '/about',
  },

  '/assurance': {
    title: 'Doctor-Led Care and Safety | FlyCure Health',
    description: 'Understand FlyCure’s safeguards, accredited partnerships, and patient-first approach to safe medical travel.',
    keywords: ['patient safety', 'medical travel safeguards', 'doctor-led care', 'accredited partners'],
    openGraph: {
      title: 'Doctor-Led Care and Safety',
      description: 'Explore FlyCure’s safety, legal safeguards, and accredited care model',
      images: [{ url: '/og/assurance.jpg', width: 1200, height: 630 }],
    },
    canonical: '/assurance',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Assurance', href: '/assurance' },
    ],
  },

  '/estimate': {
    title: 'Get Free Estimate | FlyCure Health',
    description: 'Submit your medical requirements and receive a transparent treatment estimate from accredited hospitals.',
    keywords: ['medical estimate', 'treatment quote', 'second opinion', 'hospital estimate'],
    openGraph: {
      title: 'Get Free Estimate',
      description: 'Request a transparent treatment estimate from accredited hospitals',
      images: [{ url: '/og/estimate.jpg', width: 1200, height: 630 }],
    },
    canonical: '/estimate',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Estimate', href: '/estimate' },
    ],
  },

  '/contact': {
    title: 'Contact Us | FlyCure Health',
    description: 'Get in touch with our medical tourism coordinators. We\'re here to help you plan your medical journey.',
    keywords: ['contact', 'support', 'customer service'],
    canonical: '/contact',
  },

  '/careers': {
    title: 'Careers at FlyCure Health',
    description: 'Join our team and help make quality healthcare accessible to everyone. Explore career opportunities.',
    keywords: ['careers', 'jobs', 'employment opportunities'],
    canonical: '/careers',
  },

  '/privacy': {
    title: 'Privacy Policy | FlyCure Health',
    description: 'Our commitment to protecting your personal information and privacy.',
    canonical: '/privacy',
    robots: {
      index: false,
      follow: true,
    },
  },

  '/terms': {
    title: 'Terms of Service | FlyCure Health',
    description: 'Terms and conditions for using FlyCure Health services.',
    canonical: '/terms',
    robots: {
      index: false,
      follow: true,
    },
  },

  // ============================================
  // PROTECTED PAGES
  // ============================================
  '/dashboard': {
    title: 'Dashboard | FlyCure Health',
    description: 'Your personal dashboard for managing bookings, enquiries, and medical records.',
    robots: {
      index: false,
      follow: false,
    },
  },

  '/dashboard/profile': {
    title: 'My Profile | FlyCure Health',
    description: 'Manage your profile and personal information.',
    robots: {
      index: false,
      follow: false,
    },
  },

  '/dashboard/bookings': {
    title: 'My Bookings | FlyCure Health',
    description: 'View and manage your medical appointment bookings.',
    robots: {
      index: false,
      follow: false,
    },
  },

  '/dashboard/enquiries': {
    title: 'My Enquiries | FlyCure Health',
    description: 'Track your medical enquiries and communications.',
    robots: {
      index: false,
      follow: false,
    },
  },

  // ============================================
  // ADMIN PAGES
  // ============================================
  '/admin': {
    title: 'Admin Dashboard | FlyCure Health',
    description: 'Administrative dashboard',
    robots: {
      index: false,
      follow: false,
    },
  },
};

/**
 * Generate metadata for a specific page
 * Falls back to default metadata if page not found
 */
export function generatePageMetadata(path: string, customData?: Partial<PageMetadata>): PageMetadata {
  const pageData = pageMetadata[path] || getDefaultMetadata(path);
  
  return {
    ...baseMetadata,
    ...pageData,
    ...customData,
  };
}

/**
 * Generate default metadata for pages not in registry
 */
function getDefaultMetadata(path: string): PageMetadata {
  const title = path
    .split('/')
    .filter(Boolean)
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' - ');

  return {
    title: title ? `${title} | FlyCure Health` : 'FlyCure Health',
    description: 'World-class medical tourism services',
    canonical: path,
  };
}

/**
 * Generate dynamic metadata for detail pages
 */
export function generateDynamicMetadata(
  basePath: string,
  data: {
    title: string;
    description?: string;
    image?: string;
    keywords?: string[];
  }
): PageMetadata {
  const basePageData = pageMetadata[basePath] || {};

  return {
    ...baseMetadata,
    ...basePageData,
    title: `${data.title} | FlyCure Health`,
    description: data.description || basePageData.description,
    keywords: [...(basePageData.keywords || []), ...(data.keywords || [])],
    openGraph: {
      ...basePageData.openGraph,
      title: data.title,
      description: data.description,
      images: data.image
        ? [{ url: data.image, width: 1200, height: 630, alt: data.title }]
        : basePageData.openGraph?.images,
    },
  };
}

/**
 * Generate breadcrumb JSON-LD schema
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ label: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${item.href}`,
    })),
  };
}

/**
 * Generate organization JSON-LD schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'FlyCure Health',
    description: 'World-class medical tourism services',
    url: process.env.NEXT_PUBLIC_APP_BASE_URL,
    logo: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/logo.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@flycure.health',
    },
    sameAs: [
      'https://twitter.com/flycurehealth',
      'https://facebook.com/flycurehealth',
      'https://linkedin.com/company/flycure-health',
    ],
  };
}

export default pageMetadata;

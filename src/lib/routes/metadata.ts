/**
 * Route Metadata Configuration
 * SEO and metadata for all routes
 */

export interface RouteMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noindex?: boolean;
  canonical?: string;
}

/**
 * Metadata for all routes
 */
export const routeMetadata: Record<string, RouteMetadata> = {
  // Public Routes
  'public:home': {
    title: 'FlyCure Health - Medical Tourism Made Easy',
    description: 'Connect with world-class healthcare providers for affordable medical treatments abroad. Expert guidance for your medical tourism journey.',
    keywords: ['medical tourism', 'healthcare abroad', 'affordable treatment', 'international hospitals'],
    ogImage: '/images/og/home.jpg',
  },

  'public:about': {
    title: 'About FlyCure Health - Our Mission',
    description: 'Learn about FlyCure Health\'s mission to make quality healthcare accessible globally through medical tourism.',
    keywords: ['about flycure', 'medical tourism company', 'healthcare mission'],
    ogImage: '/images/og/about.jpg',
  },

  // Medical Domain
  'medical:departments:list': {
    title: 'Medical Departments - Browse Specialties | FlyCure',
    description: 'Explore our comprehensive range of medical departments and specialties. Find the right healthcare provider for your needs.',
    keywords: ['medical departments', 'healthcare specialties', 'medical services'],
    ogImage: '/images/og/departments.jpg',
  },

  'medical:departments:detail': {
    title: '{departmentName} - Medical Department | FlyCure',
    description: 'Expert {departmentName} services from world-class healthcare providers. Learn more about treatments, procedures, and specialists.',
    keywords: ['medical department', 'healthcare specialty'],
    ogImage: '/images/og/department-detail.jpg',
  },

  'medical:doctors:list': {
    title: 'Find Expert Doctors - Medical Professionals | FlyCure',
    description: 'Browse our network of experienced medical professionals and specialists worldwide. Find the right doctor for your treatment.',
    keywords: ['doctors', 'medical professionals', 'healthcare specialists', 'physicians'],
    ogImage: '/images/og/doctors.jpg',
  },

  'medical:doctors:detail': {
    title: 'Dr. {doctorName} - Medical Professional | FlyCure',
    description: 'Learn about Dr. {doctorName}\'s expertise, qualifications, and patient reviews. Book a consultation today.',
    keywords: ['doctor profile', 'medical specialist'],
    ogImage: '/images/og/doctor-detail.jpg',
  },

  // Facilities Domain
  'facilities:hospitals:list': {
    title: 'Partner Hospitals - World-Class Medical Facilities | FlyCure',
    description: 'Discover our network of accredited hospitals and medical facilities worldwide. Quality healthcare at affordable prices.',
    keywords: ['hospitals', 'medical facilities', 'healthcare centers', 'international hospitals'],
    ogImage: '/images/og/hospitals.jpg',
  },

  'facilities:hospitals:detail': {
    title: '{hospitalName} - Medical Facility | FlyCure',
    description: 'Learn about {hospitalName}\'s facilities, services, accreditations, and patient reviews. Plan your medical journey.',
    keywords: ['hospital profile', 'medical facility', 'healthcare center'],
    ogImage: '/images/og/hospital-detail.jpg',
  },

  // Protected Routes
  'protected:dashboard': {
    title: 'Dashboard - My FlyCure Account',
    description: 'Manage your medical tourism journey, appointments, and enquiries.',
    noindex: true,
  },

  'protected:profile': {
    title: 'My Profile - FlyCure Account',
    description: 'Manage your personal information and preferences.',
    noindex: true,
  },

  'protected:appointments': {
    title: 'My Appointments - FlyCure',
    description: 'View and manage your medical appointments.',
    noindex: true,
  },

  // Admin Routes
  'admin:dashboard': {
    title: 'Admin Dashboard - FlyCure',
    description: 'System administration and management.',
    noindex: true,
  },

  'admin:enquiries': {
    title: 'Manage Enquiries - FlyCure Admin',
    description: 'View and manage all customer enquiries.',
    noindex: true,
  },

  'admin:users': {
    title: 'User Management - FlyCure Admin',
    description: 'Manage user accounts and permissions.',
    noindex: true,
  },

  'admin:metrics': {
    title: 'System Metrics - FlyCure Admin',
    description: 'View system analytics and performance metrics.',
    noindex: true,
  },
};

/**
 * Get metadata for a route
 */
export function getRouteMetadata(routeKey: string, params?: Record<string, string>): RouteMetadata {
  let metadata = routeMetadata[routeKey];

  if (!metadata) {
    // Return default metadata
    return {
      title: 'FlyCure Health - Medical Tourism',
      description: 'Quality healthcare services at affordable prices',
    };
  }

  // Replace placeholders with actual values
  if (params) {
    metadata = {
      ...metadata,
      title: replacePlaceholders(metadata.title, params),
      description: replacePlaceholders(metadata.description, params),
    };
  }

  return metadata;
}

/**
 * Replace placeholders in strings like {paramName}
 */
function replacePlaceholders(text: string, params: Record<string, string>): string {
  let result = text;
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(`{${key}}`, value);
  }
  return result;
}

/**
 * Generate metadata for Next.js metadata API
 */
export function generateMetadata(routeKey: string, params?: Record<string, string>) {
  const metadata = getRouteMetadata(routeKey, params);

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords?.join(', '),
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: metadata.ogImage ? [{ url: metadata.ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: metadata.ogImage ? [metadata.ogImage] : undefined,
    },
    robots: metadata.noindex ? {
      index: false,
      follow: false,
    } : undefined,
    alternates: metadata.canonical ? {
      canonical: metadata.canonical,
    } : undefined,
  };
}

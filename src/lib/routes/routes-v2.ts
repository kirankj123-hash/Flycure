/**
 * Hierarchical Route Registry v2.0
 * Type-safe, scalable route management for 1000+ pages
 * 
 * Features:
 * - Hierarchical organization
 * - Type-safe route builders
 * - Metadata integration
 * - Dynamic route support
 */

import type { Metadata } from 'next';

// Route builder types
export type RouteBuilder = (...args: (string | number)[]) => string;
export type RoutePath = string | RouteBuilder;

// Route definition with metadata
export interface RouteDefinition {
  path: RoutePath;
  metadata?: Partial<Metadata> & {
    canonical?: string;
    breadcrumbs?: Array<{ label: string; href: string }>;
  };
}

/**
 * Hierarchical Route Registry
 * Organized by domain for scalability
 */
export const routes = {
  // ============================================
  // PUBLIC ROUTES
  // ============================================
  public: {
    home: {
      path: '/',
      metadata: {
        title: 'FlyCure Health - Medical Tourism Platform',
        description: 'World-class medical tourism services',
      },
    },

    // Medical domain routes
    medical: {
      about: {
        list: {
          path: '/about',
          metadata: {
            title: 'Medical Departments | FlyCure Health',
            description: 'Explore our specialized medical departments',
          },
        },
        detail: {
          path: (slug: string) => `/about/${slug}`,
          metadata: {
            title: 'About | FlyCure Health',
          },
        },
      },

      doctors: {
        list: {
          path: '/doctors',
          metadata: {
            title: 'Medical Professionals | FlyCure Health',
            description: 'Meet our experienced medical professionals',
          },
        },
        detail: {
          path: (id: string) => `/doctors/${id}`,
          metadata: {
            title: 'Doctor Profile | FlyCure Health',
          },
        },
        search: {
          path: '/doctors/search',
          metadata: {
            title: 'Find a Doctor | FlyCure Health',
          },
        },
        byDepartment: {
          path: (deptSlug: string) => `/doctors/department/${deptSlug}`,
          metadata: {
            title: 'Doctors by Department | FlyCure Health',
          },
        },
      },

      treatments: {
        list: {
          path: '/treatments',
          metadata: {
            title: 'Medical Treatments | FlyCure Health',
          },
        },
        detail: {
          path: (slug: string) => `/treatments/${slug}`,
          metadata: {
            title: 'Treatment Details | FlyCure Health',
          },
        },
        byCategory: {
          path: (category: string) => `/treatments/category/${category}`,
          metadata: {
            title: 'Treatments by Category | FlyCure Health',
          },
        },
      },
    },

    // Facilities domain routes
    facilities: {
      hospitals: {
        list: {
          path: '/hospitals',
          metadata: {
            title: 'Partner Hospitals | FlyCure Health',
            description: 'World-class partner hospitals',
          },
        },
        detail: {
          path: (slug: string) => `/hospitals/${slug}`,
          metadata: {
            title: 'Hospital Profile | FlyCure Health',
          },
        },
        byLocation: {
          path: (country: string, city?: string) =>
            city ? `/hospitals/${country}/${city}` : `/hospitals/${country}`,
          metadata: {
            title: 'Hospitals by Location | FlyCure Health',
          },
        },
      },

      destinations: {
        list: {
          path: '/destinations',
          metadata: {
            title: 'Medical Tourism Destinations | FlyCure Health',
          },
        },
        country: {
          path: (slug: string) => `/destinations/${slug}`,
          metadata: {
            title: 'Destination Details | FlyCure Health',
          },
        },
        city: {
          path: (country: string, city: string) => `/destinations/${country}/${city}`,
          metadata: {
            title: 'City Medical Tourism | FlyCure Health',
          },
        },
      },
    },

    // Resources domain routes
    resources: {
      blog: {
        list: {
          path: '/blog',
          metadata: {
            title: 'Medical Tourism Blog | FlyCure Health',
          },
        },
        post: {
          path: (slug: string) => `/blog/${slug}`,
          metadata: {
            title: 'Blog Post | FlyCure Health',
          },
        },
        category: {
          path: (category: string) => `/blog/category/${category}`,
          metadata: {
            title: 'Blog Category | FlyCure Health',
          },
        },
      },

      guides: {
        list: {
          path: '/guides',
          metadata: {
            title: 'Travel Guides | FlyCure Health',
          },
        },
        detail: {
          path: (slug: string) => `/guides/${slug}`,
          metadata: {
            title: 'Travel Guide | FlyCure Health',
          },
        },
      },

      faq: {
        list: {
          path: '/faq',
          metadata: {
            title: 'Frequently Asked Questions | FlyCure Health',
          },
        },
        category: {
          path: (category: string) => `/faq/${category}`,
          metadata: {
            title: 'FAQ Category | FlyCure Health',
          },
        },
      },
    },

    // Company routes
    company: {
      about: {
        path: '/about',
        metadata: {
          title: 'About Us | FlyCure Health',
        },
      },
      how: {
        path: '/how',
        metadata: {
          title: 'How It Works | FlyCure Health',
        },
      },
      journey: {
        path: '/journey',
        metadata: {
          title: 'Your Journey | FlyCure Health',
        },
      },
      safety: {
        path: '/safety',
        metadata: {
          title: 'Safety and Quality | FlyCure Health',
        },
      },
      contact: {
        path: '/contact',
        metadata: {
          title: 'Contact Us | FlyCure Health',
        },
      },
      privacy: {
        path: '/privacy',
        metadata: {
          title: 'Privacy Policy | FlyCure Health',
        },
      },
      terms: {
        path: '/terms',
        metadata: {
          title: 'Terms of Service | FlyCure Health',
        },
      },
    },
  },

  // ============================================
  // PROTECTED ROUTES (Authenticated Users)
  // ============================================
  protected: {
    dashboard: {
      home: {
        path: '/dashboard',
        metadata: {
          title: 'Dashboard | FlyCure Health',
        },
      },

      profile: {
        view: {
          path: '/dashboard/profile',
          metadata: {
            title: 'My Profile | FlyCure Health',
          },
        },
        edit: {
          path: '/dashboard/profile/edit',
          metadata: {
            title: 'Edit Profile | FlyCure Health',
          },
        },
        settings: {
          path: '/dashboard/profile/settings',
          metadata: {
            title: 'Profile Settings | FlyCure Health',
          },
        },
      },

      bookings: {
        list: {
          path: '/dashboard/bookings',
          metadata: {
            title: 'My Bookings | FlyCure Health',
          },
        },
        detail: {
          path: (id: string) => `/dashboard/bookings/${id}`,
          metadata: {
            title: 'Booking Details | FlyCure Health',
          },
        },
        create: {
          path: '/dashboard/bookings/new',
          metadata: {
            title: 'New Booking | FlyCure Health',
          },
        },
      },

      enquiries: {
        list: {
          path: '/dashboard/enquiries',
          metadata: {
            title: 'My Enquiries | FlyCure Health',
          },
        },
        detail: {
          path: (id: string) => `/dashboard/enquiries/${id}`,
          metadata: {
            title: 'Enquiry Details | FlyCure Health',
          },
        },
      },

      documents: {
        list: {
          path: '/dashboard/documents',
          metadata: {
            title: 'My Documents | FlyCure Health',
          },
        },
        upload: {
          path: '/dashboard/documents/upload',
          metadata: {
            title: 'Upload Documents | FlyCure Health',
          },
        },
      },
    },
  },

  // ============================================
  // ADMIN ROUTES
  // ============================================
  admin: {
    dashboard: {
      path: '/admin',
      metadata: {
        title: 'Admin Dashboard | FlyCure Health',
      },
    },

    users: {
      list: {
        path: '/admin/users',
        metadata: {
          title: 'User Management | FlyCure Admin',
        },
      },
      detail: {
        path: (id: string) => `/admin/users/${id}`,
        metadata: {
          title: 'User Details | FlyCure Admin',
        },
      },
      create: {
        path: '/admin/users/new',
        metadata: {
          title: 'Create User | FlyCure Admin',
        },
      },
    },

    content: {
      departments: {
        list: {
          path: '/admin/content/departments',
          metadata: {
            title: 'Manage Departments | FlyCure Admin',
          },
        },
        edit: {
          path: (id: string) => `/admin/content/departments/${id}`,
          metadata: {
            title: 'Edit Department | FlyCure Admin',
          },
        },
      },
      doctors: {
        list: {
          path: '/admin/content/doctors',
          metadata: {
            title: 'Manage Doctors | FlyCure Admin',
          },
        },
        edit: {
          path: (id: string) => `/admin/content/doctors/${id}`,
          metadata: {
            title: 'Edit Doctor | FlyCure Admin',
          },
        },
      },
      hospitals: {
        list: {
          path: '/admin/content/hospitals',
          metadata: {
            title: 'Manage Hospitals | FlyCure Admin',
          },
        },
        edit: {
          path: (id: string) => `/admin/content/hospitals/${id}`,
          metadata: {
            title: 'Edit Hospital | FlyCure Admin',
          },
        },
      },
    },

    enquiries: {
      list: {
        path: '/admin/enquiries',
        metadata: {
          title: 'Manage Enquiries | FlyCure Admin',
        },
      },
      detail: {
        path: (id: string) => `/admin/enquiries/${id}`,
        metadata: {
          title: 'Enquiry Details | FlyCure Admin',
        },
      },
    },

    analytics: {
      overview: {
        path: '/admin/analytics',
        metadata: {
          title: 'Analytics Overview | FlyCure Admin',
        },
      },
      reports: {
        path: '/admin/analytics/reports',
        metadata: {
          title: 'Analytics Reports | FlyCure Admin',
        },
      },
    },

    settings: {
      general: {
        path: '/admin/settings',
        metadata: {
          title: 'System Settings | FlyCure Admin',
        },
      },
      integrations: {
        path: '/admin/settings/integrations',
        metadata: {
          title: 'Integrations | FlyCure Admin',
        },
      },
    },
  },

  // ============================================
  // API ROUTES (v1)
  // ============================================
  api: {
    v1: {
      medical: {
        departments: {
          list: '/api/v1/medical/departments',
          detail: (id: string) => `/api/v1/medical/departments/${id}`,
        },
        doctors: {
          list: '/api/v1/medical/doctors',
          detail: (id: string) => `/api/v1/medical/doctors/${id}`,
          search: '/api/v1/medical/doctors/search',
        },
        treatments: {
          list: '/api/v1/medical/treatments',
          detail: (id: string) => `/api/v1/medical/treatments/${id}`,
        },
      },
      facilities: {
        hospitals: {
          list: '/api/v1/facilities/hospitals',
          detail: (id: string) => `/api/v1/facilities/hospitals/${id}`,
        },
      },
      bookings: {
        list: '/api/v1/bookings',
        detail: (id: string) => `/api/v1/bookings/${id}`,
        create: '/api/v1/bookings',
      },
      enquiries: {
        list: '/api/v1/enquiries',
        detail: (id: string) => `/api/v1/enquiries/${id}`,
        create: '/api/v1/enquiries',
      },
      users: {
        profile: '/api/v1/users/profile',
        settings: '/api/v1/users/settings',
      },
    },
    auth: {
      signin: '/api/auth/signin',
      signout: '/api/auth/signout',
      callback: '/api/auth/callback',
    },
    health: '/api/health',
  },
} as const;

/**
 * Helper function to generate route URLs
 * Handles both static and dynamic routes
 */
export function getRoute(
  routeDefinition: RouteDefinition | RoutePath | string,
  ...params: (string | number)[]
): string {
  // Handle direct path strings
  if (typeof routeDefinition === 'string') {
    return routeDefinition;
  }

  // Handle RouteDefinition
  if (typeof routeDefinition === 'object' && 'path' in routeDefinition) {
    const { path } = routeDefinition;
    
    if (typeof path === 'function') {
      return path(...params);
    }
    
    return path;
  }

  // Handle route builder functions
  if (typeof routeDefinition === 'function') {
    return routeDefinition(...params);
  }

  return '/';
}

/**
 * Get metadata for a route
 */
export function getRouteMetadata(routeDefinition: RouteDefinition): Partial<Metadata> | undefined {
  return routeDefinition.metadata;
}

/**
 * Type-safe route navigation helper
 * Usage: navigate(routes.public.medical.doctors.detail, '123')
 */
export function navigate(
  routeDefinition: RouteDefinition | RoutePath,
  ...params: (string | number)[]
): string {
  return getRoute(routeDefinition, ...params);
}

// Export for convenience
export default routes;

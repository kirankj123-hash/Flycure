/**
 * Type-Safe Route Registry
 * Centralized route definitions for the entire application
 * 
 * Benefits:
 * - Type-safe route access
 * - Prevents typos in route strings
 * - Easy to refactor (rename routes)
 * - Automatic generation of navigation menus
 * - Sitemap generation
 */

/**
 * Route builder helper for dynamic routes
 */
export const routes = {
  /**
   * Public Routes
   */
  public: {
    home: '/',
    about: '/about',
    assurance: '/assurance',
    care: '/care',
    contact: '/contact',
    estimate: '/estimate',
    faq: '/faq',
    guides: '/guides',
    stories: '/stories',

    /**
     * Medical Domain
     */
    medical: {
      departments: {
        list: '/departments',
        detail: (slug: string) => `/departments/${slug}`,
      },
      doctors: {
        list: '/doctors',
        detail: (id: string) => `/doctors/${id}`,
      },
      treatments: {
        list: '/treatments',
        detail: (slug: string) => `/treatments/${slug}`,
      },
      packages: '/packages',
    },

    /**
     * Facilities Domain
     */
    facilities: {
      hospitals: {
        list: '/hospitals',
        detail: (slug: string) => `/hospitals/${slug}`,
      },
      destinations: {
        list: '/destinations',
        detail: (country: string) => `/destinations/${country}`,
      },
    },
  },

  /**
   * Protected Routes (Authenticated Users)
   */
  protected: {
    dashboard: '/dashboard',
    profile: '/profile',
    
    appointments: {
      list: '/appointments',
      book: '/appointments/book',
      detail: (id: string) => `/appointments/${id}`,
    },

    medicalRecords: '/medical-records',
    
    enquiries: {
      list: '/enquiries',
      detail: (id: string) => `/enquiries/${id}`,
    },
  },

  /**
   * Admin Routes
   */
  admin: {
    dashboard: '/admin',
    
    enquiries: {
      list: '/admin/enquiries',
      detail: (id: string) => `/admin/enquiries/${id}`,
    },

    users: {
      list: '/admin/users',
      detail: (id: string) => `/admin/users/${id}`,
      edit: (id: string) => `/admin/users/${id}/edit`,
    },

    metrics: '/admin/metrics',
    
    content: {
      dashboard: '/admin/content',
      departments: '/admin/content/departments',
      doctors: '/admin/content/doctors',
      hospitals: '/admin/content/hospitals',
    },

    settings: '/admin/settings',
  },

  /**
   * API Routes
   */
  api: {
    health: '/api/health',
    
    enquiry: {
      create: '/api/enquiry',
      list: '/api/enquiry',
    },

    admin: {
      enquiries: '/api/admin/enquiries',
      metrics: '/api/admin/metrics',
      users: '/api/admin/users',
    },

    auth: {
      signin: '/api/auth/signin',
      signout: '/api/auth/signout',
      callback: '/api/auth/callback',
    },
  },
} as const;

/**
 * Type helper to extract route keys
 */
export type RouteKey = keyof typeof routes;
export type PublicRouteKey = keyof typeof routes.public;
export type ProtectedRouteKey = keyof typeof routes.protected;
export type AdminRouteKey = keyof typeof routes.admin;

/**
 * Helper to check if a path matches a route pattern
 */
export function matchesRoute(path: string, pattern: string): boolean {
  // Convert Next.js dynamic route pattern to regex
  const regexPattern = pattern
    .replace(/\[([^\]]+)\]/g, '([^/]+)')
    .replace(/\//g, '\\/');
  
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(path);
}

/**
 * Get all static routes (for sitemap generation)
 */
export function getAllStaticRoutes(): string[] {
  const staticRoutes: string[] = [];

  function extractRoutes(obj: Record<string, unknown>, prefix = ''): void {
    for (const [, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        staticRoutes.push(value);
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        extractRoutes(value as Record<string, unknown>, prefix);
      }
    }
  }

  extractRoutes(routes.public);
  return staticRoutes;
}

/**
 * Get dynamic route patterns (for validation)
 */
export function getDynamicRoutePatterns(): string[] {
  return [
    '/departments/[slug]',
    '/doctors/[id]',
    '/treatments/[slug]',
    '/hospitals/[slug]',
    '/destinations/[country]',
    '/appointments/[id]',
    '/enquiries/[id]',
    '/admin/enquiries/[id]',
    '/admin/users/[id]',
    '/admin/users/[id]/edit',
  ];
}

/**
 * Extract parameters from a dynamic route
 */
export function extractParams(path: string, pattern: string): Record<string, string> | null {
  const paramNames: string[] = [];
  const regexPattern = pattern.replace(/\[([^\]]+)\]/g, (_, name) => {
    paramNames.push(name);
    return '([^/]+)';
  }).replace(/\//g, '\\/');

  const regex = new RegExp(`^${regexPattern}$`);
  const match = path.match(regex);

  if (!match) return null;

  const params: Record<string, string> = {};
  paramNames.forEach((name, index) => {
    params[name] = match[index + 1];
  });

  return params;
}

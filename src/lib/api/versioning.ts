/**
 * API Versioning Structure
 * Organized by domain with version support
 * 
 * Structure:
 * /api/v1/               - Version 1 APIs
 *   /medical/            - Medical domain (departments, doctors, treatments)
 *   /facilities/         - Facilities domain (hospitals, destinations)
 *   /bookings/           - Booking management
 *   /users/              - User management
 *   /enquiries/          - Patient enquiries
 *   /auth/               - Authentication (exception - no version)
 * /api/webhooks/         - External webhook handlers
 * /api/internal/         - Internal-only APIs
 * /api/health/           - Health checks (exception - no version)
 */

export const API_STRUCTURE = {
  // ============================================
  // VERSIONED APIs
  // ============================================
  v1: {
    medical: {
      departments: '/api/v1/medical/departments',
      doctors: '/api/v1/medical/doctors',
      treatments: '/api/v1/medical/treatments',
      specialties: '/api/v1/medical/specialties',
    },
    facilities: {
      hospitals: '/api/v1/facilities/hospitals',
      destinations: '/api/v1/facilities/destinations',
      amenities: '/api/v1/facilities/amenities',
    },
    bookings: {
      create: '/api/v1/bookings',
      list: '/api/v1/bookings',
      get: '/api/v1/bookings/:id',
      cancel: '/api/v1/bookings/:id/cancel',
      reschedule: '/api/v1/bookings/:id/reschedule',
    },
    users: {
      profile: '/api/v1/users/profile',
      preferences: '/api/v1/users/preferences',
      medical_history: '/api/v1/users/medical-history',
      documents: '/api/v1/users/documents',
    },
    enquiries: {
      create: '/api/v1/enquiries',
      list: '/api/v1/enquiries',
      get: '/api/v1/enquiries/:id',
      respond: '/api/v1/enquiries/:id/respond',
    },
    admin: {
      metrics: '/api/v1/admin/metrics',
      enquiries: '/api/v1/admin/enquiries',
      users: '/api/v1/admin/users',
      content: '/api/v1/admin/content',
      analytics: '/api/v1/admin/analytics',
    },
  },

  // ============================================
  // UN-VERSIONED APIs (Special Cases)
  // ============================================
  auth: {
    signin: '/api/auth/signin',
    signout: '/api/auth/signout',
    session: '/api/auth/session',
    providers: '/api/auth/providers',
  },

  health: {
    status: '/api/health',
    readiness: '/api/health/readiness',
    liveness: '/api/health/liveness',
  },

  // ============================================
  // WEBHOOKS (External Integrations)
  // ============================================
  webhooks: {
    payment: '/api/webhooks/payment',
    booking: '/api/webhooks/booking',
    notification: '/api/webhooks/notification',
  },

  // ============================================
  // INTERNAL APIs (Service-to-Service)
  // ============================================
  internal: {
    cache_invalidation: '/api/internal/cache/invalidate',
    sync: '/api/internal/sync',
    analytics: '/api/internal/analytics',
  },
} as const;

/**
 * API route builder with versioning support
 */
export class ApiRouteBuilder {
  private version: string;
  private domain: string;
  private resource: string;

  constructor(version = 'v1') {
    this.version = version;
    this.domain = '';
    this.resource = '';
  }

  forDomain(domain: string): this {
    this.domain = domain;
    return this;
  }

  forResource(resource: string): this {
    this.resource = resource;
    return this;
  }

  build(id?: string, action?: string): string {
    let path = `/api/${this.version}`;
    
    if (this.domain) {
      path += `/${this.domain}`;
    }
    
    if (this.resource) {
      path += `/${this.resource}`;
    }
    
    if (id) {
      path += `/${id}`;
    }
    
    if (action) {
      path += `/${action}`;
    }
    
    return path;
  }

  static medical(resource: string, id?: string): string {
    return new ApiRouteBuilder()
      .forDomain('medical')
      .forResource(resource)
      .build(id);
  }

  static facilities(resource: string, id?: string): string {
    return new ApiRouteBuilder()
      .forDomain('facilities')
      .forResource(resource)
      .build(id);
  }

  static bookings(id?: string, action?: string): string {
    return new ApiRouteBuilder()
      .forDomain('bookings')
      .build(id, action);
  }

  static users(resource: string): string {
    return new ApiRouteBuilder()
      .forDomain('users')
      .forResource(resource)
      .build();
  }

  static enquiries(id?: string, action?: string): string {
    return new ApiRouteBuilder()
      .forDomain('enquiries')
      .build(id, action);
  }

  static admin(resource: string): string {
    return new ApiRouteBuilder()
      .forDomain('admin')
      .forResource(resource)
      .build();
  }
}

/**
 * Migration guide for existing routes
 */
export const MIGRATION_MAP = {
  // Current -> New
  '/api/enquiry': '/api/v1/enquiries',
  '/api/admin/metrics': '/api/v1/admin/metrics',
  '/api/admin/enquiries': '/api/v1/admin/enquiries',
  
  // Auth and health remain unchanged
  '/api/auth/*': '/api/auth/*',
  '/api/health': '/api/health',
} as const;

/**
 * API versioning best practices
 */
export const API_BEST_PRACTICES = {
  versioning: {
    strategy: 'URL-based versioning (e.g., /api/v1/)',
    breaking_changes: 'Only introduce in new versions',
    deprecation: 'Support previous version for 6 months',
    sunset: 'Announce 3 months before removal',
  },
  
  structure: {
    grouping: 'Organize by domain (medical, facilities, etc.)',
    nesting: 'Keep URL paths shallow (max 4 levels)',
    resources: 'Use plural nouns (e.g., /doctors, not /doctor)',
    actions: 'Use HTTP methods, not verbs in URLs',
  },

  special_cases: {
    auth: 'No versioning - stable contract',
    health: 'No versioning - monitoring standard',
    webhooks: 'Separate namespace for external integrations',
    internal: 'Separate namespace, not exposed publicly',
  },

  examples: {
    good: [
      '/api/v1/medical/doctors',
      '/api/v1/facilities/hospitals/123',
      '/api/v1/bookings/456/cancel',
      '/api/webhooks/payment',
    ],
    bad: [
      '/api/getDoctors', // Verb in URL
      '/api/v1/doctor/123/hospital/456/department/789', // Too nested
      '/api/medical-doctors', // Inconsistent naming
      '/api/v1/webhook/payment', // Should be in /webhooks
    ],
  },
};

export default API_STRUCTURE;

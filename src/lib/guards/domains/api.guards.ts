import type { RouteGuard } from '../types';
import { createGuard } from '../templates/base.guards';

/**
 * API Route Guards
 * Guards for API endpoints
 */

export const apiGuards: Record<string, RouteGuard> = {
  // Public API
  'api:public:health': createGuard('apiPublic', {
    path: '/api/health',
    description: 'Health check endpoint',
    rateLimit: { requests: 120, windowMs: 60000 },
  }),

  'api:public:enquiry': createGuard('apiPublic', {
    path: '/api/enquiry',
    rateLimit: { requests: 5, windowMs: 60000 },
    description: 'Public enquiry submission',
  }),

  // Protected API
  'api:protected:enquiry': createGuard('apiProtected', {
    path: '/api/enquiry',
    requiredPermissions: ['create:enquiry'],
    rateLimit: { requests: 10, windowMs: 60000 },
    description: 'Authenticated enquiry submission',
  }),

  // Admin API
  'api:admin:enquiries': createGuard('admin', {
    path: '/api/admin/enquiries',
    requiredPermissions: ['manage:enquiries'],
    rateLimit: { requests: 100, windowMs: 60000 },
    description: 'Admin enquiry management API',
  }),

  'api:admin:metrics': createGuard('admin', {
    path: '/api/admin/metrics',
    requiredPermissions: ['view:metrics'],
    rateLimit: { requests: 60, windowMs: 60000 },
    description: 'Admin metrics API',
  }),

  'api:admin:users': createGuard('admin', {
    path: '/api/admin/users',
    requiredPermissions: ['manage:users'],
    rateLimit: { requests: 60, windowMs: 60000 },
    description: 'Admin user management API',
  }),
};

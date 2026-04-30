import type { RouteGuard } from '../types';
import { createGuard } from '../templates/base.guards';

/**
 * Facilities Domain Route Guards
 * Guards for facility-related routes (hospitals, destinations)
 */

export const facilitiesGuards: Record<string, RouteGuard> = {
  // Hospitals
  'public:hospitals': createGuard('public', {
    path: '/hospitals',
    requiredPermissions: ['view:hospitals'],
    description: 'Hospital listing page',
  }),

  'public:hospitals:detail': createGuard('public', {
    path: '/hospitals/[slug]',
    requiredPermissions: ['view:hospitals'],
    description: 'Individual hospital page',
  }),

  // Destinations (future)
  'public:destinations': createGuard('public', {
    path: '/destinations',
    requiredPermissions: ['view:hospitals'],
    description: 'Medical tourism destinations',
  }),

  'public:destinations:detail': createGuard('public', {
    path: '/destinations/[country]',
    requiredPermissions: ['view:hospitals'],
    description: 'Country-specific destination page',
  }),
};

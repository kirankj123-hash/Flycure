// Central export point for guard system
export * from './types';
export * from './permissions';
export * from './guard-matcher';

// Export templates
export * from './templates/base.guards';

// Import domain guards
import { publicGuards } from './domains/public.guards';
import { medicalGuards } from './domains/medical.guards';
import { facilitiesGuards } from './domains/facilities.guards';
import { protectedGuards } from './domains/protected.guards';
import { adminGuards } from './domains/admin.guards';
import { apiGuards } from './domains/api.guards';

/**
 * Consolidated Route Guards
 * Merges all domain-specific guards into a single object
 * This maintains backward compatibility while organizing guards by domain
 */
export const routeGuards = {
  ...publicGuards,
  ...medicalGuards,
  ...facilitiesGuards,
  ...protectedGuards,
  ...adminGuards,
  ...apiGuards,
} as const;

/**
 * Get all route guards
 */
export function getAllGuards() {
  return routeGuards;
}

/**
 * Get guard by key
 */
export function getGuardByKey(key: string) {
  return routeGuards[key as keyof typeof routeGuards] || null;
}

/**
 * Get guards by domain
 */
export function getGuardsByDomain(domain: 'public' | 'medical' | 'facilities' | 'protected' | 'admin' | 'api') {
  switch (domain) {
    case 'public':
      return publicGuards;
    case 'medical':
      return medicalGuards;
    case 'facilities':
      return facilitiesGuards;
    case 'protected':
      return protectedGuards;
    case 'admin':
      return adminGuards;
    case 'api':
      return apiGuards;
    default:
      return {};
  }
}

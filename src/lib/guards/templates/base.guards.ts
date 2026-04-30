import type { RouteGuard } from '../types';

/**
 * Base Guard Templates
 * Reusable guard configurations to reduce duplication
 */

export const guardTemplates = {
  /**
   * Public route - accessible to all users
   */
  public: {
    requiredAuth: false,
    description: 'Public route accessible to all users',
  } as Partial<RouteGuard>,

  /**
   * Protected route - requires authentication
   */
  protected: {
    requiredAuth: true,
    requiredPermissions: ['view:dashboard'],
    description: 'Protected route requiring authentication',
  } as Partial<RouteGuard>,

  /**
   * Admin route - requires admin or super_admin role
   */
  admin: {
    requiredAuth: true,
    requiredRoles: ['admin', 'super_admin'],
    description: 'Admin route requiring elevated permissions',
  } as Partial<RouteGuard>,

  /**
   * Super admin route - requires super_admin role only
   */
  superAdmin: {
    requiredAuth: true,
    requiredRoles: ['super_admin'],
    description: 'Super admin route requiring highest level permissions',
  } as Partial<RouteGuard>,

  /**
   * Healthcare provider route - requires healthcare_provider role
   */
  healthcareProvider: {
    requiredAuth: true,
    requiredRoles: ['healthcare_provider', 'admin', 'super_admin'],
    description: 'Healthcare provider route',
  } as Partial<RouteGuard>,

  /**
   * API route with rate limiting
   */
  apiPublic: {
    requiredAuth: false,
    rateLimit: { requests: 60, windowMs: 60000 },
    description: 'Public API endpoint with rate limiting',
  } as Partial<RouteGuard>,

  /**
   * Protected API route with rate limiting
   */
  apiProtected: {
    requiredAuth: true,
    rateLimit: { requests: 100, windowMs: 60000 },
    description: 'Protected API endpoint with rate limiting',
  } as Partial<RouteGuard>,
} as const;

export type GuardTemplate = keyof typeof guardTemplates;

/**
 * Helper function to create a guard from a template with overrides
 * @param template - The base template to use
 * @param overrides - Specific overrides for this guard
 * @returns Complete RouteGuard configuration
 */
export function createGuard(
  template: GuardTemplate,
  overrides: Partial<RouteGuard>
): RouteGuard {
  return {
    ...guardTemplates[template],
    ...overrides,
    path: overrides.path || '/',
    requiredAuth: overrides.requiredAuth ?? guardTemplates[template].requiredAuth ?? false,
  } as RouteGuard;
}

/**
 * Helper to create multiple guards with same template
 */
export function createGuards(
  template: GuardTemplate,
  guards: Record<string, Partial<RouteGuard>>
): Record<string, RouteGuard> {
  return Object.fromEntries(
    Object.entries(guards).map(([key, config]) => [
      key,
      createGuard(template, config),
    ])
  );
}

import { RouteGuard, GuardCheckResult, UserSession } from './types';
import { routeGuards } from './route-guards';
import { hasAllPermissions } from './permissions';

/**
 * Convert route pattern to regex for matching
 * Handles Next.js dynamic routes like [slug] and [...slug]
 */
function patternToRegex(pattern: string): RegExp {
  // Escape special regex characters except our placeholders
  const regexPattern = pattern
    .replace(/\//g, '\\/')
    .replace(/\./g, '\\.')
    // Match [...slug] catch-all routes
    .replace(/\[\.\.\.(\w+)\]/g, '(?<$1>.*)')
    // Match [slug] dynamic routes
    .replace(/\[(\w+)\]/g, '(?<$1>[^/]+)')
    // Handle route groups (public), (protected), etc.
    .replace(/\\\((\w+)\\\)/g, '');
  
  // Ensure exact match
  return new RegExp(`^${regexPattern}$`);
}

/**
 * Find the most specific guard for a given pathname
 */
export function findGuardForPath(pathname: string): RouteGuard | null {
  let bestMatch: { guard: RouteGuard; specificity: number } | null = null;

  for (const [, guard] of Object.entries(routeGuards)) {
    const regex = patternToRegex(guard.path);
    
    if (regex.test(pathname)) {
      // Calculate specificity (more specific paths have more segments)
      const specificity = guard.path.split('/').length;
      
      if (!bestMatch || specificity > bestMatch.specificity) {
        bestMatch = { guard, specificity };
      }
    }
  }

  return bestMatch?.guard || null;
}

/**
 * Check if a user can access a route based on guard rules
 */
export function canAccess(
  guard: RouteGuard,
  session: UserSession | null
): GuardCheckResult {
  // Check authentication requirement
  if (guard.requiredAuth && !session) {
    return { 
      allowed: false, 
      reason: 'Authentication required',
      redirectTo: '/api/auth/signin'
    };
  }

  // Check role requirement
  if (guard.requiredRoles && session) {
    const userRole = session.user.role;
    if (!guard.requiredRoles.includes(userRole)) {
      return { 
        allowed: false, 
        reason: `Role ${userRole} not authorized. Required: ${guard.requiredRoles.join(' or ')}`,
        redirectTo: '/unauthorized'
      };
    }
  }

  // Check permission requirement
  if (guard.requiredPermissions && session) {
    const userRole = session.user.role;
    const hasPermissions = hasAllPermissions(userRole, guard.requiredPermissions);
    
    if (!hasPermissions) {
      return { 
        allowed: false, 
        reason: `Missing required permissions: ${guard.requiredPermissions.join(', ')}`,
        redirectTo: '/unauthorized'
      };
    }
  }

  return { allowed: true };
}

/**
 * Get all guards that match a specific role
 */
export function getGuardsForRole(role: string): RouteGuard[] {
  return Object.values(routeGuards).filter(guard => {
    if (!guard.requiredRoles) return true;
    return guard.requiredRoles.includes(role as 'guest' | 'user' | 'healthcare_provider' | 'admin' | 'super_admin');
  });
}

/**
 * Check if a path is protected (requires authentication)
 */
export function isProtectedPath(pathname: string): boolean {
  const guard = findGuardForPath(pathname);
  return guard?.requiredAuth || false;
}

/**
 * Check if a path is an admin path
 */
export function isAdminPath(pathname: string): boolean {
  const guard = findGuardForPath(pathname);
  return guard?.requiredRoles?.includes('admin') || 
         guard?.requiredRoles?.includes('super_admin') || 
         false;
}

/**
 * Get the required permissions for a path
 */
export function getRequiredPermissions(pathname: string) {
  const guard = findGuardForPath(pathname);
  return guard?.requiredPermissions || [];
}

import type { RouteGuard } from './types';

/**
 * Centralized Route Guards Configuration
 * Defines access control for all routes in the application
 */
export const routeGuards: Record<string, RouteGuard> = {
  // ==================== PUBLIC ROUTES ====================
  'public:home': {
    path: '/',
    requiredAuth: false,
    description: 'Public home page',
  },
  
  'public:about': {
    path: '/about',
    requiredAuth: false,
    description: 'About page',
  },
  
  'public:departments': {
    path: '/departments',
    requiredAuth: false,
    requiredPermissions: ['view:departments'],
    description: 'Department listing page',
  },
  
  'public:departments:detail': {
    path: '/departments/[slug]',
    requiredAuth: false,
    requiredPermissions: ['view:departments'],
    description: 'Individual department page',
  },
  
  'public:doctors': {
    path: '/doctors',
    requiredAuth: false,
    requiredPermissions: ['view:doctors'],
    description: 'Doctor listing page',
  },
  
  'public:doctors:detail': {
    path: '/doctors/[id]',
    requiredAuth: false,
    requiredPermissions: ['view:doctors'],
    description: 'Individual doctor profile',
  },
  
  'public:hospitals': {
    path: '/hospitals',
    requiredAuth: false,
    requiredPermissions: ['view:hospitals'],
    description: 'Hospital listing page',
  },
  
  'public:hospitals:detail': {
    path: '/hospitals/[slug]',
    requiredAuth: false,
    requiredPermissions: ['view:hospitals'],
    description: 'Individual hospital page',
  },
  
  // ==================== PROTECTED ROUTES ====================
  'protected:dashboard': {
    path: '/(protected)/dashboard',
    requiredAuth: true,
    requiredPermissions: ['view:dashboard'],
    description: 'User dashboard',
  },
  
  'protected:profile': {
    path: '/(protected)/profile',
    requiredAuth: true,
    requiredPermissions: ['update:profile'],
    description: 'User profile management',
  },
  
  'protected:appointments': {
    path: '/(protected)/appointments',
    requiredAuth: true,
    requiredPermissions: ['view:appointments'],
    description: 'View user appointments',
  },
  
  'protected:appointments:book': {
    path: '/(protected)/appointments/book',
    requiredAuth: true,
    requiredPermissions: ['book:appointment'],
    rateLimit: { requests: 10, windowMs: 60000 },
    description: 'Book new appointment',
  },
  
  'protected:medical-records': {
    path: '/(protected)/medical-records',
    requiredAuth: true,
    requiredPermissions: ['view:medical-records'],
    description: 'View medical records',
  },
  
  'protected:enquiries': {
    path: '/(protected)/enquiries',
    requiredAuth: true,
    requiredPermissions: ['view:enquiries'],
    description: 'View user enquiries',
  },
  
  // ==================== ADMIN ROUTES ====================
  'admin:dashboard': {
    path: '/(admin)/admin',
    requiredAuth: true,
    requiredRoles: ['admin', 'super_admin'],
    description: 'Admin dashboard',
  },
  
  'admin:enquiries': {
    path: '/(admin)/admin/enquiries',
    requiredAuth: true,
    requiredRoles: ['admin', 'super_admin'],
    requiredPermissions: ['manage:enquiries'],
    description: 'Manage all enquiries',
  },
  
  'admin:users': {
    path: '/(admin)/admin/users',
    requiredAuth: true,
    requiredRoles: ['admin', 'super_admin'],
    requiredPermissions: ['manage:users'],
    description: 'User management',
  },
  
  'admin:users:edit': {
    path: '/(admin)/admin/users/[id]',
    requiredAuth: true,
    requiredRoles: ['super_admin'],
    requiredPermissions: ['manage:users'],
    description: 'Edit specific user',
  },
  
  'admin:metrics': {
    path: '/(admin)/admin/metrics',
    requiredAuth: true,
    requiredRoles: ['admin', 'super_admin'],
    requiredPermissions: ['view:metrics'],
    description: 'System metrics and analytics',
  },
  
  'admin:content': {
    path: '/(admin)/admin/content',
    requiredAuth: true,
    requiredRoles: ['admin', 'super_admin'],
    requiredPermissions: ['manage:content'],
    description: 'Content management',
  },
  
  // ==================== API ROUTES ====================
  'api:public:health': {
    path: '/api/health',
    requiredAuth: false,
    description: 'Health check endpoint',
  },
  
  'api:public:enquiry': {
    path: '/api/enquiry',
    requiredAuth: false,
    rateLimit: { requests: 5, windowMs: 60000 },
    description: 'Public enquiry submission',
  },
  
  'api:protected:enquiry': {
    path: '/api/(protected)/enquiry',
    requiredAuth: true,
    requiredPermissions: ['create:enquiry'],
    rateLimit: { requests: 10, windowMs: 60000 },
    description: 'Authenticated enquiry submission',
  },
  
  'api:admin:enquiries': {
    path: '/api/(admin)/admin/enquiries',
    requiredAuth: true,
    requiredRoles: ['admin', 'super_admin'],
    requiredPermissions: ['manage:enquiries'],
    description: 'Admin enquiry management API',
  },
  
  'api:admin:metrics': {
    path: '/api/(admin)/admin/metrics',
    requiredAuth: true,
    requiredRoles: ['admin', 'super_admin'],
    requiredPermissions: ['view:metrics'],
    description: 'Admin metrics API',
  },
};

/**
 * Get all route guards
 */
export function getAllGuards(): Record<string, RouteGuard> {
  return routeGuards;
}

/**
 * Get guard by key
 */
export function getGuardByKey(key: string): RouteGuard | null {
  return routeGuards[key] || null;
}

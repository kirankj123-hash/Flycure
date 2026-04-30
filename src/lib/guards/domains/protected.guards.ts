import type { RouteGuard } from '../types';
import { createGuard } from '../templates/base.guards';

/**
 * Protected Route Guards
 * Guards for authenticated user routes (dashboard, profile, appointments, etc.)
 */

export const protectedGuards: Record<string, RouteGuard> = {
  // Dashboard
  'protected:dashboard': createGuard('protected', {
    path: '/(protected)/dashboard',
    requiredPermissions: ['view:dashboard'],
    description: 'User dashboard',
  }),

  // Profile
  'protected:profile': createGuard('protected', {
    path: '/(protected)/profile',
    requiredPermissions: ['update:profile'],
    description: 'User profile management',
  }),

  // Appointments
  'protected:appointments': createGuard('protected', {
    path: '/(protected)/appointments',
    requiredPermissions: ['view:appointments'],
    description: 'View user appointments',
  }),

  'protected:appointments:book': createGuard('protected', {
    path: '/(protected)/appointments/book',
    requiredPermissions: ['book:appointment'],
    rateLimit: { requests: 10, windowMs: 60000 },
    description: 'Book new appointment',
  }),

  // Medical Records
  'protected:medical-records': createGuard('protected', {
    path: '/(protected)/medical-records',
    requiredPermissions: ['view:medical-records'],
    description: 'View medical records',
  }),

  // Enquiries
  'protected:enquiries': createGuard('protected', {
    path: '/(protected)/enquiries',
    requiredPermissions: ['view:enquiries'],
    description: 'View user enquiries',
  }),
};

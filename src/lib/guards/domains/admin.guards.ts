import type { RouteGuard } from '../types';
import { createGuard } from '../templates/base.guards';

/**
 * Admin Route Guards
 * Guards for admin-only routes (user management, enquiry management, metrics, etc.)
 */

export const adminGuards: Record<string, RouteGuard> = {
  // Admin Dashboard
  'admin:dashboard': createGuard('admin', {
    path: '/(admin)/admin',
    description: 'Admin dashboard',
  }),

  // Enquiry Management
  'admin:enquiries': createGuard('admin', {
    path: '/(admin)/admin/enquiries',
    requiredPermissions: ['manage:enquiries'],
    description: 'Manage all enquiries',
  }),

  'admin:enquiries:detail': createGuard('admin', {
    path: '/(admin)/admin/enquiries/[id]',
    requiredPermissions: ['manage:enquiries'],
    description: 'View/edit specific enquiry',
  }),

  // User Management
  'admin:users': createGuard('admin', {
    path: '/(admin)/admin/users',
    requiredPermissions: ['manage:users'],
    description: 'User management',
  }),

  'admin:users:edit': createGuard('superAdmin', {
    path: '/(admin)/admin/users/[id]',
    requiredPermissions: ['manage:users'],
    description: 'Edit specific user',
  }),

  // Metrics & Analytics
  'admin:metrics': createGuard('admin', {
    path: '/(admin)/admin/metrics',
    requiredPermissions: ['view:metrics'],
    description: 'System metrics and analytics',
  }),

  // Content Management
  'admin:content': createGuard('admin', {
    path: '/(admin)/admin/content',
    requiredPermissions: ['manage:content'],
    description: 'Content management',
  }),

  'admin:content:departments': createGuard('admin', {
    path: '/(admin)/admin/content/departments',
    requiredPermissions: ['manage:departments'],
    description: 'Manage departments',
  }),

  'admin:content:doctors': createGuard('admin', {
    path: '/(admin)/admin/content/doctors',
    requiredPermissions: ['manage:doctors'],
    description: 'Manage doctors',
  }),

  'admin:content:hospitals': createGuard('admin', {
    path: '/(admin)/admin/content/hospitals',
    requiredPermissions: ['manage:hospitals'],
    description: 'Manage hospitals',
  }),

  // Settings
  'admin:settings': createGuard('superAdmin', {
    path: '/(admin)/admin/settings',
    requiredPermissions: ['system:admin'],
    description: 'System settings',
  }),
};

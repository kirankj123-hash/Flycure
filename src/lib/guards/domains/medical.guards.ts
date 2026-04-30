import type { RouteGuard } from '../types';
import { createGuard } from '../templates/base.guards';

/**
 * Medical Domain Route Guards
 * Guards for medical-related routes (departments, doctors, treatments)
 */

export const medicalGuards: Record<string, RouteGuard> = {
  // Departments
  'public:departments': createGuard('public', {
    path: '/departments',
    requiredPermissions: ['view:departments'],
    description: 'Department listing page',
  }),

  'public:departments:detail': createGuard('public', {
    path: '/departments/[slug]',
    requiredPermissions: ['view:departments'],
    description: 'Individual department page',
  }),

  // Doctors
  'public:doctors': createGuard('public', {
    path: '/doctors',
    requiredPermissions: ['view:doctors'],
    description: 'Doctor listing page',
  }),

  'public:doctors:detail': createGuard('public', {
    path: '/doctors/[id]',
    requiredPermissions: ['view:doctors'],
    description: 'Individual doctor profile',
  }),

  // Treatments (future)
  'public:treatments': createGuard('public', {
    path: '/treatments',
    requiredPermissions: ['view:departments'],
    description: 'Treatment listing page',
  }),

  'public:treatments:detail': createGuard('public', {
    path: '/treatments/[slug]',
    requiredPermissions: ['view:departments'],
    description: 'Individual treatment page',
  }),
};

import type { RouteGuard } from '../types';
import { createGuard } from '../templates/base.guards';

/**
 * Public Route Guards
 * Guards for publicly accessible routes (home, about, contact, etc.)
 */

export const publicGuards: Record<string, RouteGuard> = {
  'public:home': createGuard('public', {
    path: '/',
    description: 'Public home page',
  }),

  'public:about': createGuard('public', {
    path: '/about',
    description: 'About page',
  }),

  'public:contact': createGuard('public', {
    path: '/contact',
    description: 'Contact page',
  }),
};

/**
 * Navigation Component Styles
 * Headers, footers, navigation menus
 * All styles are direct references to componentPatterns
 */

import { componentPatterns } from './tokens';

// ==================== NAVIGATION HEADER ====================
export const nav = {
  header: componentPatterns.nav.header,
  container: componentPatterns.nav.container,
  content: componentPatterns.nav.content,
  logo: componentPatterns.nav.logo,
  brand: componentPatterns.nav.brand,
  links: componentPatterns.nav.links,
  link: componentPatterns.nav.link,
  cta: `${componentPatterns.button.primary} ${componentPatterns.nav.cta}`,
  hamburgerIcon: 'w-6 h-6',
  mobile: componentPatterns.nav.mobile,
} as const;

// ==================== FOOTER ====================
export const footer = {
  container: componentPatterns.nav.footer.container,
  inner: componentPatterns.nav.footer.inner,
  grid: componentPatterns.nav.footer.grid,
  section: componentPatterns.nav.footer.section,
  heading: componentPatterns.nav.footer.heading,
  link: componentPatterns.nav.footer.link,
  bottom: componentPatterns.nav.footer.bottom,
  copyright: componentPatterns.nav.footer.copyright,
} as const;

// Consolidated exports
export const navigation = {
  nav,
  footer,
} as const;

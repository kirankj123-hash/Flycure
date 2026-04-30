/**
 * Layout Component Styles
 * Page layouts, sections, grids, hero sections
 * All styles are direct references to componentPatterns
 */

import { componentPatterns } from './tokens';

// ==================== PAGE LAYOUTS ====================
export const page = {
  // Main page wrapper
  root: componentPatterns.layout.page_legacy.root,
  main: componentPatterns.layout.page_legacy.main,
  section: componentPatterns.layout.page_legacy.section,
  grid: componentPatterns.layout.page_legacy.grid,
  
  // Simple references
  container: componentPatterns.layout.page,
} as const;

// ==================== LAYOUT PATTERNS ====================
export const layout = {
  page: componentPatterns.layout.page,
  container: componentPatterns.layout.container,
  section: componentPatterns.layout.section,
  twoColumn: componentPatterns.layout.twoColumn,
  grid: {
    two: componentPatterns.layout.grid.two,
    three: componentPatterns.layout.grid.three,
    four: componentPatterns.layout.grid.four,
  },
} as const;

// ==================== SECTIONS ====================
export const section = {
  base: componentPatterns.section.base,
  contained: componentPatterns.section.contained,
  hero: componentPatterns.section.hero,
  content: componentPatterns.section.content,
  feature: componentPatterns.section.feature,
} as const;

// ==================== HERO SECTIONS ====================
export const hero = {
  container: componentPatterns.hero.container,
  content: componentPatterns.hero.content,
  title: componentPatterns.hero.title,
  subtitle: componentPatterns.hero.subtitle,
  description: componentPatterns.hero.description,
  cta: componentPatterns.hero.cta,
  image: componentPatterns.hero.image,
  // Deprecated - for backward compatibility
  card: componentPatterns.hero.card,
  highlight: componentPatterns.hero.highlight,
} as const;

// ==================== LISTS ====================
export const list = {
  vertical: componentPatterns.list.vertical,
  horizontal: componentPatterns.list.horizontal,
  unordered: componentPatterns.list.unordered,
  ordered: componentPatterns.list.ordered,
} as const;

// Consolidated exports
export const layouts = {
  page,
  layout,
  section,
  hero,
  list,
} as const;

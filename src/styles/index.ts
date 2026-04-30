/**
 * Design System Barrel Export
 * Central export point for all design system components
 */

// Core tokens
export { tokens, componentPatterns } from './tokens';
export type { DesignTokens, ComponentPatterns, ColorTokens, SpacingTokens } from './tokens';

// Import tokens for internal use
import { tokens } from './tokens';

// ==================== CONSOLIDATED CATEGORY EXPORTS ====================
// Import from broad category files instead of individual component files
import { primitives, button, card, input, form, image } from './primitives';
import { layouts, page, layout, section, hero, list } from './layouts';
import { navigation, nav, footer } from './navigation';

// Re-export by category
export { primitives, layouts, navigation };

// Re-export individual categories for convenience
export { button, card, input, form, image };
export { page, layout, section, hero, list };
export { nav, footer };

// ==================== BACKWARD COMPATIBILITY ====================
// Legacy component style exports for backward compatibility
// These are now aliases to the new category-based exports
export const buttonStyles = button;
export const cardStyles = card;
export const formStyles = form;
export const heroStyles = hero;
export const navStyles = nav;
export const footerStyles = footer;
export const layoutStyles = {
  page: page,
  container: layout.container,
  section: section.content,
  layout: {
    twoColumn: layout.twoColumn,
  },
  gridTwo: layout.grid.two,
  gridThree: layout.grid.three,
  gridFour: layout.grid.four,
};
export const enquiryFormStyles = {
  ...form,
  // Add backward compat properties if needed
  fieldContainer: input.field,
  select: input.base,
  errorText: input.errorMessage,
  requiredIndicator: `${tokens.colors.state.error} ml-1`,
  optionalIndicator: `${tokens.colors.text.muted} ${tokens.typography.size.xs} ml-1`,
};

// Combined styles object for backward compatibility
export const styles = {
  // Primitives
  button: buttonStyles,
  card: cardStyles,
  form: formStyles,
  
  // Navigation
  nav: navStyles,
  footer: footerStyles,
  
  // Layouts
  ...layoutStyles, // Spread layout styles to maintain flat structure
  hero: heroStyles,
  
  // Special forms
  enquiryForm: enquiryFormStyles,
} as const;

// ==================== UTILITY FUNCTIONS ====================
export function combineTokens(...tokenClasses: (string | undefined | null | false)[]): string {
  return tokenClasses.filter(Boolean).join(' ');
}

// ==================== TYPES ====================
export type StyleTokens = typeof styles;
export type ComponentStyles = keyof typeof styles;
export type PrimitiveStyles = typeof primitives;
export type LayoutStyles = typeof layouts;
export type NavigationStyles = typeof navigation;

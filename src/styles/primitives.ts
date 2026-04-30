/**
 * Primitive Component Styles
 * Basic building blocks: buttons, inputs, cards
 * All styles are direct references to componentPatterns
 */

import { componentPatterns } from './tokens';

// ==================== BUTTONS ====================
export const button = {
  base: componentPatterns.button.base,
  primary: componentPatterns.button.primary,
  secondary: componentPatterns.button.secondary,
  destructive: componentPatterns.button.destructive,
  outline: componentPatterns.button.outline,
  ghost: componentPatterns.button.ghost,
  link: componentPatterns.button.link,
  sm: componentPatterns.button.sm,
  default: componentPatterns.button.default,
  lg: componentPatterns.button.lg,
  icon: componentPatterns.button.icon,
} as const;

// ==================== CARDS ====================
export const card = {
  base: `${componentPatterns.card.base} ${componentPatterns.card.interactive}`,
  clickable: componentPatterns.card.clickable,
  flat: componentPatterns.card.flat,
  header: componentPatterns.card.header,
  title: componentPatterns.card.title,
  description: componentPatterns.card.description,
  icon: componentPatterns.card.icon,
} as const;

// ==================== INPUTS & FORMS ====================
export const input = {
  base: componentPatterns.input.base,
  error: componentPatterns.input.error,
  label: componentPatterns.input.label,
  errorMessage: componentPatterns.input.errorMessage,
  field: componentPatterns.input.field,
} as const;

export const form = {
  container: componentPatterns.form.container,
  section: componentPatterns.form.section,
  buttonGroup: componentPatterns.form.buttonGroup,
  optional: componentPatterns.form.optional,
  field: input.field,
  label: input.label,
  input: input.base,
  error: input.errorMessage,
  inputError: `${input.base} ${input.error}`,
  // Additional form elements
  textarea: `${input.base} min-h-[60px]`,
} as const;

// ==================== IMAGES ====================
export const image = {
  cover: componentPatterns.image.cover,
  contain: componentPatterns.image.contain,
  responsive: componentPatterns.image.responsive,
} as const;

// Consolidated exports
export const primitives = {
  button,
  card,
  input,
  form,
  image,
} as const;

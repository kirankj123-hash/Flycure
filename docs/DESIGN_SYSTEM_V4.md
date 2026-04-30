# Design System Structure (v4.0)

This document describes the modular design system architecture implemented for scalability and maintainability.

## Overview

The design system has been refactored from a single monolithic file into a modular, organized structure that scales efficiently for large applications.

## Directory Structure

```
src/styles/
├── index.ts                          # Barrel export (main entry point)
├── tokens.ts                         # Core design tokens
├── components/                       # Component-specific styles
│   ├── button.styles.ts             # Button styles
│   ├── card.styles.ts               # Card styles
│   ├── form.styles.ts               # Form input styles
│   ├── nav.styles.ts                # Navigation styles
│   ├── hero.styles.ts               # Hero section styles
│   ├── footer.styles.ts             # Footer styles
│   ├── layout.styles.ts             # Layout patterns
│   └── enquiry-form.styles.ts       # Enquiry form styles
└── design-system.ts                 # ⚠️ DEPRECATED (kept for reference)
```

## Architecture

### 1. Design Tokens (`tokens.ts`)

Core design values that form the foundation of the design system:

- **Colors**: Brand colors, semantic colors
- **Typography**: Font sizes, weights
- **Spacing**: Padding, margins, gaps
- **Borders**: Border styles, radius, focus states
- **Shadows**: Elevation levels
- **Transitions**: Animation timings
- **Layout**: Grid systems, responsive patterns
- **Backgrounds**: Surface colors
- **Sizing**: Common dimensions
- **Visibility**: Responsive display utilities

**Example:**
```typescript
import { tokens } from '@/styles';

const myClass = `${tokens.colors.primary} ${tokens.spacing.lg}`;
```

### 2. Component Styles

Modular style definitions for specific component types:

#### Button Styles (`components/button.styles.ts`)
- Base structure
- Variants: primary, secondary, destructive, outline, ghost, link
- Sizes: sm, default, lg, icon

#### Form Styles (`components/form.styles.ts`)
- Field containers
- Labels, inputs, textareas
- Error messages
- Required/optional indicators

#### Navigation Styles (`components/nav.styles.ts`)
- Header, container, content
- Desktop and mobile navigation
- Mobile menu states

#### Card Styles (`components/card.styles.ts`)
- Base card structure
- Headers, titles, descriptions
- Icons

#### Hero Styles (`components/hero.styles.ts`)
- Hero containers
- Grid layouts
- Content styling

#### Footer Styles (`components/footer.styles.ts`)
- Footer containers
- Link sections
- Newsletter forms
- Social links

#### Layout Styles (`components/layout.styles.ts`)
- Page layouts
- Grid patterns
- Hero grids
- Image patterns
- Accessibility utilities

#### Enquiry Form Styles (`components/enquiry-form.styles.ts`)
- Form-specific styling
- Field containers
- Select dropdowns

### 3. Barrel Export (`index.ts`)

Central import point that provides:
- All tokens
- All component styles
- Backward-compatible `styles` object
- Utility functions (`combineTokens`)
- TypeScript types

## Usage

### Basic Import (Recommended)

```typescript
import { styles, tokens } from '@/styles';

// Use component styles
<button className={styles.button.base + ' ' + styles.button.primary}>
  Click me
</button>

// Use tokens directly
<div className={tokens.colors.primary}>
  Content
</div>
```

### Named Imports (For Specific Components)

```typescript
import { buttonStyles, tokens } from '@/styles';

<button className={buttonStyles.base + ' ' + buttonStyles.primary}>
  Click me
</button>
```

### Import Only What You Need

```typescript
import { cardStyles } from '@/styles';

<div className={cardStyles.base}>
  <h2 className={cardStyles.title}>Card Title</h2>
  <p className={cardStyles.description}>Description</p>
</div>
```

## Benefits

### 1. Modularity
- Each component style is in its own file
- Easy to locate and update specific styles
- Reduced file sizes for easier navigation

### 2. Scalability
- Add new component styles without modifying existing files
- Import only what you need (tree-shaking friendly)
- Clear organization for 1000+ page applications

### 3. Maintainability
- Single responsibility per file
- Clear dependencies (tokens → component styles)
- Easy to understand and modify

### 4. Performance
- Better code splitting potential
- Smaller bundle sizes with selective imports
- Faster build times with isolated changes

### 5. Developer Experience
- Autocomplete works better with smaller, focused files
- Easier code reviews (changes are isolated)
- Clear file naming convention
- Backward compatible with existing code

## Migration from Old System

The old `design-system.ts` file has been preserved but is deprecated. All imports should use the new structure:

**Old Way (Still works but deprecated):**
```typescript
import { styles, tokens } from '@/styles/design-system';
```

**New Way (Recommended):**
```typescript
import { styles, tokens } from '@/styles';
```

All existing code has been updated to use the new import path. The functionality remains identical - only the internal organization has changed.

## Adding New Styles

### 1. Create a New Component Style File

```typescript
// src/styles/components/modal.styles.ts
import { tokens } from '../tokens';

export const modalStyles = {
  overlay: `fixed inset-0 ${tokens.backgrounds.page} bg-opacity-50`,
  container: `${tokens.backgrounds.card} ${tokens.borders.rounded} ${tokens.shadows.lg}`,
  header: `${tokens.spacing.lg} ${tokens.borders.base}`,
  content: `${tokens.spacing.md}`,
  footer: `${tokens.spacing.lg} flex justify-end gap-2`,
} as const;
```

### 2. Export from Index

```typescript
// src/styles/index.ts
export { modalStyles } from './components/modal.styles';

export const styles = {
  // ... existing styles
  modal: modalStyles,
} as const;
```

### 3. Use in Components

```typescript
import { styles } from '@/styles';

<div className={styles.modal.overlay}>
  <div className={styles.modal.container}>
    <div className={styles.modal.header}>Title</div>
    <div className={styles.modal.content}>Content</div>
    <div className={styles.modal.footer}>Actions</div>
  </div>
</div>
```

## Best Practices

### 1. Use Tokens for Consistency
Always build component styles from tokens rather than hardcoding values:

```typescript
// ✅ Good
const buttonStyles = {
  primary: `${tokens.colors.primary} ${tokens.spacing.md}`,
};

// ❌ Bad
const buttonStyles = {
  primary: 'bg-emerald-500 text-white p-4',
};
```

### 2. Keep Files Focused
Each component style file should handle one logical component family:

```typescript
// ✅ Good: button.styles.ts handles all button variants
// ✅ Good: form.styles.ts handles all form elements
// ❌ Bad: ui.styles.ts handling buttons, forms, cards, etc.
```

### 3. Use TypeScript `as const`
Always export with `as const` for better type inference:

```typescript
export const myStyles = {
  container: 'flex items-center',
} as const;
```

### 4. Import from Index
Always import from `@/styles` rather than direct file paths:

```typescript
// ✅ Good
import { styles, tokens } from '@/styles';

// ❌ Bad
import { buttonStyles } from '@/styles/components/button.styles';
```

## Testing

All 146 tests pass with the new structure, confirming:
- ✅ Backward compatibility
- ✅ No style regressions
- ✅ All components render correctly
- ✅ Type safety maintained

## Future Enhancements

Potential improvements for future iterations:

1. **Theme Variants**: Support for light/dark modes
2. **CSS Variables**: Migration to CSS custom properties
3. **Component Composition**: Higher-order style functions
4. **Design Tokens as JSON**: Export tokens for design tools
5. **Runtime Theming**: Dynamic theme switching
6. **Style Variants with CVA**: Use class-variance-authority for complex variants

## Related Documentation

- `ROUTE_ORGANIZATION.md` - Route structure and organization
- `DESIGN_SYSTEM.md` - Original design system documentation
- `README.md` - Project overview and setup

## Version History

- **v4.0** (Current): Modular architecture with component-specific files
- **v3.0**: Token-based monolithic design system
- **v2.0**: Component-ready styles
- **v1.0**: Inline styles

---

**Last Updated:** October 1, 2025

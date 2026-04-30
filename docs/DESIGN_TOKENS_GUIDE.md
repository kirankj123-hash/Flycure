# Design Tokens Guide

## Overview

This guide explains the token-based design system implemented in the Flycure Health application. The system provides a single source of truth for all design values, ensuring consistency across the entire application.

## Table of Contents

- [Philosophy](#philosophy)
- [Token Categories](#token-categories)
- [Component Patterns](#component-patterns)
- [Usage Examples](#usage-examples)
- [Migration Guide](#migration-guide)
- [Best Practices](#best-practices)

## Philosophy

### Why Token-Based Design?

**Before:**
```typescript
// ❌ Hardcoded values scattered across components
const styles = {
  container: 'bg-gray-900 text-white px-4 py-12',
  title: 'text-4xl font-bold text-gray-900',
}
```

**Problems:**
- ❌ Duplication: Same values repeated across 10+ files
- ❌ Inconsistency: Easy for components to diverge
- ❌ Maintenance: Changing spacing requires updating multiple files
- ❌ Not scalable: 1000 pages = massive duplication

**After:**
```typescript
// ✅ Token-based composition
import { tokens, componentPatterns } from '@/styles/tokens';

const styles = {
  container: componentPatterns.nav.container,
  title: tokens.typography.heading.h1,
}
```

**Benefits:**
- ✅ **Consistency**: All components use same spacing scale
- ✅ **Maintainability**: Change once, affects all components
- ✅ **Scalability**: Add new components easily with patterns
- ✅ **Theming**: Easy dark mode and brand variants

## Token Categories

### 1. Color Tokens

```typescript
import { tokens } from '@/styles/tokens';

// Brand colors
tokens.colors.brand.primary          // emerald-500
tokens.colors.brand.primaryDark      // emerald-600
tokens.colors.brand.secondary        // blue-600

// Background colors
tokens.colors.background.primary     // bg-white
tokens.colors.background.secondary   // bg-gray-50
tokens.colors.background.tertiary    // bg-gray-100

// Text colors
tokens.colors.text.primary           // text-gray-900
tokens.colors.text.secondary         // text-gray-700
tokens.colors.text.muted             // text-gray-500
tokens.colors.text.inverse           // text-white

// Border colors
tokens.colors.border.default         // border-gray-300
tokens.colors.border.focus           // border-emerald-500

// State colors
tokens.colors.state.success          // text-green-600
tokens.colors.state.error            // text-red-600
tokens.colors.state.warning          // text-yellow-600
tokens.colors.state.info             // text-blue-600
```

**Usage:**
```typescript
const cardStyles = {
  base: `${tokens.colors.background.primary} ${tokens.colors.border.default}`,
  heading: tokens.colors.text.primary,
  description: tokens.colors.text.secondary,
};
```

### 2. Spacing Tokens

```typescript
// Container widths
tokens.spacing.container.sm          // max-w-3xl
tokens.spacing.container.md          // max-w-5xl
tokens.spacing.container.lg          // max-w-7xl
tokens.spacing.container.full        // w-full

// Padding (all sides)
tokens.spacing.padding.xs            // p-2
tokens.spacing.padding.sm            // p-4
tokens.spacing.padding.md            // p-6
tokens.spacing.padding.lg            // p-8

// Padding X (horizontal)
tokens.spacing.px.sm                 // px-4
tokens.spacing.px.md                 // px-6
tokens.spacing.px.lg                 // px-8

// Padding Y (vertical)
tokens.spacing.py.sm                 // py-2
tokens.spacing.py.md                 // py-4
tokens.spacing.py.lg                 // py-6

// Sections
tokens.spacing.section.sm            // py-8 px-4
tokens.spacing.section.md            // py-12 px-4
tokens.spacing.section.lg            // py-16 px-4
tokens.spacing.section.xl            // py-20 px-4

// Gaps (for flex/grid)
tokens.spacing.gap.xs                // gap-2
tokens.spacing.gap.sm                // gap-4
tokens.spacing.gap.md                // gap-6
tokens.spacing.gap.lg                // gap-8

// Space Between
tokens.spacing.spaceY.xs             // space-y-2
tokens.spacing.spaceY.sm             // space-y-4
tokens.spacing.spaceY.md             // space-y-6

// Margins
tokens.spacing.margin.auto           // mx-auto
tokens.spacing.mt.sm                 // mt-4
tokens.spacing.mb.md                 // mb-6
```

**Usage:**
```typescript
const layoutStyles = {
  container: `${tokens.spacing.container.lg} ${tokens.spacing.section.md}`,
  grid: `${tokens.layout.grid['3col']} ${tokens.spacing.gap.lg}`,
};
```

### 3. Typography Tokens

```typescript
// Font families
tokens.typography.family.sans        // font-sans
tokens.typography.family.mono        // font-mono

// Font sizes
tokens.typography.size.xs            // text-xs
tokens.typography.size.sm            // text-sm
tokens.typography.size.base          // text-base
tokens.typography.size.lg            // text-lg
tokens.typography.size.xl            // text-xl
tokens.typography.size['2xl']        // text-2xl
tokens.typography.size['4xl']        // text-4xl

// Font weights
tokens.typography.weight.normal      // font-normal
tokens.typography.weight.medium      // font-medium
tokens.typography.weight.semibold    // font-semibold
tokens.typography.weight.bold        // font-bold

// Heading presets (responsive)
tokens.typography.heading.h1         // text-4xl md:text-5xl font-bold
tokens.typography.heading.h2         // text-3xl md:text-4xl font-bold
tokens.typography.heading.h3         // text-2xl md:text-3xl font-semibold
tokens.typography.heading.h4         // text-xl md:text-2xl font-semibold
tokens.typography.heading.h5         // text-lg md:text-xl font-semibold
tokens.typography.heading.h6         // text-base md:text-lg font-medium

// Line heights
tokens.typography.leading.none       // leading-none
tokens.typography.leading.tight      // leading-tight
tokens.typography.leading.normal     // leading-normal
tokens.typography.leading.relaxed    // leading-relaxed

// Text alignment
tokens.typography.align.left         // text-left
tokens.typography.align.center       // text-center
tokens.typography.align.right        // text-right
```

**Usage:**
```typescript
const heroStyles = {
  title: `${tokens.typography.heading.h1} ${tokens.colors.text.primary}`,
  subtitle: `${tokens.typography.size.xl} ${tokens.colors.text.secondary}`,
};
```

### 4. Layout Tokens

```typescript
// Flexbox
tokens.layout.flex.row               // flex flex-row
tokens.layout.flex.col               // flex flex-col
tokens.layout.flex.center            // flex items-center justify-center
tokens.layout.flex.between           // flex items-center justify-between
tokens.layout.flex.wrap              // flex-wrap

// Grid
tokens.layout.grid['2col']           // grid grid-cols-1 md:grid-cols-2
tokens.layout.grid['3col']           // grid grid-cols-1 md:grid-cols-3
tokens.layout.grid['4col']           // grid grid-cols-1 md:grid-cols-4

// Position
tokens.layout.position.relative      // relative
tokens.layout.position.absolute      // absolute
tokens.layout.position.fixed         // fixed
tokens.layout.position.sticky        // sticky

// Z-index
tokens.layout.zIndex.base            // z-10
tokens.layout.zIndex.dropdown        // z-20
tokens.layout.zIndex.modal           // z-40
tokens.layout.zIndex.toast           // z-50

// Display
tokens.layout.display.block          // block
tokens.layout.display.inline         // inline-block
tokens.layout.display.none           // hidden
```

**Usage:**
```typescript
const navigationStyles = {
  container: `${tokens.layout.position.sticky} ${tokens.layout.zIndex.dropdown}`,
  content: `${tokens.layout.flex.between} ${tokens.spacing.container.lg}`,
};
```

### 5. Border Tokens

```typescript
// Width
tokens.borders.width.none            // border-0
tokens.borders.width.default         // border
tokens.borders.width.thick           // border-2

// Radius
tokens.borders.radius.none           // rounded-none
tokens.borders.radius.sm             // rounded-sm
tokens.borders.radius.md             // rounded-md
tokens.borders.radius.lg             // rounded-lg
tokens.borders.radius.xl             // rounded-xl
tokens.borders.radius.full           // rounded-full
```

### 6. Shadow Tokens

```typescript
tokens.shadows.none                  // shadow-none
tokens.shadows.sm                    // shadow-sm
tokens.shadows.md                    // shadow-md
tokens.shadows.lg                    // shadow-lg
tokens.shadows.xl                    // shadow-xl
tokens.shadows['2xl']                // shadow-2xl
```

### 7. Transition Tokens

```typescript
tokens.transitions.fast              // transition-all duration-150 ease-in-out
tokens.transitions.base              // transition-all duration-300 ease-in-out
tokens.transitions.slow              // transition-all duration-500 ease-in-out

// Specific properties
tokens.transitions.colors            // transition-colors duration-300
tokens.transitions.transform         // transition-transform duration-300
tokens.transitions.opacity           // transition-opacity duration-300
```

### 8. State Tokens

```typescript
// Hover
tokens.states.hover.opacity          // hover:opacity-80
tokens.states.hover.scale            // hover:scale-105
tokens.states.hover.brightness       // hover:brightness-110

// Focus
tokens.states.focus.ring             // focus:ring-2
tokens.states.focus.outline          // focus:outline-none
tokens.states.focus.default          // focus:ring-2 focus:ring-offset-2

// Active
tokens.states.active.scale           // active:scale-95
tokens.states.active.opacity         // active:opacity-70

// Disabled
tokens.states.disabled.opacity       // disabled:opacity-50
tokens.states.disabled.cursor        // disabled:cursor-not-allowed
tokens.states.disabled.default       // disabled:opacity-50 disabled:cursor-not-allowed
```

## Component Patterns

Pre-composed patterns for common components:

### Card Pattern

```typescript
import { componentPatterns } from '@/styles/tokens';

// Basic card
componentPatterns.card.base
// Output: "bg-white rounded-lg border border-gray-300 shadow-md p-6 space-y-4"

// Interactive card (with hover)
componentPatterns.card.interactive
// Output: "transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"

// Complete card
const cardStyle = `${componentPatterns.card.base} ${componentPatterns.card.interactive}`;
```

### Button Pattern

```typescript
// Primary button
componentPatterns.button.primary
// Output: "bg-emerald-500 hover:bg-emerald-600 text-white"

// Secondary button
componentPatterns.button.secondary
// Output: "bg-blue-600 hover:bg-blue-700 text-white"

// Base button structure
componentPatterns.button.base
// Output: "inline-flex items-center justify-center rounded-md font-medium transition-all..."
```

### Input Pattern

```typescript
// Base input
componentPatterns.input.base
// Output: "w-full px-3 py-2 border border-gray-300 rounded-md..."

// Input with error
componentPatterns.input.error
// Output: "border-red-500 focus:ring-red-500"
```

### Section Pattern

```typescript
// Hero section
componentPatterns.section.hero
// Output: "relative py-16 px-4 bg-gradient-to-br from-emerald-50 to-blue-50"

// Content section
componentPatterns.section.content
// Output: "py-12 px-4"

// Feature section
componentPatterns.section.feature
// Output: "py-16 px-4 bg-gray-50"
```

### Navigation Pattern

```typescript
// Nav container
componentPatterns.nav.container
// Output: "bg-white border-b border-gray-300 shadow-sm"

// Nav content
componentPatterns.nav.content
// Output: "max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"

// Nav link
componentPatterns.nav.link
// Output: "text-gray-700 hover:text-emerald-600 transition-colors duration-300"
```

### List Pattern

```typescript
// Unordered list
componentPatterns.list.unordered
// Output: "list-disc list-inside space-y-2"

// Ordered list
componentPatterns.list.ordered
// Output: "list-decimal list-inside space-y-2"
```

## Usage Examples

### Example 1: Creating a Feature Card

```typescript
import { tokens, componentPatterns } from '@/styles/tokens';

export const featureCardStyles = {
  // Use pre-composed pattern
  card: `${componentPatterns.card.base} ${componentPatterns.card.interactive}`,
  
  // Compose with tokens
  icon: `${tokens.colors.text.brand} ${tokens.typography.size['2xl']}`,
  title: `${tokens.typography.heading.h4} ${tokens.colors.text.primary}`,
  description: `${tokens.typography.size.base} ${tokens.colors.text.secondary}`,
};
```

### Example 2: Creating a Custom Section

```typescript
import { tokens } from '@/styles/tokens';

export const customSectionStyles = {
  // Compose multiple tokens
  container: `
    ${tokens.layout.position.relative}
    ${tokens.spacing.section.xl}
    ${tokens.colors.background.secondary}
  `.trim().replace(/\s+/g, ' '),
  
  content: `
    ${tokens.spacing.container.lg}
    ${tokens.spacing.margin.auto}
    ${tokens.layout.grid['3col']}
    ${tokens.spacing.gap.lg}
  `.trim().replace(/\s+/g, ' '),
};
```

### Example 3: Creating a Form

```typescript
import { tokens, componentPatterns } from '@/styles/tokens';

export const formStyles = {
  container: `
    ${tokens.spacing.container.sm}
    ${tokens.spacing.margin.auto}
    ${tokens.spacing.spaceY.md}
  `.trim().replace(/\s+/g, ' '),
  
  field: tokens.spacing.spaceY.xs,
  label: `${tokens.typography.size.sm} ${tokens.typography.weight.medium}`,
  input: componentPatterns.input.base,
  error: `${tokens.typography.size.sm} ${tokens.colors.state.error}`,
};
```

### Example 4: Creating a Navigation Bar

```typescript
import { tokens, componentPatterns } from '@/styles/tokens';

export const navStyles = {
  header: componentPatterns.nav.container,
  content: componentPatterns.nav.content,
  
  logo: `
    ${tokens.typography.size.xl}
    ${tokens.typography.weight.bold}
    ${tokens.colors.text.brand}
  `.trim().replace(/\s+/g, ' '),
  
  links: `${tokens.layout.flex.row} ${tokens.spacing.gap.md}`,
  link: componentPatterns.nav.link,
};
```

## Migration Guide

### Migrating Existing Components

**Step 1: Identify Hardcoded Values**

```typescript
// ❌ Before
const oldStyles = {
  container: 'bg-white rounded-lg shadow-md p-6',
  title: 'text-2xl font-bold text-gray-900',
};
```

**Step 2: Import Tokens**

```typescript
import { tokens, componentPatterns } from '@/styles/tokens';
```

**Step 3: Replace with Tokens**

```typescript
// ✅ After
const newStyles = {
  container: componentPatterns.card.base,
  title: `${tokens.typography.heading.h3} ${tokens.colors.text.primary}`,
};
```

### Common Migrations

| Hardcoded Value | Token Replacement |
|----------------|-------------------|
| `'bg-white'` | `tokens.colors.background.primary` |
| `'text-gray-900'` | `tokens.colors.text.primary` |
| `'px-4 py-12'` | `tokens.spacing.section.md` |
| `'text-4xl font-bold'` | `tokens.typography.heading.h1` |
| `'rounded-lg'` | `tokens.borders.radius.lg` |
| `'shadow-lg'` | `tokens.shadows.lg` |
| `'max-w-7xl mx-auto'` | `${tokens.spacing.container.lg} ${tokens.spacing.margin.auto}` |
| `'flex items-center gap-4'` | `${tokens.layout.flex.center} ${tokens.spacing.gap.sm}` |

## Best Practices

### 1. Always Use Tokens

```typescript
// ✅ Good
const styles = {
  container: tokens.spacing.container.lg,
  padding: tokens.spacing.padding.md,
};

// ❌ Bad
const styles = {
  container: 'max-w-7xl',
  padding: 'p-6',
};
```

### 2. Use Component Patterns for Common Use Cases

```typescript
// ✅ Good - Reuse patterns
const cardStyle = componentPatterns.card.base;

// ❌ Bad - Rebuilding the same thing
const cardStyle = 'bg-white rounded-lg border border-gray-300 shadow-md p-6';
```

### 3. Compose Tokens for Custom Needs

```typescript
// ✅ Good - Compose from tokens
const customSection = `
  ${tokens.layout.position.relative}
  ${tokens.spacing.section.xl}
  ${tokens.colors.background.tertiary}
`.trim().replace(/\s+/g, ' ');
```

### 4. Create New Patterns for Reusable Components

```typescript
// If you're using the same combination 3+ times, create a pattern
export const componentPatterns = {
  // ... existing patterns
  
  customAlert: `
    ${tokens.borders.radius.md}
    ${tokens.spacing.padding.md}
    ${tokens.colors.background.tertiary}
    ${tokens.borders.width.default}
  `.trim().replace(/\s+/g, ' '),
};
```

### 5. Maintain Semantic Naming

```typescript
// ✅ Good - Semantic names
const styles = {
  heroTitle: tokens.typography.heading.h1,
  featureDescription: tokens.colors.text.secondary,
};

// ❌ Bad - Implementation details
const styles = {
  bigText: 'text-4xl',
  grayText: 'text-gray-700',
};
```

### 6. Document Custom Compositions

```typescript
export const complexComponentStyles = {
  /**
   * Main container with gradient background and responsive padding
   * Used in: Hero section, Feature showcase
   */
  container: `
    ${tokens.layout.position.relative}
    ${tokens.spacing.section.xl}
    bg-gradient-to-br from-emerald-50 to-blue-50
  `.trim().replace(/\s+/g, ' '),
};
```

### 7. Use TypeScript for Type Safety

```typescript
import type { ComponentPatterns } from '@/styles/tokens';

// Get autocomplete and type checking
const getButtonStyle = (variant: keyof ComponentPatterns['button']) => {
  return componentPatterns.button[variant];
};
```

## Adding New Tokens

When adding new design values, follow this process:

### 1. Identify the Category

Determine which token category the new value belongs to (color, spacing, typography, etc.)

### 2. Add to tokens.ts

```typescript
// Add to appropriate category
export const spacingTokens = {
  // ... existing tokens
  padding: {
    // ... existing padding
    '2xl': 'p-12' as const,  // New token
  },
};
```

### 3. Update TypeScript Types (if needed)

```typescript
export type SpacingTokens = typeof spacingTokens;
```

### 4. Document the New Token

Add to this guide with usage examples.

### 5. Create a Pattern (if frequently used)

```typescript
export const componentPatterns = {
  // ... existing patterns
  newPattern: `
    ${tokens.newCategory.newValue}
    ${tokens.spacing.padding['2xl']}
  `.trim().replace(/\s+/g, ' '),
};
```

## Theming Support

The token system is designed to support theming. To add dark mode:

```typescript
// In tokens.ts
export const colorTokens = {
  brand: {
    primary: 'emerald-500 dark:emerald-400' as const,
    // ... other colors with dark variants
  },
};
```

## Testing Token Changes

When modifying tokens, always:

1. **Run type check**: `npm run type-check`
2. **Run tests**: `npm test`
3. **Visual regression test**: Check in dev server
4. **Build verification**: `npm run build`

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Atomic Design Principles](https://bradfrost.com/blog/post/atomic-web-design/)
- [Design System Handbook](https://www.designbetter.co/design-systems-handbook)

## Support

For questions or suggestions about the design token system:
- Review existing patterns in `src/styles/tokens.ts`
- Check component examples in `src/styles/components/`
- Refer to this guide for best practices

---

**Last Updated**: October 2, 2025  
**Version**: 1.0.0

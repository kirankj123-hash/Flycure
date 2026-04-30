# Design System Architecture

**Last Updated:** October 2, 2025  
**Version:** 2.0 - Consolidated Category Structure

---

## 📁 File Structure

### Before (8 separate component files)
```
src/styles/
├── tokens.ts                      # Token definitions
├── index.ts                       # Barrel export
└── components/
    ├── button.styles.ts           # ❌ Too granular
    ├── card.styles.ts             # ❌ Too granular
    ├── form.styles.ts             # ❌ Too granular
    ├── hero.styles.ts             # ❌ Too granular
    ├── nav.styles.ts              # ❌ Too granular
    ├── footer.styles.ts           # ❌ Too granular
    ├── layout.styles.ts           # ❌ Too granular
    └── enquiry-form.styles.ts     # ❌ Too granular
```

### After (3 broad category files) ✅
```
src/styles/
├── tokens.ts                      # ✅ All componentPatterns defined here (SINGLE SOURCE)
├── primitives.ts                  # ✅ Buttons, Cards, Inputs, Forms, Images
├── layouts.ts                     # ✅ Pages, Sections, Grids, Hero
├── navigation.ts                  # ✅ Nav, Footer
└── index.ts                       # ✅ Consolidated exports + backward compatibility
```

**Migration Complete:** All deprecated component files have been removed. The `/components` folder has been deleted as part of the cleanup.

---

## 🎯 Design Philosophy

### Single Source of Truth

**All composition happens in `tokens.ts` → `componentPatterns`**

```typescript
// tokens.ts - THE ONLY PLACE where styling logic exists
export const componentPatterns = {
  button: { primary: '...', secondary: '...', ... },
  card: { base: '...', interactive: '...', ... },
  input: { base: '...', error: '...', ... },
  // ... 50+ patterns
};
```

**Category files are pure references (no logic)**

```typescript
// primitives.ts - Just references
export const button = {
  primary: componentPatterns.button.primary,  // ← Pure reference
  secondary: componentPatterns.button.secondary,
};
```

---

## 📚 Three Category Files

### 1. **primitives.ts** - Basic Building Blocks

**What it contains:**
- Buttons (11 variants)
- Cards (7 variants)
- Inputs (5 variants)
- Forms (10 properties)
- Images (3 variants)

**When to use:**
```typescript
import { button, card, input, form, image } from '@/styles/primitives';
// or
import { primitives } from '@/styles';
```

**Example:**
```typescript
// Button usage
<button className={button.primary}>Click me</button>

// Card usage
<div className={card.base}>
  <h3 className={card.title}>Title</h3>
  <p className={card.description}>Description</p>
</div>

// Form usage
<form className={form.container}>
  <div className={form.field}>
    <label className={form.label}>Email</label>
    <input className={form.input} />
  </div>
</form>
```

---

### 2. **layouts.ts** - Page Structure

**What it contains:**
- Page layouts (4 properties)
- Layout patterns (6 properties)
- Sections (5 variants)
- Hero sections (9 properties)
- Lists (4 variants)

**When to use:**
```typescript
import { page, layout, section, hero, list } from '@/styles/layouts';
// or
import { layouts } from '@/styles';
```

**Example:**
```typescript
// Page layout
<div className={page.root}>
  <main className={page.main}>
    <section className={page.section}>
      <div className={page.grid}>
        {/* Content */}
      </div>
    </section>
  </main>
</div>

// Hero section
<section className={hero.container}>
  <div className={hero.content}>
    <h1 className={hero.title}>Welcome</h1>
    <p className={hero.subtitle}>Subtitle</p>
  </div>
</section>

// Grid layouts
<div className={layout.grid.three}>
  {/* 3-column responsive grid */}
</div>
```

---

### 3. **navigation.ts** - Headers & Footers

**What it contains:**
- Navigation header (11 properties + mobile)
- Footer (8 properties)

**When to use:**
```typescript
import { nav, footer } from '@/styles/navigation';
// or
import { navigation } from '@/styles';
```

**Example:**
```typescript
// Navigation
<header className={nav.header}>
  <div className={nav.container}>
    <div className={nav.content}>
      <div className={nav.logo}>
        <span className={nav.brand}>Logo</span>
      </div>
      <nav className={nav.links}>
        <a className={nav.link}>Home</a>
        <a className={nav.link}>About</a>
      </nav>
    </div>
  </div>
</header>

// Footer
<footer className={footer.container}>
  <div className={footer.inner}>
    <div className={footer.grid}>
      {/* Footer content */}
    </div>
  </div>
</footer>
```

---

## 🔄 Import Patterns

### Option 1: Import by Category (Recommended)
```typescript
import { button, card } from '@/styles/primitives';
import { page, hero } from '@/styles/layouts';
import { nav, footer } from '@/styles/navigation';

// Usage
<button className={button.primary}>Click</button>
<section className={hero.container}>...</section>
```

### Option 2: Import Consolidated Object
```typescript
import { primitives, layouts, navigation } from '@/styles';

// Usage
<button className={primitives.button.primary}>Click</button>
<section className={layouts.hero.container}>...</section>
<nav className={navigation.nav.header}>...</nav>
```

### Option 3: Backward Compatible (Legacy)
```typescript
import { styles } from '@/styles';

// Usage (same as before)
<button className={styles.button.primary}>Click</button>
<section className={styles.hero.container}>...</section>
```

### Option 4: Direct Token Access (Advanced)
```typescript
import { componentPatterns } from '@/styles/tokens';

// Usage - direct access to source patterns
<button className={componentPatterns.button.primary}>Click</button>
```

---

## 📊 Benefits of Consolidated Structure

### Before (8 files)
```typescript
// 8 separate imports for different components
import { buttonStyles } from '@/styles/components/button.styles';
import { cardStyles } from '@/styles/components/card.styles';
import { formStyles } from '@/styles/components/form.styles';
import { heroStyles } from '@/styles/components/hero.styles';
import { navStyles } from '@/styles/components/nav.styles';
import { footerStyles } from '@/styles/components/footer.styles';
import { layoutStyles } from '@/styles/components/layout.styles';
import { enquiryFormStyles } from '@/styles/components/enquiry-form.styles';

// Usage
<button className={buttonStyles.primary} />
<div className={cardStyles.base} />
```

### After (3 files) ✅
```typescript
// 1-3 imports for broad categories
import { button, card, form } from '@/styles/primitives';
import { page, hero } from '@/styles/layouts';
import { nav, footer } from '@/styles/navigation';

// Usage (cleaner, more semantic)
<button className={button.primary} />
<div className={card.base} />
```

### Comparison

| Aspect | Before (8 files) | After (3 files) | Improvement |
|--------|-----------------|-----------------|-------------|
| **Files** | 8 component files | 3 category files | 62% reduction |
| **Imports** | 8 separate imports | 1-3 category imports | Cleaner |
| **Semantics** | `buttonStyles.primary` | `button.primary` | More natural |
| **Organization** | Component-based | Category-based | Better structure |
| **Scalability** | Add file per component | Add to category | More maintainable |

---

## 🎨 Customization Guide

### To Change Any Style

**1. Find the pattern in `tokens.ts`**
```typescript
// In tokens.ts
export const componentPatterns = {
  button: {
    primary: `bg-emerald-500 hover:bg-emerald-600 text-white`,
    //       ↑ Change here once
  }
};
```

**2. All components update automatically**
```typescript
// primitives.ts - Pure reference (no change needed)
export const button = {
  primary: componentPatterns.button.primary,  // ← Automatically updated
};

// Any component using it
<button className={button.primary}>  {/* ← Automatically updated */}
  Click me
</button>
```

### To Add New Style

**1. Add to appropriate pattern in `tokens.ts`**
```typescript
export const componentPatterns = {
  button: {
    primary: '...',
    secondary: '...',
    accent: 'bg-amber-500 hover:bg-amber-600 text-white',  // ← New variant
  }
};
```

**2. Reference it in category file**
```typescript
// primitives.ts
export const button = {
  primary: componentPatterns.button.primary,
  secondary: componentPatterns.button.secondary,
  accent: componentPatterns.button.accent,  // ← Add reference
};
```

**3. Use immediately**
```typescript
<button className={button.accent}>New Style</button>
```

---

## 🚀 Migration Guide

### For Existing Code

**No changes required!** Backward compatibility maintained:

```typescript
// Old code still works ✅
import { styles } from '@/styles';
<button className={styles.button.primary} />

// But you can now also use (recommended) ✅
import { button } from '@/styles/primitives';
<button className={button.primary} />
```

### For New Code

**Use category-based imports:**

```typescript
// ✅ Recommended - Category imports
import { button, card, form } from '@/styles/primitives';
import { page, section, hero } from '@/styles/layouts';
import { nav, footer } from '@/styles/navigation';

// ❌ Avoid - Individual component files (deprecated)
import { buttonStyles } from '@/styles/components/button.styles';
```

---

## 📋 Complete Category Reference

### Primitives Category
```typescript
import { 
  button,    // 11 button variants
  card,      // 7 card variants
  input,     // 5 input variants
  form,      // 10 form properties
  image,     // 3 image variants
} from '@/styles/primitives';
```

### Layouts Category
```typescript
import {
  page,      // 5 page layout properties
  layout,    // 6 layout patterns
  section,   // 5 section variants
  hero,      // 9 hero properties
  list,      // 4 list variants
} from '@/styles/layouts';
```

### Navigation Category
```typescript
import {
  nav,       // 11 nav properties + mobile
  footer,    // 8 footer properties
} from '@/styles/navigation';
```

---

## ✅ Best Practices

### DO ✅
```typescript
// Import by broad category
import { button, card } from '@/styles/primitives';

// Use semantic names
<button className={button.primary}>Submit</button>

// Compose when needed
<button className={cn(button.primary, 'mt-4')}>Submit</button>

// Use TypeScript autocomplete
const buttonClass = button.primary;  // ← Full autocomplete
```

### DON'T ❌
```typescript
// Don't import individual component files
import { buttonStyles } from '@/styles/components/button.styles';  // Deprecated

// Don't create inline styles
<button className="bg-blue-500 hover:bg-blue-600">  // Breaks consistency

// Don't compose in category files
// primitives.ts
export const button = {
  primary: `${tokens.colors.brand} ${tokens.spacing.px.md}`,  // ❌ No composition
};
```

---

## 🔍 File Size Comparison

| File | Before | After | Change |
|------|--------|-------|--------|
| `button.styles.ts` | 24 lines | 13 lines | -46% |
| `card.styles.ts` | 22 lines | 10 lines | -55% |
| `form.styles.ts` | 32 lines | 11 lines | -66% |
| `hero.styles.ts` | 36 lines | 14 lines | -61% |
| `nav.styles.ts` | 44 lines | 13 lines | -70% |
| `footer.styles.ts` | 48 lines | 11 lines | -77% |
| `layout.styles.ts` | 55 lines | 13 lines | -76% |
| `enquiry-form.styles.ts` | 31 lines | 17 lines | -45% |
| **Total Individual** | **292 lines** | **102 lines** | **-65%** |
| **New Category Files** | - | **150 lines** | - |
| **Net Change** | **292 lines** | **150 lines** | **-49%** |

---

## 🎯 Summary

**Old Architecture (Component-Based):**
- ❌ 8 separate files, one per component type
- ❌ Repetitive imports
- ❌ Harder to discover related styles
- ❌ More files to maintain

**New Architecture (Category-Based):**
- ✅ 3 broad category files (primitives, layouts, navigation)
- ✅ Semantic imports by category
- ✅ Easy to discover related styles
- ✅ Fewer files, better organization
- ✅ 49% less code
- ✅ Backward compatible

**Result:** Cleaner, more maintainable, more scalable design system! 🎉

---

**Version:** 2.0  
**Date:** October 2, 2025  
**Status:** ✅ Production Ready

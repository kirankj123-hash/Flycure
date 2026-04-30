# Atomic Design System - Component Architecture

**Last Updated:** October 2, 2025  
**Version:** 2.0 - Atomic Component Structure

---

## 📐 Architecture Overview

This project follows **Atomic Design principles** where components are built by composing smaller, reusable components rather than using raw HTML elements. This creates a consistent, maintainable, and scalable component architecture.

### Design Hierarchy

```
Atoms (Basic building blocks)
  ↓
Molecules (Simple combinations of atoms)
  ↓
Organisms (Complex UI sections)
  ↓
Templates (Page layouts)
  ↓
Pages (Complete views)
```

---

## ⚛️ Atoms

Atoms are the smallest building blocks - basic HTML elements wrapped in reusable components.

### Available Atoms

#### 1. **Container** (`Container.tsx`)
Replaces raw `<div>`, `<section>`, `<article>`, `<aside>`, `<nav>`, `<header>`, `<footer>`, `<main>`, `<form>` elements.

```tsx
import { Container } from '@/components/atoms';

// As div (default)
<Container className="...">Content</Container>

// As semantic HTML
<Container as="section" className="...">Section content</Container>
<Container as="nav" className="...">Navigation</Container>
<Container as="form" onSubmit={handleSubmit}>Form content</Container>
```

#### 2. **Text** (`Text.tsx`)
Replaces raw `<p>`, `<span>`, `<label>`, `<h1-h6>`, `<address>` elements.

```tsx
import { Text } from '@/components/atoms';

// Paragraph (default)
<Text className="...">Text content</Text>

// Headings
<Text as="h1" className="...">Main Title</Text>
<Text as="h2" className="...">Subtitle</Text>

// Labels
<Text as="label" htmlFor="field-id" className="...">
  Field Label
</Text>

// Inline text
<Text as="span" className="...">Inline text</Text>
```

#### 3. **Link** (`Link.tsx`)
Replaces raw `<a>` and Next.js `<Link>` usage.

```tsx
import { Link } from '@/components/atoms';

// Internal link
<Link href="/about" className="...">About Us</Link>

// External link
<Link href="https://example.com" external className="...">
  External Site
</Link>
```

#### 4. **Button** (`Button.tsx`)
Pre-existing button component with variants.

```tsx
import { Button } from '@/components/atoms';

<Button variant="primary">Submit</Button>
<Button variant="secondary" size="lg">Cancel</Button>
```

#### 5. **Input** (`Input.tsx`)
Pre-existing input component.

```tsx
import { Input } from '@/components/atoms';

<Input
  type="email"
  placeholder="Enter email"
  error="Invalid email"
/>
```

#### 6. **Select** & **Option** (`Select.tsx`)
Replaces raw `<select>` and `<option>` elements.

```tsx
import { Select, Option } from '@/components/atoms';

<Select value={value} onChange={handleChange} error={!!error}>
  <Option value="">Choose option</Option>
  <Option value="1">Option 1</Option>
  <Option value="2">Option 2</Option>
</Select>
```

#### 7. **TextArea** (`TextArea.tsx`)
Replaces raw `<textarea>` elements.

```tsx
import { TextArea } from '@/components/atoms';

<TextArea
  rows={4}
  placeholder="Enter notes"
  error={!!error}
/>
```

#### 8. **List** & **ListItem** (`List.tsx`)
Replaces raw `<ul>`, `<ol>`, `<li>` elements.

```tsx
import { List, ListItem } from '@/components/atoms';

// Unordered list (default)
<List className="...">
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
</List>

// Ordered list
<List ordered className="...">
  <ListItem>First</ListItem>
  <ListItem>Second</ListItem>
</List>
```

#### 9. **Icon** (`Icon.tsx`)
Replaces raw `<svg>` elements.

```tsx
import { Icon } from '@/components/atoms';

<Icon className="..." viewBox="0 0 24 24">
  <path d="M..." />
</Icon>
```

#### 10. **Image** Components
Pre-existing image components (AtomicImage, HeroImage, Logo).

```tsx
import { AtomicImage, HeroImage, Logo } from '@/components/atoms';
```

---

## 🔬 Molecules

Molecules are simple combinations of atoms that function together as a unit.

### Available Molecules

#### 1. **FormField** (`FormField.tsx`)
Combines Container, Text (label), Input, and error message.

```tsx
import { FormField } from '@/components/molecules';

<FormField
  label="Email Address"
  type="email"
  required
  error={errors.email?.message}
  {...register('email')}
/>
```

**Composition:**
- ✅ `Container` (wrapper)
- ✅ `Text` as label (with required indicator)
- ✅ `Text` for description
- ✅ `Input` for field

#### 2. **FeatureCard** (`FeatureCard.tsx`)
Displays a card with icon, title, and description.

```tsx
import { FeatureCard } from '@/components/molecules';

<FeatureCard
  iconPath="M12 4l..."
  title="Fast Service"
  description="Get quick responses"
  link="path for more details"
/>
```

**Composition:**
- ✅ `Container` (wrapper & header)
- ✅ `Icon` for visual element
- ✅ `Text` for title (h3) and description

#### 3. **HeroGrid** (`HeroGrid.tsx`)
Image grid layout for hero sections.

```tsx
import { HeroGrid } from '@/components/molecules';

<HeroGrid className="..." />
```

**Composition:**
- ✅ `Container` for layout structure
- ✅ `HeroImage` atoms for images

#### 4. **PartnerLogos** (`PartnerLogos.tsx`)
Displays partner logo collection.

```tsx
import { PartnerLogos } from '@/components/molecules';

<PartnerLogos className="..." />
```

**Composition:**
- ✅ `Container` for layout
- ✅ `PartnerLogo` components

---

## 🧬 Organisms

Organisms are complex UI components composed of molecules and atoms.

### Available Organisms

#### 1. **Navigation** (`Navigation.tsx`)
Main site navigation header.

```tsx
import { Navigation } from '@/components/organisms';

<Navigation className="..." />
```

**Composition:**
- ✅ `Container` (nav, divs replaced)
- ✅ `Link` for navigation items
- ✅ `Text` for brand name
- ✅ `Button` for CTA and mobile toggle
- ✅ `Icon` for hamburger menu
- ❌ NO raw `<nav>`, `<div>`, `<a>`, `<button>`, `<svg>`

#### 2. **Footer** (`Footer.tsx`)
Site footer with links and newsletter.

```tsx
import { Footer } from '@/components/organisms';

<Footer />
```

**Composition:**
- ✅ `Container` (footer, divs replaced)
- ✅ `Text` for headings and content
- ✅ `Link` for navigation
- ✅ `List` & `ListItem` for link lists
- ✅ `Button` for newsletter
- ✅ `Input` for email
- ✅ `Icon` for social icons
- ❌ NO raw `<footer>`, `<div>`, `<h3>`, `<ul>`, `<li>`, `<a>`, `<svg>`

#### 3. **HeroSection** (`HeroSection.tsx`)
Main hero/banner section.

```tsx
import { HeroSection } from '@/components/organisms';

<HeroSection />
```

**Composition:**
- ✅ `Container` (section, divs replaced)
- ✅ `Text` for headings and content
- ✅ `HeroGrid` molecule
- ✅ `PartnerLogos` molecule
- ❌ NO raw `<section>`, `<div>`, `<h1>`, `<p>`, `<span>`

#### 4. **EnquiryForm** (`EnquiryForm.tsx`)
Complex form for enquiries.

```tsx
import { EnquiryForm } from '@/components/organisms';

<EnquiryForm
  onSuccess={(data) => console.log(data)}
  className="..."
/>
```

**Composition:**
- ✅ `Container` (form, divs replaced)
- ✅ `Text` for labels and messages
- ✅ `FormField` molecules
- ✅ `Select` & `Option` for dropdown
- ✅ `TextArea` for notes
- ✅ `Button` for submit
- ❌ NO raw `<form>`, `<div>`, `<label>`, `<select>`, `<option>`, `<textarea>`, `<p>`

---

## 🎯 Design Principles

### 1. **No Raw HTML in Molecules/Organisms**

❌ **WRONG:**
```tsx
export function MyComponent() {
  return (
    <div className="...">
      <h2>Title</h2>
      <p>Description</p>
      <button>Click</button>
    </div>
  );
}
```

✅ **CORRECT:**
```tsx
import { Container, Text, Button } from '@/components/atoms';

export function MyComponent() {
  return (
    <Container className="...">
      <Text as="h2">Title</Text>
      <Text>Description</Text>
      <Button>Click</Button>
    </Container>
  );
}
```

### 2. **Compose from Smaller Components**

Molecules should combine atoms. Organisms should combine molecules and atoms.

```
Organism (Footer)
├── Container (atoms)
├── Text (atoms)
├── Link (atoms)
├── List (atoms)
│   └── ListItem (atoms)
├── Button (atoms)
├── Input (atoms)
└── Icon (atoms)
```

### 3. **Single Responsibility**

Each atom does one thing well. Combine them to create complexity.

- `Container` = structure
- `Text` = typography
- `Link` = navigation
- `Button` = actions
- `Input` = data entry

### 4. **Consistent API**

All components accept `className` for styling and spread remaining props.

```tsx
<Container className="..." {...props}>
<Text className="..." {...props}>
<Link className="..." {...props}>
```

---

## 📦 Import Patterns

### Recommended: Named Imports from Index

```tsx
// Import multiple atoms
import { Container, Text, Link, Button } from '@/components/atoms';

// Import molecules
import { FormField, FeatureCard } from '@/components/molecules';

// Import organisms
import { Navigation, Footer } from '@/components/organisms';
```

### Direct Imports (When Needed)

```tsx
import { Container } from '@/components/atoms/Container/Container';
import { Text } from '@/components/atoms/Text/Text';
```

---

## ✅ Benefits

### 1. **Consistency**
- All components use the same base atoms
- Uniform API across the application
- Predictable behavior

### 2. **Maintainability**
- Change an atom, update everywhere
- Easy to add new features to base components
- Clear component hierarchy

### 3. **Reusability**
- Atoms can be used in any combination
- No code duplication
- Build complex UIs from simple pieces

### 4. **Type Safety**
- Full TypeScript support
- Props validation
- IntelliSense in IDEs

### 5. **Testing**
- Test atoms once, trust them everywhere
- Mock atoms for testing organisms
- Clear component boundaries

### 6. **Accessibility**
- Semantic HTML by default
- ARIA attributes in atoms
- Consistent keyboard navigation

---

## 🚀 Migration Guide

### Step 1: Replace Raw Elements

Find raw HTML elements in your components:

```tsx
// Before
<div className="...">
  <h1>Title</h1>
  <p>Text</p>
  <a href="...">Link</a>
</div>

// After
<Container className="...">
  <Text as="h1">Title</Text>
  <Text>Text</Text>
  <Link href="...">Link</Link>
</Container>
```

### Step 2: Import Atoms

Add imports at the top:

```tsx
import { Container, Text, Link } from '@/components/atoms';
```

### Step 3: Update Props

Ensure props match atom interfaces:

```tsx
// Container accepts 'as' prop for semantic HTML
<Container as="section">

// Text accepts 'as' for different elements
<Text as="h1">

// Link uses 'external' for external URLs
<Link href="..." external>
```

### Step 4: Test

Run tests to ensure everything works:

```bash
npm test
npm run type-check
```

---

## 📝 Checklist for New Components

When creating new molecules or organisms:

- [ ] Import atoms from `@/components/atoms`
- [ ] Use `Container` instead of `<div>`, `<section>`, etc.
- [ ] Use `Text` instead of `<p>`, `<h1-h6>`, `<span>`, `<label>`
- [ ] Use `Link` instead of `<a>` or Next.js `<Link>`
- [ ] Use `Button` instead of `<button>`
- [ ] Use `List`/`ListItem` instead of `<ul>`/`<li>`
- [ ] Use `Icon` instead of `<svg>`
- [ ] Use `Select`/`Option` instead of `<select>`/`<option>`
- [ ] Use `TextArea` instead of `<textarea>`
- [ ] No raw HTML elements (except in atoms)
- [ ] Compose from smaller components
- [ ] Export from appropriate index file

---

## 🎓 Examples

### Example 1: Simple Molecule

```tsx
// molecules/InfoCard.tsx
import { Container, Text, Link } from '@/components/atoms';

export function InfoCard({ title, description, linkHref, linkText }) {
  return (
    <Container className="p-4 border rounded">
      <Text as="h3" className="font-bold">{title}</Text>
      <Text className="text-gray-600">{description}</Text>
      <Link href={linkHref} className="text-blue-500">
        {linkText}
      </Link>
    </Container>
  );
}
```

### Example 2: Complex Organism

```tsx
// organisms/ContactSection.tsx
import { Container, Text, Button, Link } from '@/components/atoms';
import { FormField } from '@/components/molecules';

export function ContactSection() {
  return (
    <Container as="section" className="py-12">
      <Container className="container mx-auto">
        <Text as="h2" className="text-3xl font-bold mb-4">
          Contact Us
        </Text>
        <Text className="text-gray-600 mb-8">
          Get in touch with our team
        </Text>
        
        <Container as="form" className="space-y-4">
          <FormField label="Name" required />
          <FormField label="Email" type="email" required />
          <Button type="submit">Send Message</Button>
        </Container>
        
        <Container className="mt-8">
          <Text className="text-sm text-gray-500">
            Or email us at{' '}
            <Link href="mailto:hello@example.com" className="text-blue-500">
              hello@example.com
            </Link>
          </Text>
        </Container>
      </Container>
    </Container>
  );
}
```

---

## 🎉 Summary

The atomic design system ensures:

1. ✅ **All organisms and molecules** compose from atoms
2. ✅ **No raw HTML** in molecules/organisms (except in atoms)
3. ✅ **Consistent component API** across the application
4. ✅ **Type-safe** with full TypeScript support
5. ✅ **Maintainable** - change once, update everywhere
6. ✅ **Testable** - clear component boundaries
7. ✅ **Accessible** - semantic HTML by default

**The architecture is now complete with proper atomic composition! 🚀**

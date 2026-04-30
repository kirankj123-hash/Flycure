# FlyCure Health - Technical Documentation

**Last Updated:** October 1, 2025  
**Version:** 1.0  
**Status:** Production Ready ✅

---

## 📋 Table of Contents

1. [Current Status](#current-status)
2. [Architecture Overview](#architecture-overview)
3. [Component System](#component-system)
4. [Feature Modules](#feature-modules)
5. [Design System](#design-system)
6. [Development Guide](#development-guide)
7. [Best Practices](#best-practices)
8. [Future Roadmap](#future-roadmap)

---

## Current Status

### Quality Metrics ✅

- **Tests:** 227/227 passing (100% coverage)
- **TypeScript:** 0 errors (strict mode)
- **Build:** Production-ready (180kB first load)
- **Architecture:** Feature modules + Atomic Design

### Tech Stack

- **Framework:** Next.js 15.5.2 (App Router)
- **React:** 19.1.1 (Server & Client Components)
- **TypeScript:** 5.0 (Strict mode)
- **Testing:** Vitest 1.6.1 + React Testing Library
- **Styling:** Tailwind CSS with design tokens
- **State:** TanStack Query for server state

### Recent Achievements

- ✅ Feature module architecture implemented
- ✅ Domain-based guards and route registry
- ✅ Data services (MedicalService, FacilitiesService)
- ✅ Feature-specific cards (Department, Doctor, Hospital)
- ✅ 100% test coverage with 227 passing tests

---

## Architecture Overview

### Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (public)/              # Public routes
│   ├── (protected)/           # Auth-required routes
│   ├── (admin)/               # Admin-only routes
│   └── api/                   # API routes
│
├── components/                 # Shared UI components (Atomic Design)
│   ├── atoms/                 # Basic building blocks
│   ├── molecules/             # Simple combinations
│   ├── organisms/             # Complex components
│   ├── templates/             # Page layouts
│   └── ui/                    # Specialized components
│
├── features/                   # Feature modules (domain-driven)
│   ├── enquiries/             # Enquiry management
│   │   ├── components/        # EnquiryForm
│   │   ├── services/          # EnquiryService
│   │   ├── types/             # EnquiryDTO
│   │   └── index.ts           # Barrel export
│   ├── medical/               # Medical domain
│   │   ├── components/        # DepartmentCard, DoctorCard
│   │   ├── services/          # MedicalService
│   │   ├── types/             # Department, Doctor, Treatment
│   │   └── index.ts
│   └── facilities/            # Facilities domain
│       ├── components/        # HospitalCard
│       ├── services/          # FacilitiesService
│       ├── types/             # Hospital, Destination
│       └── index.ts
│
├── lib/                        # Utilities and core logic
│   ├── guards/                # Route guards (domain-based)
│   ├── routes/                # Route registry (type-safe)
│   ├── utils/                 # Helper functions
│   └── validations/           # Zod schemas
│
├── styles/                     # Design system
│   ├── tokens.ts              # Design tokens
│   ├── components/            # Component styles
│   └── index.ts               # Barrel export
│
└── types/                      # Global types
```

### Design Principles

1. **Feature Modules:** Self-contained domains with components, services, types
2. **Atomic Design:** Reusable UI primitives in components/
3. **Domain Guards:** Authorization logic grouped by domain
4. **Type Safety:** Strict TypeScript, no `any` types
5. **Test Coverage:** Every component and service tested

---

## Component System

### Atomic Design Hierarchy

**Atoms** - Basic building blocks
- `Button`, `Input`, `Image`, `Logo`
- Pure UI primitives with no business logic
- Generic props (string, number, ReactNode)

**Molecules** - Simple combinations
- `FeatureCard`, `FormField`, `HeroGrid`, `PartnerLogos`
- Combine atoms into reusable patterns
- Still generic and domain-agnostic

**Organisms** - Complex components
- `Navigation`, `Footer`, `HeroSection`
- Global layout components
- Used across all features

**Templates** - Page layouts
- `MarketingTemplate`
- Architectural patterns for consistent layouts

### Feature Components

Feature-specific components that wrap shared components with domain logic:

```typescript
// Shared component (generic)
<FeatureCard title={name} description={desc} iconPath={icon}  link={link}/>

// Feature component (domain-specific)
<DepartmentCard 
  department={dept} 
  onClick={(d) => trackEvent('click', d.name)}
/>
```

**Medical Feature:**
- `DepartmentCard` - Displays medical departments
- `DoctorCard` - Shows doctor profiles with specialty/experience

**Facilities Feature:**
- `HospitalCard` - Shows hospitals with location/accreditation

---

## Feature Modules

### Enquiries Feature

**Purpose:** Manage patient enquiries and form submissions

**Components:**
- `EnquiryForm` - Multi-step form with validation

**Services:**
- `EnquiryService.submit()` - Submit enquiry to API
- `EnquiryService.getStatus()` - Check enquiry status

**Types:**
- `EnquiryDTO` - Data transfer object
- `EnquiryStatus` - Status tracking

**Usage:**
```typescript
import { EnquiryForm, EnquiryService } from '@/features/enquiries';
```

### Medical Feature

**Purpose:** Manage medical departments, doctors, treatments

**Components:**
- `DepartmentCard` - Display departments with enhanced descriptions
- `DoctorCard` - Show doctors with specialty and experience

**Services:**
- `MedicalService.getDepartments()` - Get all departments
- `MedicalService.getDoctors()` - Get all doctors
- `MedicalService.getDoctorsBySpecialty()` - Filter by specialty

**Types:**
- `Department` - Medical department info
- `Doctor` - Doctor profile with specialty
- `Treatment` - Treatment details

**Usage:**
```typescript
import { DepartmentCard, DoctorCard, MedicalService } from '@/features/medical';
```

### Facilities Feature

**Purpose:** Manage hospitals and medical facilities

**Components:**
- `HospitalCard` - Display hospitals with location/accreditation

**Services:**
- `FacilitiesService.getHospitals()` - Get all hospitals
- `FacilitiesService.getHospitalsByCountry()` - Filter by location

**Types:**
- `Hospital` - Hospital information
- `Destination` - Medical tourism destinations

**Usage:**
```typescript
import { HospitalCard, FacilitiesService } from '@/features/facilities';
```

---

## Design System

### Token Architecture

All styling uses design tokens - zero inline styles, zero hardcoded values.

**Location:** `src/styles/tokens.ts`

**Categories:**
- Colors (primary, secondary, accent, semantic)
- Typography (font sizes, weights, line heights)
- Spacing (margins, padding, gaps)
- Borders (radius, widths)
- Shadows (elevations)
- Animations (transitions, durations)

### Component Styles

Pre-composed style patterns for common components.

**Location:** `src/styles/components/`

**Examples:**
```typescript
import { styles } from '@/styles';

// Button styles
<button className={styles.button.primary} />

// Card styles
<div className={styles.card.default} />

// Hero styles
<section className={styles.hero.container} />
```

### Usage Pattern

```typescript
// ✅ GOOD: Use design tokens
import { styles } from '@/styles';
<div className={styles.page.grid} />

// ❌ BAD: Hardcoded classes
<div className="grid grid-cols-3 gap-4" />

// ❌ BAD: Inline styles
<div style={{ display: 'grid', gap: '1rem' }} />
```

---

## Development Guide

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Type check
npm run type-check

# Build for production
npm run build
```

### Creating New Components

**1. Shared Components** (in `components/`)
- Generic, reusable UI primitives
- No business logic or feature-specific code
- Accept generic props (string, number, ReactNode)

```typescript
// components/atoms/Badge/Badge.tsx
export function Badge({ children, variant = 'default' }: BadgeProps) {
  return <span className={styles.badge[variant]}>{children}</span>;
}
```

**2. Feature Components** (in `features/*/components/`)
- Domain-specific components
- Wrap shared components with business logic
- Accept domain types (Department, Doctor, etc.)

```typescript
// features/medical/components/TreatmentCard/TreatmentCard.tsx
export function TreatmentCard({ treatment, onClick }: TreatmentCardProps) {
  return (
    <div onClick={() => onClick?.(treatment)}>
      <FeatureCard {...treatment} />
    </div>
  );
}
```

### Creating New Features

```bash
# Create feature structure
mkdir -p src/features/booking/{components,services,types,hooks}

# Create barrel export
touch src/features/booking/index.ts
```

**Feature module structure:**
```typescript
features/booking/
├── components/          # Feature-specific UI
│   ├── BookingForm/
│   └── index.ts
├── services/           # Business logic & API calls
│   └── booking-service.ts
├── types/             # Domain models
│   └── booking.ts
├── hooks/             # Feature-specific hooks (optional)
│   └── useBooking.ts
└── index.ts           # Barrel export
```

### Testing Guidelines

**Component Tests:**
```typescript
import { render, screen } from '@/test-utils';
import { DepartmentCard } from './DepartmentCard';

test('renders department info', () => {
  const dept = { id: 1, name: 'Cardiology', ... };
  render(<DepartmentCard department={dept} />);
  expect(screen.getByText('Cardiology')).toBeInTheDocument();
});
```

**Service Tests:**
```typescript
import { MedicalService } from './medical-service';

test('getDepartments returns all departments', () => {
  const depts = MedicalService.getDepartments();
  expect(depts).toHaveLength(6);
  expect(depts[0]).toHaveProperty('name');
});
```

---

## Best Practices

### Component Architecture

✅ **DO:**
- Keep shared components generic
- Use feature components for domain logic
- Wrap shared components, don't duplicate them
- Accept full domain objects as props
- Use design tokens for all styling

❌ **DON'T:**
- Add business logic to shared components
- Create feature-specific atoms (use shared instead)
- Hardcode styles or classes
- Destructure domain objects in generic components
- Use inline styles

### Feature Modules

✅ **DO:**
- Keep features self-contained
- Export through barrel exports (index.ts)
- Group by domain (medical, facilities, booking)
- Include services, types, and components together
- Test all feature code thoroughly

❌ **DON'T:**
- Import between features (use shared components)
- Mix domains in one feature
- Export internal implementation details
- Skip tests for feature components
- Couple features to specific pages

### Code Quality

✅ **DO:**
- Write TypeScript in strict mode
- Test every component and service
- Use Zod for runtime validation
- Handle errors gracefully
- Document complex logic

❌ **DON'T:**
- Use `any` type
- Skip error handling
- Leave console.logs in code
- Ignore TypeScript errors
- Skip tests

---

## Future Roadmap

### Phase 2: Enhanced Features (Planned)

**Detail Pages**
- `/departments/[slug]` - Department detail with treatments
- `/doctors/[slug]` - Doctor profile with reviews
- `/hospitals/[slug]` - Hospital detail with pricing

**Search & Filtering**
- Search by keywords
- Filter by specialty, location, accreditation
- Sort by popularity, rating, cost

**Enhanced Cards**
- Star ratings display
- Price range indicators
- Availability status
- Patient review counts

### Phase 3: Booking System (Planned)

**Booking Flow**
- "Book Consultation" from doctor cards
- "Request Quote" from hospital cards
- Multi-step booking form
- Payment integration

**User Features**
- Save favorites
- Recently viewed items
- Personalized recommendations
- Booking history

### Phase 4: Advanced Features (Future)

**Analytics & Tracking**
- Event tracking (clicks, views)
- Conversion funnels
- A/B testing framework
- Performance monitoring

**Enterprise Features**
- Multi-language support
- Currency conversion
- Advanced authorization
- Admin dashboard

### Phase 5: Optimization (Future)

**Performance**
- Image optimization
- Code splitting
- Bundle optimization
- Cache strategies

**SEO & Marketing**
- Meta tags optimization
- Structured data
- Sitemap generation
- Open Graph images

---

## Quick Reference

### Common Commands

```bash
# Development
npm run dev                    # Start dev server
npm test                       # Run all tests
npm run type-check            # Check TypeScript

# Code Quality
npm run lint                  # Run ESLint
npm run format                # Format with Prettier

# Production
npm run build                 # Build for production
npm run start                 # Start production server
```

### Import Patterns

```typescript
// Features (barrel imports)
import { EnquiryForm } from '@/features/enquiries';
import { DepartmentCard, MedicalService } from '@/features/medical';

// Shared components
import { Button } from '@/components/atoms/Button/Button';
import { FeatureCard } from '@/components/molecules/FeatureCard/FeatureCard';

// Design system
import { styles } from '@/styles';

// Utilities
import { cn } from '@/lib/utils/cn';
```

### File Locations

- **Components:** `src/components/atoms|molecules|organisms/`
- **Features:** `src/features/[domain]/components/`
- **Services:** `src/features/[domain]/services/`
- **Types:** `src/features/[domain]/types/`
- **Styles:** `src/styles/`
- **Tests:** Co-located with source files

---

**For detailed historical information, see [archive/README.md](./archive/README.md)**

**Last Updated:** October 1, 2025  
**Maintained By:** Development Team

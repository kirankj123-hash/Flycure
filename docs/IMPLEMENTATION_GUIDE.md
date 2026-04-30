# Quick Start: Scalability Improvements

**Priority Implementation Guide**  
**Estimated Time:** 4 weeks for Phase 1 (Critical)

---

## Week 1: Route Organization & Registry

### Step 1: Create Route Registry (Day 1-2)

```typescript
// src/lib/routes/registry.ts
export const routes = {
  public: {
    home: '/',
    medical: {
      departments: {
        list: '/medical/departments',
        detail: (slug: string) => `/medical/departments/${slug}`,
      },
      doctors: {
        list: '/medical/doctors',
        detail: (id: string) => `/medical/doctors/${id}`,
      },
      treatments: {
        list: '/medical/treatments',
        detail: (slug: string) => `/medical/treatments/${slug}`,
      },
    },
    facilities: {
      hospitals: {
        list: '/facilities/hospitals',
        detail: (slug: string) => `/facilities/hospitals/${slug}`,
      },
      destinations: {
        list: '/facilities/destinations',
        detail: (country: string) => `/facilities/destinations/${country}`,
      },
    },
  },
  protected: {
    dashboard: '/dashboard',
    profile: '/profile',
    appointments: {
      list: '/appointments',
      book: '/appointments/book',
      detail: (id: string) => `/appointments/${id}`,
    },
  },
  admin: {
    dashboard: '/admin',
    enquiries: '/admin/enquiries',
    users: {
      list: '/admin/users',
      edit: (id: string) => `/admin/users/${id}`,
    },
  },
} as const;

// Type-safe route access
export type RouteKey = keyof typeof routes;
```

**Usage:**
```typescript
import { routes } from '@/lib/routes';

// Instead of: href="/departments"
// Use: href={routes.public.medical.departments.list}

// Dynamic routes
const url = routes.public.medical.departments.detail('cardiology');
// Result: "/medical/departments/cardiology"
```

### Step 2: Reorganize App Directory (Day 3-4)

**Commands:**
```powershell
# Create new domain structure
New-Item -ItemType Directory -Force -Path "src/app/(public)/medical"
New-Item -ItemType Directory -Force -Path "src/app/(public)/facilities"
New-Item -ItemType Directory -Force -Path "src/app/(public)/services"

# Move existing routes
Move-Item "src/app/(public)/departments" "src/app/(public)/medical/departments"
Move-Item "src/app/(public)/doctors" "src/app/(public)/medical/doctors"
Move-Item "src/app/(public)/hospitals" "src/app/(public)/facilities/hospitals"

# Update imports in moved files
# (Run find/replace: '@/app/(public)/' -> '@/app/(public)/medical/' etc.)
```

### Step 3: Add Route Metadata (Day 5)

```typescript
// src/lib/routes/metadata.ts
export const routeMetadata = {
  'medical:departments:list': {
    title: 'Medical Departments | FlyCure',
    description: 'Browse our comprehensive medical departments...',
    keywords: ['medical', 'departments', 'specialties'],
    ogImage: '/images/og/departments.jpg',
  },
  // ... more routes
};

// Auto-generate metadata in layout.tsx
export async function generateMetadata({ params }) {
  const routeKey = getRouteKeyFromParams(params);
  return routeMetadata[routeKey] || defaultMetadata;
}
```

---

## Week 2: Split Route Guards

### Step 1: Create Guard Domain Structure (Day 1)

```powershell
# Create domain directories
New-Item -ItemType Directory -Force -Path "src/lib/guards/domains"
New-Item -ItemType Directory -Force -Path "src/lib/guards/templates"
```

### Step 2: Create Guard Templates (Day 2)

```typescript
// src/lib/guards/templates/base.guards.ts
export const guardTemplates = {
  public: {
    requiredAuth: false,
    description: 'Public route accessible to all',
  },
  protected: {
    requiredAuth: true,
    requiredPermissions: ['view:dashboard'],
    redirectTo: '/api/auth/signin',
  },
  admin: {
    requiredAuth: true,
    requiredRoles: ['admin', 'super_admin'],
    redirectTo: '/unauthorized',
  },
  superAdmin: {
    requiredAuth: true,
    requiredRoles: ['super_admin'],
    redirectTo: '/unauthorized',
  },
};

// Helper to extend templates
export function createGuard(
  template: keyof typeof guardTemplates,
  overrides: Partial<RouteGuard>
): RouteGuard {
  return {
    ...guardTemplates[template],
    ...overrides,
  };
}
```

### Step 3: Split Guards by Domain (Day 3-4)

```typescript
// src/lib/guards/domains/medical.guards.ts
import { createGuard } from '../templates/base.guards';

export const medicalGuards = {
  'medical:departments:list': createGuard('public', {
    path: '/medical/departments',
    requiredPermissions: ['view:departments'],
    description: 'Medical departments listing',
  }),
  'medical:departments:detail': createGuard('public', {
    path: '/medical/departments/[slug]',
    requiredPermissions: ['view:departments'],
    description: 'Individual department page',
  }),
  'medical:doctors:list': createGuard('public', {
    path: '/medical/doctors',
    requiredPermissions: ['view:doctors'],
    description: 'Doctors listing',
  }),
  'medical:doctors:detail': createGuard('public', {
    path: '/medical/doctors/[id]',
    requiredPermissions: ['view:doctors'],
    description: 'Doctor profile page',
  }),
};
```

```typescript
// src/lib/guards/domains/facilities.guards.ts
export const facilitiesGuards = {
  'facilities:hospitals:list': createGuard('public', {
    path: '/facilities/hospitals',
    requiredPermissions: ['view:hospitals'],
    description: 'Hospital listings',
  }),
  // ... more
};
```

```typescript
// src/lib/guards/domains/admin.guards.ts
export const adminGuards = {
  'admin:dashboard': createGuard('admin', {
    path: '/admin',
    description: 'Admin dashboard',
  }),
  'admin:enquiries': createGuard('admin', {
    path: '/admin/enquiries',
    requiredPermissions: ['manage:enquiries'],
    description: 'Manage enquiries',
  }),
  'admin:users:list': createGuard('admin', {
    path: '/admin/users',
    requiredPermissions: ['manage:users'],
    description: 'User management',
  }),
  'admin:users:edit': createGuard('superAdmin', {
    path: '/admin/users/[id]',
    requiredPermissions: ['manage:users'],
    description: 'Edit user',
  }),
};
```

### Step 4: Merge Guards (Day 5)

```typescript
// src/lib/guards/index.ts
import { medicalGuards } from './domains/medical.guards';
import { facilitiesGuards } from './domains/facilities.guards';
import { adminGuards } from './domains/admin.guards';
import { protectedGuards } from './domains/protected.guards';

export const routeGuards = {
  ...medicalGuards,
  ...facilitiesGuards,
  ...adminGuards,
  ...protectedGuards,
};

// Keep existing exports
export * from './types';
export * from './permissions';
export * from './guard-matcher';
```

**Verify:**
```powershell
# Run tests to ensure nothing broke
npm test -- src/lib/guards/
```

---

## Week 3: Feature-Based Components

### Step 1: Create Feature Structure (Day 1)

```powershell
# Create features directory
New-Item -ItemType Directory -Force -Path "src/features/medical/components"
New-Item -ItemType Directory -Force -Path "src/features/medical/hooks"
New-Item -ItemType Directory -Force -Path "src/features/medical/services"
New-Item -ItemType Directory -Force -Path "src/features/medical/types"
New-Item -ItemType Directory -Force -Path "src/features/appointments"
New-Item -ItemType Directory -Force -Path "src/features/enquiries"
```

### Step 2: Move Feature-Specific Components (Day 2-3)

**Identify feature-specific components:**
- ❌ Button, Input, Image → Stay in `components/atoms/` (shared)
- ✅ EnquiryForm → Move to `features/enquiries/components/`
- ✅ DepartmentCard → Move to `features/medical/components/`
- ✅ (Any component used by only 1-2 pages)

```powershell
# Example: Move EnquiryForm
Move-Item "src/components/organisms/EnquiryForm" "src/features/enquiries/components/EnquiryForm"

# Update imports in that component
# Change: import { Button } from '@/components/atoms/Button'
# To: import { Button } from '@/components/atoms'
```

### Step 3: Create Feature Barrel Exports (Day 4)

```typescript
// src/features/medical/index.ts
export * from './components/DepartmentCard';
export * from './components/DoctorProfile';
export * from './hooks/useDepartments';
export * from './services/departments.service';
export * from './types';
```

### Step 4: Update Imports (Day 5)

```typescript
// Before
import { EnquiryForm } from '@/components/organisms/EnquiryForm';

// After
import { EnquiryForm } from '@/features/enquiries';
```

**Run find/replace:**
```powershell
# VS Code: Ctrl+Shift+H
# Find: from '@/components/organisms/EnquiryForm'
# Replace: from '@/features/enquiries'
```

---

## Week 4: Documentation & Validation

### Step 1: Set Up Storybook (Day 1-2)

```powershell
# Install Storybook
npx storybook@latest init

# Configure for Next.js 15
# Update .storybook/main.ts
```

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/features/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
```

### Step 2: Create Component Stories (Day 3)

```typescript
// src/components/atoms/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};
```

### Step 3: Create Guard Validation Script (Day 4)

```typescript
// scripts/validate-guards.ts
import { routeGuards } from '@/lib/guards';
import { routes } from '@/lib/routes';
import { logger } from '@/lib/logger';

// Extract all route paths from registry
function getAllRoutePaths(obj: any, prefix = ''): string[] {
  const paths: string[] = [];
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      paths.push(value);
    } else if (typeof value === 'function') {
      // Dynamic route - extract base path
      const dynamicPath = value(':param').replace(':param', '[param]');
      paths.push(dynamicPath);
    } else if (typeof value === 'object') {
      paths.push(...getAllRoutePaths(value, prefix));
    }
  }
  
  return paths;
}

// Check if all routes have guards
function validateGuards() {
  const allPaths = getAllRoutePaths(routes);
  const guardPaths = Object.values(routeGuards).map(g => g.path);
  
  const missingGuards = allPaths.filter(path => !guardPaths.includes(path));
  
  if (missingGuards.length > 0) {
    logger.error('Routes missing guards:', { missingGuards });
    process.exit(1);
  }
  
  logger.info('All routes have guards ✓');
}

validateGuards();
```

```powershell
# Add to package.json scripts
npm pkg set scripts.validate:guards="tsx scripts/validate-guards.ts"

# Run validation
npm run validate:guards
```

### Step 4: Create Architecture Documentation (Day 5)

```markdown
// docs/ARCHITECTURE.md
# Architecture Overview

## Project Structure

### Route Organization
- Domain-based structure under `src/app/(public)/`
- Feature modules in `src/features/`
- See [SCALABILITY_ASSESSMENT.md](../SCALABILITY_ASSESSMENT.md)

### Component Organization
- **Shared components**: `src/components/` (atoms, molecules, organisms)
- **Feature components**: `src/features/[feature]/components/`
- **Documentation**: Run `npm run storybook`

### Guards System
- **Domain guards**: `src/lib/guards/domains/`
- **Templates**: `src/lib/guards/templates/`
- **Validation**: `npm run validate:guards`

### Route Registry
- **Type-safe routes**: `src/lib/routes/registry.ts`
- **Usage**: `import { routes } from '@/lib/routes'`

## Development Workflow

1. Create new route in appropriate domain
2. Add route to registry
3. Create guard in domain guards file
4. Run validation: `npm run validate:guards`
5. Add tests
6. Create Storybook stories for new components
```

---

## Verification Checklist

After completing Phase 1, verify:

### ✅ Route Organization
- [ ] All routes organized by domain
- [ ] Route registry created and working
- [ ] Type-safe route access in components
- [ ] Route metadata system in place

### ✅ Guards System
- [ ] Guards split into domain files
- [ ] Guard templates working
- [ ] Guard inheritance reducing duplication
- [ ] Validation script passing

### ✅ Component Organization
- [ ] Feature directories created
- [ ] Feature-specific components moved
- [ ] Shared components remain in `components/`
- [ ] Barrel exports working

### ✅ Documentation
- [ ] Storybook running (`npm run storybook`)
- [ ] Architecture docs created
- [ ] Component stories for key components
- [ ] Developer guide updated

### ✅ Tests
- [ ] All 194 tests still passing
- [ ] No broken imports
- [ ] No TypeScript errors

---

## Commands Reference

```powershell
# Run all tests
npm test -- --run

# Run guard validation
npm run validate:guards

# Start Storybook
npm run storybook

# Build Storybook for deployment
npm run build-storybook

# Type check
npm run type-check

# Lint
npm run lint

# Format code
npm run format
```

---

## Next Steps (Phase 2)

After Phase 1 completion:

1. **Week 5:** Style system enhancement
2. **Week 6:** API versioning and organization
3. **Week 7:** Image optimization and CDN integration
4. **Week 8:** State management with Zustand

See [SCALABILITY_ASSESSMENT.md](./SCALABILITY_ASSESSMENT.md) for full roadmap.

---

**Document Owner:** Development Team  
**Last Updated:** October 1, 2025  
**Status:** Phase 1 Implementation Guide

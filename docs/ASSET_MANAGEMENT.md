# Asset Management System Documentation

This document describes the organized asset management system for scalable image handling in the FlyCure application.

## Overview

The asset management system provides:
- **Organized Directory Structure**: Images grouped by category
- **Centralized Configuration**: Single source of truth for image paths
- **Optimized Components**: Auto-optimizing image components with error handling
- **Type Safety**: Full TypeScript support
- **Performance**: Lazy loading, blur placeholders, and quality optimization

## Directory Structure

```
public/
├── favicon.ico                  # Site favicon (root level)
├── next.svg                     # Next.js branding (root level)
├── vercel.svg                   # Vercel branding (root level)
└── images/                      # ✅ Organized image directory
    ├── brand/                   # Brand assets and logos
    │   ├── flycure_image.png
    │   └── logo.svg
    ├── partners/                # Partner hospital logos
    │   ├── apollo-logo.svg
    │   ├── manipal-logo.svg
    │   └── srisai-logo.svg
    ├── icons/                   # UI icons and symbols
    │   ├── file.svg
    │   ├── globe.svg
    │   └── window.svg
    ├── departments/             # Department-specific images
    │   └── (placeholder structure)
    ├── doctors/                 # Doctor profile images
    │   └── (placeholder structure)
    └── hospitals/               # Hospital facility images
        └── (placeholder structure)
```

## Core Components

### 1. Image Paths Configuration (`lib/assets/image-paths.ts`)

Central configuration for all image paths:

```typescript
import { imagePaths, imagePresets } from '@/lib/assets/image-paths';

// Access image configuration
const logo = imagePaths.brand.logo;
// => '/images/brand/flycure_image.png'

// Access partner logos
const manipalLogo = imagePaths.partners.manipal;
// => { src: '/images/partners/manipal-logo.svg', alt: '...', width: 120, height: 40 }
```

**Features:**
- Type-safe image paths
- Includes src, alt, width, height for all images
- Helper functions for common operations
- Organized by category

**Categories:**
- `brand` - Brand logos and identity
- `partners` - Partner hospital logos  
- `icons` - UI icons
- `departments` - Department images
- `doctors` - Doctor profiles
- `hospitals` - Hospital facilities
- `hero` - Hero section images
- `placeholders` - Fallback images

### 2. OptimizedImage Component (`components/ui/OptimizedImage.tsx`)

Enhanced Next.js Image wrapper with automatic optimization:

```typescript
import { OptimizedImage } from '@/components/ui/OptimizedImage';

// Using predefined asset
<OptimizedImage
  category="partners"
  imageKey="manipal"
  preset="partnerLogo"
  className="my-custom-class"
/>

// Using direct props
<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  width={400}
  height={300}
  preset="heroImage"
/>
```

**Features:**
- Automatic lazy loading
- Error handling with fallbacks
- Loading states with blur placeholders
- Preset styles for common use cases
- Quality optimization (default 85%)
- TypeScript support

**Props:**
- `category` + `imageKey`: Use predefined asset
- `src` + `alt` + `width` + `height`: Direct image props
- `preset`: Apply predefined styles
- `className`: Custom classes
- `priority`: Load image immediately (for above-the-fold)
- `quality`: Image quality (1-100)
- `fill`: Fill parent container
- `fallbackSrc`: Custom fallback image
- `showLoadingPlaceholder`: Show animated loading state

### 3. Specialized Image Components

Pre-configured components for common use cases:

#### BrandLogo
```typescript
import { BrandLogo } from '@/components/ui/OptimizedImage';

<BrandLogo 
  size="default"  // 'small' | 'default' | 'large'
  priority={true}
  className="custom-class"
/>
```

#### PartnerLogo
```typescript
import { PartnerLogo } from '@/components/ui/OptimizedImage';

<PartnerLogo 
  partner="manipal"  // 'manipal' | 'apollo' | 'srisai'
  className="grayscale hover:grayscale-0"
/>
```

#### DepartmentImage
```typescript
import { DepartmentImage } from '@/components/ui/OptimizedImage';

<DepartmentImage 
  department="cardiology"
  className="rounded-lg"
/>
```

#### HeroImage
```typescript
import { HeroImage } from '@/components/ui/OptimizedImage';

<HeroImage 
  type="consultation"  // 'consultation' | 'facility' | 'team' | 'care'
  priority={true}
  className="w-full"
/>
```

#### HospitalImage
```typescript
import { HospitalImage } from '@/components/ui/OptimizedImage';

<HospitalImage 
  location="thailand"  // 'thailand' | 'india' | 'turkey'
  className="aspect-video"
/>
```

#### ProfileImage
```typescript
import { ProfileImage } from '@/components/ui/OptimizedImage';

<ProfileImage 
  src="/images/doctors/doctor-1.jpg"
  alt="Dr. John Doe"
  size="default"  // 'small' | 'default' | 'large'
  className="border-2"
/>
```

#### Icon
```typescript
import { Icon } from '@/components/ui/OptimizedImage';

<Icon 
  name="globe"  // 'file' | 'globe' | 'window'
  size="default"  // 'default' | 'large'
  className="text-blue-600"
/>
```

#### FooterLogo
```typescript
import { FooterLogo } from '@/components/ui/OptimizedImage';

<FooterLogo className="opacity-90" />
```

## Image Presets

Predefined style presets for consistent styling:

```typescript
import { imagePresets } from '@/lib/assets/image-paths';

// Available presets:
imagePresets.partnerLogo     // Partner logos with hover effects
imagePresets.heroImage        // Hero section images
imagePresets.navLogo          // Navigation logo
imagePresets.footerLogo       // Footer logo
imagePresets.profileImage     // Circular profile images
imagePresets.cardImage        // Card images
imagePresets.responsive       // Responsive full-width images
imagePresets.icon             // Small icons (24x24)
imagePresets.iconLarge        // Large icons (32x32)
```

## Usage Examples

### Basic Image with Asset
```typescript
<OptimizedImage
  category="brand"
  imageKey="logo"
  className="h-10"
/>
```

### Image with Loading State
```typescript
<OptimizedImage
  src="/images/departments/cardiology.jpg"
  alt="Cardiology Department"
  width={400}
  height={300}
  showLoadingPlaceholder={true}
  priority={false}
/>
```

### Image with Error Handling
```typescript
<OptimizedImage
  src="/images/doctors/doctor-unknown.jpg"
  alt="Doctor"
  width={300}
  height={300}
  fallbackSrc="/images/placeholders/avatar.png"
  onError={() => console.log('Image failed to load')}
/>
```

### Responsive Fill Image
```typescript
<div className="relative w-full h-64">
  <OptimizedImage
    src="/images/hospitals/facility.jpg"
    alt="Hospital Facility"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    quality={90}
    className="object-cover"
  />
</div>
```

### Hero Section Example
```typescript
import { HeroImage, PartnerLogo } from '@/components/ui/OptimizedImage';

<section>
  <HeroImage type="consultation" priority={true} />
  
  <div className="partner-logos">
    <PartnerLogo partner="manipal" />
    <PartnerLogo partner="apollo" />
    <PartnerLogo partner="srisai" />
  </div>
</section>
```

## Backward Compatibility

The old `CentralizedImage` component is maintained for backward compatibility:

```typescript
// Old way (still works)
import { BrandLogo } from '@/components/ui/CentralizedImage';

// New way (recommended)
import { BrandLogo } from '@/components/ui/OptimizedImage';
```

All existing code continues to work without changes.

## Adding New Images

### 1. Add Image File

Place the image in the appropriate directory:
```
public/images/departments/neurology.jpg
```

### 2. Add Configuration

Update `lib/assets/image-paths.ts`:
```typescript
export const imagePaths = {
  departments: {
    // ... existing departments
    neurology: {
      src: '/images/departments/neurology.jpg',
      alt: 'Neurology Department - Brain and Nervous System',
      width: 400,
      height: 300,
    },
  },
};
```

### 3. Use in Components

```typescript
<DepartmentImage department="neurology" />
```

## Performance Optimizations

### 1. Lazy Loading
All images lazy load by default (except `priority={true}`):
- Reduces initial page load time
- Images load as they enter viewport
- Automatic with Next.js Image component

### 2. Quality Settings
```typescript
<OptimizedImage
  quality={85}  // Default: good balance of quality/size
  // quality={90}  // Higher quality for hero images
  // quality={75}  // Lower quality for thumbnails
/>
```

### 3. Responsive Images
```typescript
<OptimizedImage
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  // Tells browser which size to load
/>
```

### 4. Priority Loading
```typescript
<OptimizedImage
  priority={true}  // Load immediately (above-the-fold images)
/>
```

### 5. Image Formats
Next.js automatically serves:
- WebP for supported browsers
- AVIF for cutting-edge browsers
- Original format as fallback

## Best Practices

### 1. Always Use Alt Text
```typescript
// ✅ Good
<OptimizedImage
  src="/image.jpg"
  alt="Descriptive alt text for accessibility"
/>

// ❌ Bad
<OptimizedImage
  src="/image.jpg"
  alt=""
/>
```

### 2. Use Appropriate Sizes
```typescript
// ✅ Good: Actual display size
<OptimizedImage width={400} height={300} />

// ❌ Bad: Oversized images
<OptimizedImage width={4000} height={3000} className="w-40" />
```

### 3. Use Priority for Above-the-Fold
```typescript
// ✅ Good: Hero images, logos
<HeroImage type="consultation" priority={true} />

// ❌ Bad: Below-the-fold images
<DepartmentImage department="cardiology" priority={true} />
```

### 4. Use Presets for Consistency
```typescript
// ✅ Good: Consistent styling
<OptimizedImage preset="partnerLogo" />

// ❌ Bad: Inline styles everywhere
<OptimizedImage className="grayscale hover:grayscale-0 transition-all duration-300" />
```

### 5. Provide Fallbacks
```typescript
// ✅ Good: Graceful degradation
<OptimizedImage
  src="/might-not-exist.jpg"
  fallbackSrc="/placeholder.jpg"
/>
```

## Testing

All components include comprehensive tests:
- ✅ 146 tests passing
- ✅ Image component rendering
- ✅ Error handling
- ✅ Loading states
- ✅ Accessibility attributes

Test coverage includes:
- Brand logo rendering
- Partner logo hover states
- Department/hospital images
- Error fallbacks
- Loading placeholders

## Future Enhancements

Potential improvements for future iterations:

1. **CDN Integration**: Serve images from CDN
2. **Blur Placeholders**: Generate blur data URLs at build time
3. **Image Optimization Pipeline**: Automated compression/resizing
4. **Srcset Generation**: Multiple sizes for different devices
5. **Image Analytics**: Track image load performance
6. **WebP/AVIF Conversion**: Build-time format conversion

## Migration from Old System

Old `imageAssets` system in `src/assets/images.ts` is deprecated. Use new system:

**Before:**
```typescript
import { imageAssets } from '@/assets/images';
const logo = imageAssets.brand.logo; // '/flycure_image.png'
```

**After:**
```typescript
import { imagePaths } from '@/lib/assets/image-paths';
const logo = imagePaths.brand.logo; // '/images/brand/flycure_image.png'
```

## Related Documentation

- `DESIGN_SYSTEM_V4.md` - Design system structure
- `ROUTE_ORGANIZATION.md` - Route structure
- `README.md` - Project overview

## Version History

- **v2.0** (Current): Organized directory structure with OptimizedImage component
- **v1.0**: Flat structure with CentralizedImage component

---

**Last Updated:** October 1, 2025

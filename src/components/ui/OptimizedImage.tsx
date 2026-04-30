/**
 * OptimizedImage Component
 * Enhanced Next.js Image wrapper with automatic optimization, lazy loading, and error handling
 * 
 * Features:
 * - Automatic image optimization
 * - Lazy loading with blur placeholder
 * - Error handling with fallback images
 * - Responsive sizing
 * - Preset styles for common use cases
 * - TypeScript support
 */

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { imagePaths, imagePresets, type ImagePreset, type ImageCategory } from '@/lib/assets/image-paths';
import { logger } from '@/lib/logger';

interface OptimizedImageProps {
  // Option 1: Use predefined asset from imagePaths
  category?: ImageCategory;
  imageKey?: string;
  
  // Option 2: Direct image props
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  
  // Styling
  preset?: ImagePreset;
  className?: string;
  
  // Next.js Image props
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;
  
  // Error handling
  fallbackSrc?: string;
  onError?: () => void;
  
  // Loading state
  showLoadingPlaceholder?: boolean;
}

export function OptimizedImage({
  category,
  imageKey,
  src: directSrc,
  alt: directAlt,
  width: directWidth,
  height: directHeight,
  preset,
  className,
  priority = false,
  quality = 85,
  fill = false,
  sizes,
  fallbackSrc,
  onError,
  showLoadingPlaceholder = true,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Determine image configuration
  let imageConfig = {
    src: directSrc || '',
    alt: directAlt || 'Image',
    width: directWidth,
    height: directHeight,
  };

  // If using predefined asset, get config from imagePaths
  if (category && imageKey) {
    const categoryImages = imagePaths[category] as Record<string, unknown>;
    const config = categoryImages[imageKey];
    
    if (config && typeof config === 'object' && 'src' in config) {
      const typedConfig = config as { src: string; alt: string; width?: number; height?: number };
      imageConfig = {
        src: typedConfig.src,
        alt: typedConfig.alt,
        width: typedConfig.width || directWidth,
        height: typedConfig.height || directHeight,
      };
    } else {
      logger.warn('Image not found in category', { category, imageKey });
      imageConfig.src = imagePaths.placeholders.default;
      imageConfig.alt = 'Image not available';
    }
  }

  // Use fallback if image failed to load
  const finalSrc = imageError 
    ? (fallbackSrc || imagePaths.placeholders.default)
    : imageConfig.src;

  // Handle image load error
  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
    onError?.();
  };

  // Handle image load complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Combine preset and custom classes
  const finalClassName = cn(
    preset && imagePresets[preset],
    isLoading && showLoadingPlaceholder && 'animate-pulse bg-gray-200',
    className
  );

  // Common props for all image variants
  const commonProps = {
    alt: imageConfig.alt || 'Image',
    className: finalClassName,
    quality,
    priority,
    onError: handleError,
    onLoad: handleLoadingComplete,
  };

  // Render with fill mode or fixed dimensions
  if (fill) {
    return (
      <div className="relative w-full h-full">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          {...commonProps}
          src={finalSrc}
          fill
          sizes={sizes}
        />
      </div>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...commonProps}
      src={finalSrc}
      width={imageConfig.width || 400}
      height={imageConfig.height || 300}
    />
  );
}

// Specialized image components for common use cases

/**
 * Brand Logo Component
 * Used in navigation and headers
 */
export function BrandLogo({ 
  className, 
  priority = true,
  size = 'default' 
}: { 
  className?: string; 
  priority?: boolean;
  size?: 'small' | 'default' | 'large';
}) {
  const dimensions = {
    small: { width: 32, height: 32 },
    default: { width: 40, height: 40 },
    large: { width: 60, height: 60 },
  };

  return (
    <OptimizedImage
      src={imagePaths.brand.logo}
      alt={imagePaths.brand.logoAlt}
      width={dimensions[size].width}
      height={dimensions[size].height}
      preset="navLogo"
      className={className}
      priority={priority}
    />
  );
}

/**
 * Partner Logo Component
 * Used for hospital partner logos with hover effects
 */
export function PartnerLogo({ 
  partner, 
  className 
}: { 
  partner: 'manipal' | 'apollo' | 'srisai'; 
  className?: string; 
}) {
  const config = imagePaths.partners[partner];
  
  return (
    <OptimizedImage
      src={config.src}
      alt={config.alt}
      width={config.width}
      height={config.height}
      preset="partnerLogo"
      className={className}
    />
  );
}

/**
 * Department Image Component
 * Used in department listing and detail pages
 */
export function DepartmentImage({ 
  department,
  className 
}: { 
  department: keyof typeof imagePaths.departments;
  className?: string; 
}) {
  return (
    <OptimizedImage
      category="departments"
      imageKey={department}
      preset="cardImage"
      className={className}
    />
  );
}

/**
 * Hero Image Component
 * Large images for hero sections
 */
export function HeroImage({ 
  type, 
  className,
  priority = true,
}: { 
  type: 'consultation' | 'facility' | 'team' | 'care'; 
  className?: string;
  priority?: boolean;
}) {
  return (
    <OptimizedImage
      category="hero"
      imageKey={type}
      preset="heroImage"
      className={className}
      priority={priority}
    />
  );
}

/**
 * Hospital Image Component
 * Images for hospital facilities
 */
export function HospitalImage({ 
  location,
  className 
}: { 
  location: keyof typeof imagePaths.hospitals;
  className?: string; 
}) {
  return (
    <OptimizedImage
      category="hospitals"
      imageKey={location}
      preset="cardImage"
      className={className}
    />
  );
}

/**
 * Profile Image Component
 * Circular images for doctor profiles
 */
export function ProfileImage({ 
  src,
  alt = 'Profile',
  size = 'default',
  className 
}: { 
  src?: string;
  alt?: string;
  size?: 'small' | 'default' | 'large';
  className?: string; 
}) {
  const dimensions = {
    small: 64,
    default: 128,
    large: 256,
  };
  
  const dimension = dimensions[size];
  
  return (
    <OptimizedImage
      src={src || imagePaths.placeholders.avatar}
      alt={alt}
      width={dimension}
      height={dimension}
      preset="profileImage"
      className={className}
    />
  );
}

/**
 * Icon Component
 * Small icons from the icon set
 */
export function Icon({ 
  name,
  size = 'default',
  className 
}: { 
  name: keyof typeof imagePaths.icons;
  size?: 'default' | 'large';
  className?: string; 
}) {
  const preset = size === 'large' ? 'iconLarge' : 'icon';
  const dimension = size === 'large' ? 32 : 24;
  
  return (
    <OptimizedImage
      src={imagePaths.icons[name]}
      alt={`${name} icon`}
      width={dimension}
      height={dimension}
      preset={preset}
      className={className}
    />
  );
}

/**
 * Footer Logo Component
 * Logo used in footer with specific styling
 */
export function FooterLogo({ className }: { className?: string }) {
  return (
    <OptimizedImage
      src={imagePaths.brand.logoSvg}
      alt={imagePaths.brand.logoAlt}
      width={120}
      height={40}
      preset="footerLogo"
      className={className}
    />
  );
}

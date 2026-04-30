import Image from 'next/image';
import { imageAssets, imagePresets, type ImagePreset } from '@/assets/images';
import { cn } from '@/lib/utils/cn';

// Enhanced Image component that works with centralized assets
interface CentralizedImageProps {
  // Option 1: Use predefined asset
  asset?: {
    category: keyof typeof imageAssets;
    key: string;
  };
  
  // Option 2: Use direct props (for custom images)
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  
  // Styling options
  preset?: ImagePreset;
  className?: string;
  priority?: boolean;
  
  // Next.js Image props
  fill?: boolean;
  sizes?: string;
  quality?: number;
}

export function CentralizedImage({
  asset,
  src: directSrc,
  alt: directAlt,
  width: directWidth,
  height: directHeight,
  preset,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 75,
}: CentralizedImageProps) {
  // Determine image source and props
  let imageProps = {
    src: directSrc || '',
    alt: directAlt || '',
    width: directWidth,
    height: directHeight,
  };

  // If using asset, get props from centralized config
  if (asset) {
    const categoryImages = imageAssets[asset.category] as Record<string, unknown>;
    const assetConfig = categoryImages[asset.key] as { src: string; alt: string; width?: number; height?: number } | undefined;
    
    if (assetConfig) {
      imageProps = {
        src: assetConfig.src,
        alt: assetConfig.alt,
        width: assetConfig.width || directWidth,
        height: assetConfig.height || directHeight,
      };
    } else {
      console.warn(`Asset not found: ${asset.category}.${asset.key}`);
      // Fallback to placeholder
      imageProps = {
        src: imageAssets.placeholders.default,
        alt: 'Image not found',
        width: directWidth || 400,
        height: directHeight || 300,
      };
    }
  }

  // Combine preset and custom classes
  const finalClassName = cn(
    preset && imagePresets[preset],
    className
  );

  // Prepare props for Next.js Image
  const imageComponentProps = {
    src: imageProps.src,
    alt: imageProps.alt || 'Decorative image',
    quality,
    priority,
    className: finalClassName,
    ...(fill ? { fill: true, sizes } : { width: imageProps.width, height: imageProps.height }),
  };

  return (
    <Image
      {...imageComponentProps}
      alt={imageComponentProps.alt}
    />
  );
}

// Specialized components for common use cases
export function BrandLogo({ className, priority = true }: { className?: string; priority?: boolean }) {
  return (
    <CentralizedImage
      asset={{ category: 'navigation', key: 'logo' }}
      className={className}
      priority={priority}
    />
  );
}

export function PartnerLogo({ 
  partner, 
  className 
}: { 
  partner: 'manipal' | 'apollo' | 'srisai'; 
  className?: string; 
}) {
  return (
    <CentralizedImage
      asset={{ category: 'partners', key: partner }}
      preset="partnerLogo"
      className={className}
    />
  );
}

export function HeroImage({ 
  type, 
  className 
}: { 
  type: 'consultation' | 'facility' | 'team' | 'care'; 
  className?: string; 
}) {
  return (
    <CentralizedImage
      asset={{ category: 'hero', key: type }}
      preset="heroImage"
      className={className}
    />
  );
}

export function FooterLogo({ className }: { className?: string }) {
  return (
    <CentralizedImage
      asset={{ category: 'footer', key: 'logo' }}
      preset="footerLogo"
      className={className}
    />
  );
}
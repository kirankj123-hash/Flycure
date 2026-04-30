import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import { componentPatterns } from '@/styles/tokens';

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  unoptimized?: boolean;
}

export function AtomicImage({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  priority = false,
  fill = false,
  sizes,
  unoptimized,
  ...props 
}: ImageProps) {
  const shouldBypassOptimization =
    unoptimized ?? (src.endsWith(".svg") || src.includes("placehold.co"));

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(componentPatterns.image.cover, className)}
      priority={priority}
      fill={fill}
      sizes={sizes}
      unoptimized={shouldBypassOptimization}
      {...props}
    />
  );
}

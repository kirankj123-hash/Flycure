import { AtomicImage } from '../Image/Image';
import { cn } from '@/lib/utils/cn';
import { componentPatterns } from '@/styles/tokens';

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function HeroImage({ src, alt, className }: HeroImageProps) {
  return (
    <AtomicImage
      src={src}
      alt={alt}
      width={400}
      height={300}
      className={cn(componentPatterns.image.responsive, className)}
      priority
    />
  );
}

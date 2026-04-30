import { AtomicImage } from '../Image/Image';

interface LogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ src, alt, width = 120, height = 40, className }: LogoProps) {
  return (
    <AtomicImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-contain ${className}`}
    />
  );
}
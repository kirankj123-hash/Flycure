import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  children: React.ReactNode;
  className?: string;
  strokeWidth?: number;
  'aria-hidden'?: boolean;
}

/**
 * Icon Atom
 *
 * Provides a consistent wrapper for inline SVG icons.
 */
export function Icon({
  children,
  className,
  viewBox = "0 0 24 24",
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  'aria-hidden': ariaHidden = true,
  ...props
}: IconProps) {
  return (
    <svg
      className={cn(className)}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      aria-hidden={ariaHidden}
      {...props}
    >
      {children}
    </svg>
  );
}

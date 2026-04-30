import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'address';
  className?: string;
  htmlFor?: string; // For label elements
}

/**
 * Text Atom
 * 
 * A flexible text component that can render as different text elements.
 * Use this instead of raw <p>, <span>, <label>, <h1-h6> elements.
 */
export function Text({ 
  children, 
  as: Component = 'p',
  className,
  htmlFor,
  ...props 
}: TextProps) {
  return (
    <Component 
      className={cn(className)} 
      {...(Component === 'label' && htmlFor ? { htmlFor } : {})}
      {...props}
    >
      {children}
    </Component>
  );
}

import React from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/utils/cn';

export interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  'aria-label'?: string;
  onClick?: () => void;
}

/**
 * Link Atom
 * 
 * A wrapper around Next.js Link for consistent link styling and behavior.
 * Use this instead of raw <a> or Next.js <Link> directly.
 */
export function Link({ 
  href, 
  children, 
  className,
  external = false,
  ...props 
}: LinkProps) {
  if (external) {
    return (
      <a 
        href={href}
        className={cn(className)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink 
      href={href}
      className={cn(className)}
      {...props}
    >
      {children}
    </NextLink>
  );
}

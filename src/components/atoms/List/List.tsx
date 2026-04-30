import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  children: React.ReactNode;
  ordered?: boolean;
  className?: string;
}

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * List Atom
 * 
 * A wrapper for unordered and ordered lists.
 * Use this instead of raw <ul> or <ol> elements.
 */
export function List({ 
  children, 
  ordered = false,
  className,
  ...props 
}: ListProps) {
  const Component = ordered ? 'ol' : 'ul';
  
  return (
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
}

/**
 * ListItem Atom
 * 
 * A wrapper for list items.
 * Use this instead of raw <li> elements.
 */
export function ListItem({ 
  children, 
  className,
  ...props 
}: ListItemProps) {
  return (
    <li className={cn(className)} {...props}>
      {children}
    </li>
  );
}

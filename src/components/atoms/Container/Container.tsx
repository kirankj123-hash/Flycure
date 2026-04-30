import React from 'react';
import { cn } from '@/lib/utils/cn';

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
} & (
  | ({ as?: 'div' } & React.HTMLAttributes<HTMLDivElement>)
  | ({ as: 'section' } & React.HTMLAttributes<HTMLElement>)
  | ({ as: 'article' } & React.HTMLAttributes<HTMLElement>)
  | ({ as: 'aside' } & React.HTMLAttributes<HTMLElement>)
  | ({ as: 'nav' } & React.HTMLAttributes<HTMLElement>)
  | ({ as: 'header' } & React.HTMLAttributes<HTMLElement>)
  | ({ as: 'footer' } & React.HTMLAttributes<HTMLElement>)
  | ({ as: 'main' } & React.HTMLAttributes<HTMLElement>)
  | ({ as: 'form' } & React.FormHTMLAttributes<HTMLFormElement>)
);

/**
 * Container Atom
 * 
 * A flexible container component that can render as different semantic HTML elements.
 * Use this instead of raw <div> elements for better semantic structure.
 */
export function Container({ 
  children, 
  as: Component = 'div',
  className,
  ...props 
}: ContainerProps) {
  return (
    // @ts-expect-error - Complex union type with form props requires type assertion
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
}

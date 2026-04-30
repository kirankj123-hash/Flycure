import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  className?: string;
  error?: boolean;
}

export interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

/**
 * Select Atom
 * 
 * A wrapper for select dropdowns.
 * Use this instead of raw <select> elements.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, error, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          className,
          error && "border-destructive focus-visible:ring-destructive"
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

/**
 * Option Atom
 * 
 * A wrapper for select options.
 * Use this instead of raw <option> elements.
 */
export function Option({ children, ...props }: OptionProps) {
  return <option {...props}>{children}</option>;
}

import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: boolean;
}

/**
 * TextArea Atom
 * 
 * A wrapper for textarea elements.
 * Use this instead of raw <textarea> elements.
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          className,
          error && "border-destructive focus-visible:ring-destructive"
        )}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';

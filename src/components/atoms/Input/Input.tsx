import * as React from "react"
import { cn } from "@/lib/utils/cn"
import { styles, tokens } from "@/styles/design-system"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    if (error) {
      return (
        <div>
          <input
            type={type}
            className={cn(
              styles.form.input,
              tokens.borders.destructive,
              tokens.borders.focusDestructive,
              className
            )}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={`${props.id}-error`}
            {...props}
          />
          <p
            id={`${props.id}-error`}
            className={styles.form.error}
            role="alert"
          >
            {error}
          </p>
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          styles.form.input,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

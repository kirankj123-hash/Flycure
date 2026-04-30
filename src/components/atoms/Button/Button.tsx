import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"
import { styles } from "@/styles/design-system"

const buttonVariants = cva(
  styles.button.base,
  {
    variants: {
      variant: {
        default: styles.button.primary,
        destructive: styles.button.destructive,
        outline: styles.button.outline,
        secondary: styles.button.secondary,
        ghost: styles.button.ghost,
        link: styles.button.link,
      },
      size: {
        default: styles.button.default,
        sm: styles.button.sm,
        lg: styles.button.lg,
        icon: styles.button.icon,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

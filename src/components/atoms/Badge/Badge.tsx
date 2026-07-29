import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-700",
        neutral: "bg-bark-50 text-bark-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-amber-100 text-amber-800",
        error: "bg-red-100 text-red-700",
        info: "bg-leaf-50 text-leaf-700",
        guava: "bg-guava-50 text-guava-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />
}

export { Badge, badgeVariants }

'use client';

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const stepperVariants = cva("inline-flex items-center rounded-full border border-leaf-300 bg-white", {
  variants: {
    size: {
      default: "h-11",
      sm: "h-9",
    },
  },
  defaultVariants: { size: "default" },
})

export interface QuantitySelectorProps extends VariantProps<typeof stepperVariants> {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  unitLabel?: string
  className?: string
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 50,
  step = 1,
  unitLabel = "kg",
  size,
  className,
}: QuantitySelectorProps) {
  const atMin = value <= min
  const atMax = value >= max

  const dec = () => onChange(Math.max(min, +(value - step).toFixed(2)))
  const inc = () => onChange(Math.min(max, +(value + step).toFixed(2)))

  return (
    <div className={cn(stepperVariants({ size, className }))} role="group" aria-label={`Quantity in ${unitLabel}`}>
      <button
        type="button"
        onClick={dec}
        disabled={atMin}
        aria-label="Decrease quantity"
        className="flex h-full w-11 min-w-[44px] items-center justify-center rounded-l-full text-xl font-semibold text-leaf-700 disabled:cursor-not-allowed disabled:opacity-30 hover:bg-leaf-50"
      >
        −
      </button>
      <span className="min-w-[3.5rem] px-1 text-center text-base font-semibold tabular-nums text-text-primary">
        {value} <span className="text-xs font-normal text-text-secondary">{unitLabel}</span>
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={atMax}
        aria-label="Increase quantity"
        className="flex h-full w-11 min-w-[44px] items-center justify-center rounded-r-full text-xl font-semibold text-leaf-700 disabled:cursor-not-allowed disabled:opacity-30 hover:bg-leaf-50"
      >
        +
      </button>
    </div>
  )
}

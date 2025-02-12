import type { ReactNode } from "react"
import React, { forwardRef } from "react"

export interface GapXBaseProps {
  className?: string
  children?: ReactNode
}

export type GapXSizeProps =
  | { "gap-x-0-5": true }
  | { "gap-x-1": true }
  | { "gap-x-1-5": true }
  | { "gap-x-2": true }
  | { "gap-x-2-5": true }
  | { "gap-x-3": true }
  | { "gap-x-3-5": true }
  | { "gap-x-4": true }
  | { "gap-x-5": true }
  | { "gap-x-6": true }
  | { "gap-x-7": true }
  | { "gap-x-8": true }
  | { "gap-x-9": true }
  | { "gap-x-10": true }
  | { "gap-x-11": true }
  | { "gap-x-12": true }
  | { "gap-x-14": true }
  | { "gap-x-16": true }
  | { "gap-x-20": true }
  | { "gap-x-24": true }
  | { "gap-x-28": true }
  | { "gap-x-32": true }
  | { "gap-x-36": true }
  | { "gap-x-40": true }
  | { "gap-x-44": true }
  | { "gap-x-48": true }
  | { "gap-x-52": true }
  | { "gap-x-56": true }
  | { "gap-x-60": true }
  | { "gap-x-64": true }
  | { "gap-x-72": true }
  | { "gap-x-80": true }
  | { "gap-x-96": true }
  | Record<string, never>

export interface GapXBaseProps {
  className?: string
  children?: ReactNode
}

export type GapXProps = GapXBaseProps & GapXSizeProps

const GapX = forwardRef<HTMLDivElement, GapXProps>(
  ({ className = "", children, ...sizeProps }, ref) => {
    let gapClass = "flex" // Default classes

    // Determine which size prop was passed in
    for (const size in sizeProps) {
      if (sizeProps[size as keyof GapXSizeProps]) {
        gapClass += ` ${size}`
        break
      }
    }

    return (
      <div ref={ref} className={`${gapClass} ${className}`.trim()}>
        {children}
      </div>
    )
  }
)

GapX.displayName = "GapX"
export default GapX

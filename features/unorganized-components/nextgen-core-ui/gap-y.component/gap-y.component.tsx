import type { ReactNode } from "react"
import React from "react"

export interface GapYBaseProps {
  className?: string
  children?: ReactNode
}

export type GapYSizeProps =
  | { "gap-y-0": true }
  | { "gap-y-0-5": true }
  | { "gap-y-1": true }
  | { "gap-y-1-5": true }
  | { "gap-y-2": true }
  | { "gap-y-2-5": true }
  | { "gap-y-3": true }
  | { "gap-y-3-5": true }
  | { "gap-y-4": true }
  | { "gap-y-5": true }
  | { "gap-y-6": true }
  | { "gap-y-7": true }
  | { "gap-y-8": true }
  | { "gap-y-9": true }
  | { "gap-y-10": true }
  | { "gap-y-11": true }
  | { "gap-y-12": true }
  | { "gap-y-14": true }
  | { "gap-y-16": true }
  | { "gap-y-20": true }
  | { "gap-y-24": true }
  | { "gap-y-28": true }
  | { "gap-y-32": true }
  | { "gap-y-36": true }
  | { "gap-y-40": true }
  | { "gap-y-44": true }
  | { "gap-y-48": true }
  | { "gap-y-52": true }
  | { "gap-y-56": true }
  | { "gap-y-60": true }
  | { "gap-y-64": true }
  | { "gap-y-72": true }
  | { "gap-y-80": true }
  | { "gap-y-96": true }
  | Record<string, never>

export type GapYProps = GapYBaseProps & GapYSizeProps

const GapY: React.FC<GapYProps> = ({
  className = "",
  children,
  ...sizeProps
}) => {
  let gapClass = "flex flex-col" // Default classes

  // Determine which size prop was passed in
  for (const size in sizeProps) {
    if (sizeProps[size as keyof GapYSizeProps]) {
      gapClass += ` ${size}`
      break
    }
  }

  return <div className={`${gapClass} ${className}`.trim()}>{children}</div>
}

export default GapY

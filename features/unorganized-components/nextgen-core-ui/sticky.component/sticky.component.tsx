import React from "react"

import type { IBaseComponentProps } from "../types"

interface IStickyProps extends IBaseComponentProps {
  style?: React.CSSProperties
  top?: number | string
  bottom?: number | string
  left?: number | string
  right?: number | string
}

/**
 * Sticky component - A div with CSS `position: sticky` property.
 *
 * It is ideal to use this component when you want an element to stick to the edge of a scrolling viewport.
 *
 * Examples:
 * - `<Sticky top={0}>`       = sticks to the top when you scroll past it.
 * - `<Sticky right="5px">`   = sticks to the right by 5 pixels.
 * - `<Sticky bottom="10%">`  = sticks to the bottom by 10%.
 *
 * Note: Ensure the parent has a scrolling mechanism and the parent isn't set to overflow: hidden.
 *
 * @param {IStickyProps} props - The component properties
 * @returns {ReactElement} A div with sticky position
 */

const Sticky: React.FC<IStickyProps> = ({
  children,
  className = "",
  style = {},
  top,
  bottom,
  left,
  right,
  ...rest
}) => {
  if (typeof top !== "undefined") style.top = top
  if (typeof bottom !== "undefined") style.bottom = bottom
  if (typeof left !== "undefined") style.left = left
  if (typeof right !== "undefined") style.right = right

  return (
    <div className={`sticky ${className}`.trim()} style={style} {...rest}>
      {children}
    </div>
  )
}

export default Sticky

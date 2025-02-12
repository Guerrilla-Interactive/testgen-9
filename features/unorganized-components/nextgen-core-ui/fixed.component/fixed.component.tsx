import React from "react"

import type { IBaseComponentProps } from "../types"

interface IFixedProps extends IBaseComponentProps {
  style?: React.CSSProperties
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
  xCenter?: boolean
  yCenter?: boolean
}

/**
 * Fixed component - A div with CSS `position: fixed` property.
 *
 * It is ideal to use this component when you want to position an element relative to the browser window.
 *
 * Examples:
 * - `<Fixed>`       = default to top-left corner.
 * - `<Fixed top right>` = positioned at top-right corner.
 * - `<Fixed bottom xCenter>` = positioned at bottom and centered horizontally.
 * - `<Fixed xCenter yCenter>` = centered both horizontally and vertically.
 *
 * @param {IFixedProps} props - The component properties
 * @returns {ReactElement} A div with fixed position
 */

const Fixed: React.FC<IFixedProps> = ({
  children,
  className = "",
  style,
  top = true,
  bottom,
  left = true,
  right,
  xCenter,
  yCenter,
  ...rest
}) => {
  let positioningClasses = ""

  if (top && !bottom) positioningClasses += "top-0 "
  if (left && !right) positioningClasses += "left-0 "
  if (right) positioningClasses += "right-0 "
  if (bottom) positioningClasses += "bottom-0 "
  if (xCenter) positioningClasses += "left-1/2 transform -translate-x-1/2 "
  if (yCenter) positioningClasses += "top-1/2 transform -translate-y-1/2 "

  return (
    <div
      className={`fixed ${positioningClasses}${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Fixed

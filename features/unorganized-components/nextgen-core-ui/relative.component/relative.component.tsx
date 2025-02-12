import React from "react"

import type { IBaseComponentProps } from "../types"

interface IRelativeProps extends IBaseComponentProps {
  style?: React.CSSProperties
  zIndex?: number // z-index value
  overflow?: "visible" | "hidden" | "scroll" | "auto" // overflow value
  overflowX?: "visible" | "hidden" | "scroll" | "auto" // overflow-x value
  overflowY?: "visible" | "hidden" | "scroll" | "auto" // overflow-y value
}

/**
 * Relative component - A div with CSS `position: relative` property.
 *
 * This component is ideal for:
 * - Positioning child elements using `absolute` positioning, relative to this parent.
 * - Adjusting the z-index to control layering of elements.
 * - Controlling overflow to determine how overflowed content should be displayed or hidden.
 *
 * @param {IRelativeProps} props - The component properties
 * @returns {ReactElement} A div with relative position and additional styling options
 */

const Relative: React.FC<IRelativeProps> = ({
  children,
  className = "",
  style,
  zIndex,
  overflow,
  overflowX,
  overflowY,
  ...rest
}) => {
  const combinedStyles: React.CSSProperties = {
    position: "relative",
    zIndex: zIndex,
    overflow: overflow,
    overflowX: overflowX,
    overflowY: overflowY,
    ...style,
  }

  return (
    <div className={`${className}`.trim()} style={combinedStyles} {...rest}>
      {children}
    </div>
  )
}

export default Relative

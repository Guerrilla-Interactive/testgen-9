import React, { forwardRef } from "react"
import type { FlexDirection, FlexProps } from "./flex"

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      auto = false,
      row = false,
      col = false,
      column = false,
      direction,
      children,
      style = {},
      id,
      className = "",
      ...rest
    },
    ref
  ) => {
    // Map directions to corresponding classes
    const directionClasses: Record<FlexDirection, string> = {
      auto: "flex-col  md:flex-row",
      row: "flex-row",
      col: "flex-col",
      column: "flex-col",
    }

    let flexClasses = "flex  "

    // Determine the classes based on the direction or boolean props
    if (direction) {
      flexClasses += directionClasses[direction]
    } else if (auto) {
      flexClasses += directionClasses["auto"]
    } else if (row) {
      flexClasses += directionClasses["row"]
    } else if (col || column) {
      flexClasses += directionClasses["col"]
    }

    flexClasses += ` ${className}`

    return (
      <div
        ref={ref}
        id={id}
        style={style}
        className={flexClasses.trim()}
        {...rest}
      >
        {children}
      </div>
    )
  }
)

// This is for display name and component dev tools
Flex.displayName = "Flex"

export default Flex

import React, { forwardRef } from "react"

import Flex from "../flex.component/flex.component"
import { BaseProps } from "../flex.component/flex"

/**
 * FlexCol component - A flex column layout component.
 *
 * This component is essentially a Flex with `col` direction.
 *
 * - `col` stacks the children vertically (along the column).
 *
 * It is ideal to use this component when you want to create a vertical stack of elements.
 *
 * @param {BaseProps} props - The component properties
 * @returns {ReactElement} A flex column layout component
 */

const FlexCol = forwardRef<HTMLDivElement, BaseProps>(
  ({ children, className, style = {}, ...rest }, ref) => {
    return (
      <Flex
        ref={ref}
        direction="col"
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </Flex>
    )
  }
)

FlexCol.displayName = "FlexCol"
export default FlexCol

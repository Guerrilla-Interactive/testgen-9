import React, { forwardRef } from "react"

import Flex from "../flex.component/flex.component"
import type { IBaseComponentProps } from "../types"

/**
 * FlexRow component - A flex row layout component.
 *
 * This component is essentially a Flex with `row` direction.
 *
 * - `row` aligns the children horizontally (along the row).
 *
 * It is ideal to use this component when you want to create a horizontal alignment of elements.
 *
 * @param {IBaseComponentProps} props - The component properties
 * @returns {ReactElement} A flex row layout component
 */

const FlexRow = forwardRef<HTMLDivElement, IBaseComponentProps>(
  ({ children, className, style = {}, id, ...rest }, ref) => {
    return (
      <Flex
        ref={ref}
        id={id}
        auto
        style={style}
        className={className}
        {...rest}
      >
        {children}
      </Flex>
    )
  }
)

FlexRow.displayName = "FlexRow"
export default FlexRow

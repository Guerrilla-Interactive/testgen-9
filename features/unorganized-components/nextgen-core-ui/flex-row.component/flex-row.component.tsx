import React, { forwardRef } from "react"

import Flex from "../flex.component/flex.component"
import type { IBaseComponentProps } from "../types"
import { DirectionClasses } from "../flex.component/flex.component"
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

interface FlexRowProps extends IBaseComponentProps {
  notAuto?: boolean;
}

const FlexRow = forwardRef<HTMLDivElement, FlexRowProps>(
  ({ children, className, style = {}, id, notAuto = false, direction = "auto", ...rest }, ref) => {
    return (
      <Flex
        ref={ref}
        id={id}
        direction={notAuto ? "row" : "auto"}
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

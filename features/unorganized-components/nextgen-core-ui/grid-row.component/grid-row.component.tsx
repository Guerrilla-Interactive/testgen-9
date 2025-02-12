import React from "react"

import Grid from "../grid.component/grid.component"
import type { IBaseComponentProps } from "../types"

/**
 * GridRow component - A grid-based row layout component.
 *
 * This component is essentially a Grid with `rows` prop set to true.
 *
 * It is ideal to use this component when you want to take advantage of CSS Grid layout to align elements in a row fashion.
 *
 * @param {IBaseComponentProps} props - The component properties
 * @returns {ReactElement} A grid-based row layout component
 */

const GridRow: React.FC<IBaseComponentProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <Grid row className={className} {...rest}>
      {children}
    </Grid>
  )
}

export default GridRow

import React from "react"

import Grid from "../grid.component/grid.component"
import type { IBaseComponentProps } from "../types"

/**
 * GridCol component - A grid-based column layout component.
 *
 * This component is essentially a Grid with `columns` prop set to true.
 *
 * It is ideal to use this component when you want to take advantage of CSS Grid layout to align elements in a column fashion.
 *
 * @param {IBaseComponentProps} props - The component properties
 * @returns {ReactElement} A grid-based column layout component
 */

const GridCol: React.FC<IBaseComponentProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <Grid col className={className} {...rest}>
      {children}
    </Grid>
  )
}

export default GridCol

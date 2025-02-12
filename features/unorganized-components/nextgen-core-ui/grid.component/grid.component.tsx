import type { ReactNode } from "react"
import React from "react"

type GridProps = {
  col?: boolean // Determines if grid should use grid-columns
  row?: boolean // Determines if grid should use grid-rows
  children?: ReactNode
  className?: string
} & React.HTMLProps<HTMLDivElement>

const Grid: React.FC<GridProps> = ({
  col = false,
  row = false,
  children,
  className = "",
  ...rest
}) => {
  let gridClasses = "grid "

  if (col) {
    gridClasses += "grid-flow-row "
  }

  if (row) {
    gridClasses += "grid-flow-col "
  }

  gridClasses += className

  return (
    <div className={gridClasses.trim()} {...rest}>
      {children}
    </div>
  )
}

export default Grid

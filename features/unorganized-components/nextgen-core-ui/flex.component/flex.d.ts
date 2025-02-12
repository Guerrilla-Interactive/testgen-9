import type { MouseEventHandler, ReactNode } from "react"

/**
 * BaseProps interface for components, including optional className and children props.
 * The children prop is flexible, allowing various data types.
 */
export interface BaseProps {
  id?: string
  className?: string
  style?: React.CSSProperties // Made style optional to match your other code
  children?:
    | ReactNode
    | JSX.Element
    | JSX.Element[]
    | React.ReactNode
    | undefined
    | null
  onClick?: MouseEventHandler<HTMLDivElement> // Added the onClick type definition here
}

/**
 * FlexDirection type for specifying the direction of flex elements.
 * Possible values include "auto", "row", "col", "column".
 */
export type FlexDirection = "auto" | "row" | "col" | "column"

/**
 * NoDirectionProps interface for a Flex component with no direction specified.
 * The rendered component uses the default styles.
 * Rendered as: `<Flex>` = flex
 */
export interface NoDirectionProps extends BaseProps {
  /** A component with no direction specified. It applies 'flex' to the class. */
  auto?: never
  row?: never
  col?: never
  column?: never
  direction?: never
}

/**
 * AutoProps interface for a Flex component that changes direction based on viewport size.
 * Using `auto` prop will add 'sm:flex-col md:flex-row' to the class.
 * Rendered as: `<Flex auto>` = flex + flex-col + md:flex-row
 */
export interface AutoProps extends BaseProps {
  /** Adds 'flex flex-col md:flex-row' to the class */
  auto: true
  row?: never
  col?: never
  column?: never
  direction?: never
}

/**
 * RowProps interface for a Flex component that will always be a row.
 * Using `row` prop will add 'sm:flex-row md:flex-row' to the class.
 * Rendered as: `<Flex row>` = flex + flex-row
 */
export interface RowProps extends BaseProps {
  /** Adds 'flex flex-row' to the class */

  auto?: never
  row: true
  col?: never
  column?: never
  direction?: never
}

/**
 * ColProps interface for a Flex component that will always be a column.
 * Using `col` prop will add 'sm:flex-col md:flex-col' to the class.
 * Rendered as: `<Flex col>` = flex + flex-col
 */
export interface ColProps extends BaseProps {
  /** Adds 'flex flex-col' to the class */
  auto?: never
  row?: never
  col: true
  column?: never
  direction?: never
}

/**
 * ColumnProps interface for a Flex component that will always be a column.
 * Using `column` prop will add 'sm:flex-col md:flex-col' to the class.
 * Rendered as: `<Flex column>` = flex + flex-col
 */
export interface ColumnProps extends BaseProps {
  /** Adds the corresponding flex classes to the class */
  auto?: never
  row?: never
  col?: never
  column: true
  direction?: never
}

/**
 * DirectionProps interface for a Flex component where you can explicitly specify the direction.
 * Using `direction` prop will add the corresponding flex classes to the class.
 * Rendered as: `<Flex direction="value">` = flex + respective flex direction classes
 */
export interface DirectionProps extends BaseProps {
  auto?: never
  row?: never
  col?: never
  column?: never
  direction: FlexDirection
}

/**
 * FlexProps type that could be one of the following types:
 * NoDirectionProps, AutoProps, RowProps, ColProps, ColumnProps, DirectionProps.
 */
export type FlexProps =
  | NoDirectionProps
  | AutoProps
  | RowProps
  | ColProps
  | ColumnProps
  | DirectionProps

import React, { ReactElement, forwardRef } from "react"

import type { IBaseComponentProps } from "../types"

const maxWidthClasses = {
  narrow: "max-w-screen-narrow",
  wide: "max-w-screen-wide",
  medium: "max-w-screen-medium",
  default: "max-w-screen-default",
}
type MaxWidthType = keyof typeof maxWidthClasses

const textAlignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
}
type TextAlignmentType = keyof typeof textAlignmentClasses

const DISPLAY_CLASSES = [
  "flex",
  "inline-flex",
  "grid",
  "inline-grid",
  "block",
  "inline-block",
  "table",
  "table-row",
  "table-cell",
]
type DisplayType = keyof typeof DISPLAY_CLASSES

const DIRECTION_CLASSES = [
  "flex-row",
  "flex-row-reverse",
  "flex-col",
  "flex-col-reverse",
  "grid-flow-row",
  "grid-flow-col",
  "grid-flow-row-dense",
  "grid-flow-col-dense",
]
type DirectionType = keyof typeof DIRECTION_CLASSES

interface IContainerProps extends IBaseComponentProps {
  declarativeOnly?: boolean
  as?: "div" | "section" | "article" | "header" | "footer" | "main"
  display?: DisplayType
  disableContainer?: boolean
  disableDefaultMaxWidth?: boolean
  disableFullWidth?: boolean
  direction?: DirectionType
  maxWidth?: MaxWidthType
  textAlignment?: TextAlignmentType
  ref?: React.Ref<HTMLDivElement>
}

const WIDTH_CLASSES_REGEX = /w-\w+/

// This utility function checks if any width classes are in the provided string
const containsWidthClass = (input: string): boolean => {
  return WIDTH_CLASSES_REGEX.test(input)
}

// This utility function checks if any direction classes are in the provided string
const containsDirectionClass = (input: string): boolean => {
  return input
    .split(" ")
    .some((className) => DIRECTION_CLASSES.includes(className))
}

// This utility function checks if any display classes are in the provided string
const containsDisplayClass = (input: string): boolean => {
  return input
    .split(" ")
    .some((className) => DISPLAY_CLASSES.includes(className))
}

const generateClassNames = (props: IContainerProps) => {
  const {
    declarativeOnly,
    disableContainer,
    disableDefaultMaxWidth,
    disableFullWidth,
    direction = "flex-col",
    className = "container",
    maxWidth,
    textAlignment = "left",
  } = props

  if (declarativeOnly) return ""

  const classes = []

  if (!disableContainer) classes.push("container")
  if (!disableDefaultMaxWidth) classes.push(maxWidthClasses.default)
  if (!disableFullWidth && !containsWidthClass(className))
    classes.push("w-full")

  if (maxWidth) {
    if (maxWidthClasses[maxWidth as MaxWidthType]) {
      classes.push(maxWidthClasses[maxWidth as MaxWidthType])
    } else {
      classes.push(maxWidth)
    }
  }

  if (!containsDirectionClass(className)) {
    if (!containsDisplayClass(className)) {
      classes.push(direction)
    } else if (direction !== "flex-col") {
      classes.push(direction)
    }
  }

  if (
    typeof textAlignment === "string" &&
    textAlignmentClasses[textAlignment]
  ) {
    classes.push(textAlignmentClasses[textAlignment])
  } else if (typeof textAlignment === "string") {
    classes.push(textAlignment)
  }

  return classes.join(" ")
}

/**
 * Container component - A general purpose container.
 *
 * At its core, this component defaults to the classes: `container max-w-screen-default flex flex-col`. However, the pivotal behavior to understand is:
 * if any display classes are provided within the `className` prop, it suppresses the default `flex` and `flex-col` classes.
 *
 * Highlights:
 * - `container`: Centers content and sets padding.
 * - `max-w-screen-default`: Caps the container's width to a default value.
 * - Overridable by `disableContainer` and `disableDefaultMaxWidth` respectively.
 * - Change its semantic HTML tag using the 'as' prop, with choices like 'div', 'section', and more. Defaults to 'div'.
 *
 * For custom max-width:
 * Update your tailwind.config.js:
 * ```
 * theme: {
 *     extend: {
 *       screens: {
 *         default: "min(90vw, 1750px)", // example
 *       },
 *     },
 * }
 * ```
 *
 * Additional Props:
 * - `declarativeOnly`: Opt to solely rely on the declarative props, bypassing default behaviors.
 * - `display`: Defines the CSS display property. Defaults to `flex`.
 * - `disableFullWidth`: Opts out of the `w-full` class.
 * - `direction`: Specifies direction for flexbox or grid. Defaults to `flex-col`.
 *
 * Note: Manual `direction` persists even with display classes in `className`.
 *
 * @param {IContainerProps} props - The component properties
 * @returns {ReactElement} A streamlined container component
 */

const Container = forwardRef<HTMLDivElement, IContainerProps>((props, ref) => {
  const {
    children,
    maxWidth,
    declarativeOnly,
    className = "",
    display = "flex",
    as: Component = "div",
    ...rest
  } = props

  const baseClasses = generateClassNames(props)
  const effectiveDisplay = containsDisplayClass(className) ? "" : display
  const combinedClassName = `${baseClasses} ${effectiveDisplay as string
    } ${className}`.trim()

  return (
    <Component ref={ref} className={combinedClassName} {...rest}>
      {children}
    </Component>
  )
})

Container.displayName = "Container" // This is for display name and component dev tools

export default Container

import React from "react"

import type { IBaseComponentProps } from "../types"

interface IInnerSectionProps extends IBaseComponentProps {
  children?: React.ReactNode
  className?: string
  declarativeOnly?: boolean
  enableMaxWidth?: boolean
}

/**
 * InnerSection component - A standalone section of a document or application.
 *
 * This component is a `<section>` HTML element, which represents a standalone section — which doesn't have a more specific semantic element to represent it — contained within an HTML document.
 *
 * - `section` represents a standalone section in the document.
 * - `max-w-screen-default` sets the maximum width of the section to a default value.
 *
 * Use this component to divide your content into distinct sections, each potentially with its own heading.
 *
 * You can enable the `max-w-screen-default` using `enableMaxWidth`.
 *
 * If you wish to change the default max-width value, you can do so by adding a custom screen size named 'default' in your tailwind.config.js. For example:
 *
 * ```
 * theme: {
 *     extend: {
 *       screens: {
 *         xs: "375px",
 *         "example-breakpoint": "1280px",
 *         default: "min(90vw, 1750px)",
 *       },
 *     },
 * }
 * ```
 *
 * @param {IInnerSectionProps} props - The component properties
 * @returns {ReactElement} A InnerSection component
 */

const InnerSection: React.FC<IInnerSectionProps> = ({
  children,
  className = "",
  declarativeOnly = false,
  enableMaxWidth = false,
  ...rest
}) => {
  let baseClasses = ""
  if (!declarativeOnly) {
    baseClasses += enableMaxWidth ? "max-w-screen-default " : ""
  }

  const combinedClassName = `${baseClasses}${className}`.trim()

  return (
    <section className={combinedClassName} {...rest}>
      {children}
    </section>
  )
}

export default InnerSection

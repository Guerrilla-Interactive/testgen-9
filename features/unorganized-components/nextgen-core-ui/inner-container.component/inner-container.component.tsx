import React from "react"

interface IInnerContainerProps {
  children?: JSX.Element | JSX.Element[] | React.ReactNode | undefined
  className?: string
  declarativeOnly?: boolean
  as?: "div" | "section"
  disableFullWidth?: boolean
  disableContainer?: boolean
  maxWidth?: "default" | "narrow" | "wide" //
}

/**
 * InnerContainer component - A container for a distinct part of the content.
 *
 * This component is essentially a div with `group`, `w-full`, and `container` classes applied by default.
 *
 * - `group` can be used to style child components in relation to a parent.
 * - `w-full` sets the width to 100%.
 * - `container` centers the content and sets padding around it.
 *
 * Use this component when you want to group elements together and apply styles to them as a single entity.
 *
 * You can disable `group`, `w-full`, and `container` individually, using `disableGroup`, `disableFullWidth`, and `disableContainer`.
 * Also, you can render the InnerContainer as 'div' or 'section' using the 'as' prop. The default is 'div'.
 *
 * @param {IInnerContainerProps} props - The component properties
 * @returns {ReactElement} An InnerContainer component
 */

const InnerContainer: React.FC<IInnerContainerProps> = ({
  children,
  className = "",
  declarativeOnly = false,
  as: Component = "div",
  maxWidth = "default", // default max-width is 'default'

  disableFullWidth = false,
  disableContainer = false,
  ...rest
}) => {
  let baseClasses = ""
  if (!declarativeOnly) {
    baseClasses += disableFullWidth ? "" : "w-full "
    baseClasses += disableContainer ? "" : `container max-w-${maxWidth} `
  }

  const combinedClassName = `${baseClasses}${className}`.trim()

  return (
    <Component className={combinedClassName} {...rest}>
      {children}
    </Component>
  )
}

export default InnerContainer

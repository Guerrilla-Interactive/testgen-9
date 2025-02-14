import React from "react"

import type { IBaseComponentProps } from "../types"

interface ISectionProps extends IBaseComponentProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  declarativeOnly?: boolean;
  enableMaxWidth?: boolean;
  absolute?: boolean;
  style?: React.CSSProperties;
}

/**
 * Section component - A standalone section of a document or application.
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
 * @param {ISectionProps} props - The component properties
 * @returns {ReactElement} A Section component
 */

const Section: React.FC<ISectionProps> = ({
  children,
  className = "",
  declarativeOnly = false,
  enableMaxWidth = false,
  absolute = false, // Initialize the new prop
  style,
  ...rest
}) => {
  let baseClasses = "z-10 ";
  if (absolute) {
    baseClasses = "absolute "; // Add 'absolute' class if absolute prop is true
  }
  if (!declarativeOnly) {
    baseClasses += enableMaxWidth ? "max-w-screen-default " : "";
  }

  const combinedClassName = `${baseClasses}${className}`.trim();

  return (
    <section className={combinedClassName} style={style} {...rest}>
      {children}
    </section>
  );
};

export default Section;
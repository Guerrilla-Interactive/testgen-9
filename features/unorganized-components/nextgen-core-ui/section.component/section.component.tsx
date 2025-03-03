"use client";

import * as React from "react";
import type { ReactElement } from "react";

import { cn } from "@/features/unorganized-utils/utils";

interface ISectionProps {
  /**
   * Section content.
   */
  children?: React.ReactNode;
  /**
   * HTML element id attribute.
   */
  id?: string;
  /**
   * Additional CSS classes.
   * @default ""
   */
  className?: string;
  /**
   * Inline styles.
   */
  style?: React.CSSProperties;
}

/**
 * @default
 * ```jsx
 * <section className="z-10 max-w-screen-default">
 *   Content goes here.
 * </section>
 * ```
 *
 * Section component - A standalone section of a document or application.
 *
 * This component renders a `<section>` HTML element with flexible styling options.
 *
 * - If `absolute` is true, the section uses absolute positioning.
 * - When `enableMaxWidth` is enabled and `declarativeOnly` is false, it applies the default max width class.
 * - Additional styling can be applied via the `className` prop.
 *
 * @param props - The properties for the Section component.
 * @returns The Section element.
 */
export default function Section({
  children,
  id,
  className = "",
  declarativeOnly = false,
  enableMaxWidth = false,
  style,
  ...rest
}: ISectionProps): ReactElement {
  return (
    <section
      id={id}
      className={cn(
        "z-10",
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </section>
  );
}

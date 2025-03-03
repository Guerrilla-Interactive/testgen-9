"use client";

import * as React from "react";
import type { ReactElement } from "react";

import { cn } from "@/features/unorganized-utils/utils";

interface IContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * HTML element to render.
   * @default "div"
   */
  as?: "div" | "section" | "article" | "header" | "footer" | "main";
  /**
   * Layout display.
   * @default "flex-col"
   */
  display?: "flex-col" | "flex-row" | "flex-col-reverse" | "flex-row-reverse" | "grid" | "inline-grid";
  /**
   * Maximum width setting.
   * @default "default"
   */
  maxWidth?: "narrow" | "wide" | "medium" | "default";
  /**
   * Additional CSS classes.
   * @default ""
   */
  className?: string;
  /**
   * Container content.
   */
  children?: React.ReactNode;

  /**
   * HTML element id attribute.
   */
  id?: string;


  /**
   * Height of the container.
   */
  height?: "full" | "auto"

  /**
   * Ref object.
   */
  ref?: React.RefObject<HTMLDivElement>;

  /**
   * Style.
   */
  style?: React.CSSProperties;

}

/**
 * @default
 * ```jsx
 * <div className="relative flex flex-col container max-w-default">
 *   Content goes here.
 * </div>
 * ```
 *
 * @param props Container properties.
 * @returns The container element.
 */
export default function Container({
  children,
  className = "",
  display = "flex-col",
  as: Component = "div",
  id,
  maxWidth = "default",
  height = "full",
  style,
  ref,
  
}: IContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        "relative container",
        display === "flex-col" && "flex flex-col",
        display === "flex-row" && "flex flex-row",
        display === "flex-col-reverse" && "flex flex-col-reverse",
        display === "flex-row-reverse" && "flex flex-row-reverse",
        display === "grid" && "grid grid-cols-12",
        display === "inline-grid" && "inline-grid grid-cols-12",
        maxWidth && `max-w-${maxWidth}`,
        height && `h-${height}`,
        className
      )}
      style={style}
      ref={ref}
      
    >
      {children}
    </Component>
  );
}

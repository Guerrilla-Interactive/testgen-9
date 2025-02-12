import React from "react"

import type { IBaseComponentProps } from "../types"

/**
 * PageContainer component - A main container for the page's content.
 *
 * This component is a `<main>` HTML element, which represents the dominant content of the `<body>` of a document.
 *
 * Use this component to wrap the main content of your page, excluding things like navigation bars and footers.
 *
 * @param {IBaseComponentProps} props - The component properties
 * @returns {ReactElement} A PageContainer component
 */
const PageContainer: React.FC<IBaseComponentProps> = ({
  children,
  ...rest
}) => {
  return (
    <main {...rest}>
      <div>{children}</div>
    </main>
  )
}

export default PageContainer

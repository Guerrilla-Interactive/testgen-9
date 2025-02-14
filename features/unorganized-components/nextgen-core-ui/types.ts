import type { JSXElementConstructor } from "react"

export interface IBaseComponentProps {
  className?: string
  id?: string
  style?: React.CSSProperties
  children?: React.ReactNode | React.ReactNode[] | undefined
}

"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "../unorganized-utils/utils"


interface TogglePanelProps {
    title?: string
    children?: React.ReactNode
}

const TogglePanel: React.FC<TogglePanelProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <>
            <div className="w-full">
                {isOpen && (
                    <div className="panel">
                        <div>{children}</div>
                    </div>
                )}
            </div>
            <button
                className={cn(
                    "fixed bottom-6 right-6 mr-auto h-14 w-14 rounded-full z-50  border-2 text-opacity-70 border-white border-opacity-10 hover:text-opacity-100 bg-black bg-opacity-20 text-xs backdrop-blur-md  transition-all duration-100 hover:scale-105 hover:border-opacity-100 hover:bg-opacity-40 active:scale-95 active:bg-opacity-50",
                    isOpen && "scale-105  bg-opacity-40"
                )}
                onClick={handleToggle}
                type="button"
            >
                {isOpen ? "Close" : "States"}
            </button>
        </>
    )
}

export default TogglePanel

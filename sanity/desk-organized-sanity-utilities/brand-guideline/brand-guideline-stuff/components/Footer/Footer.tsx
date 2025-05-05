import React, { useContext } from "react";
// Assuming GlobalStateContext provides an object with an updatedAt property
// Adjust the import path and type definition as necessary for your project
import { GlobalStateContext } from "../../context/globalContext"; 
import { toDateString } from "../../lib/helpers";

// Define a type for the context value if available, otherwise use 'any'
type GlobalContextType = {
  updatedAt?: Date | string; // Example type, adjust as needed
};

const Footer: React.FC = () => {
  const { updatedAt } = useContext(GlobalStateContext) as GlobalContextType;

  // Converted styles from Footer.module.scss to Tailwind classes
  const footerClasses = [
    "fixed",
    "bottom-0",
    "left-0",
    "w-full",
    "h-16", // Assuming --footer-height maps to h-16 (4rem)
    "flex",
    "items-center",
    "px-8", // Assuming 2rem padding maps to px-8
    "border-t", // Assuming --stroke maps to a standard top border
    "border-gray-200", // Assuming --stroke color
    "bg-white", // Assuming --background-color maps to white
    "text-gray-600", // Assuming --color-gray-600
    "z-50", // Assuming z-index: 100 maps to z-50
  ].join(" ");

  return (
    <footer className={footerClasses}>
      <span>
        Sist oppdatert: {updatedAt ? toDateString(updatedAt) : "N/A"}
      </span>
    </footer>
  );
};

export default Footer; 
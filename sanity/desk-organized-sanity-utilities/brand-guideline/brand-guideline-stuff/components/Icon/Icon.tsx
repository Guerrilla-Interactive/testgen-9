import React from 'react';
// Assuming iconlibrary.ts exports the icon data and the IconName type correctly
import iconLibraryData, { IconName } from './iconlibrary'; 

// Define the props interface using the IconName type
interface IconProps {
  icon: IconName; // Use the exported type for valid icon names
  size?: number;  // Size remains optional number
}

const Icon: React.FC<IconProps> = ({ icon, size = 24 }) => {
  // Function to safely get the icon element from the library
  const getIconElement = (iconName: IconName): React.ReactElement | null => {
    return iconLibraryData[iconName] || null;
  };

  const iconElement = getIconElement(icon);

  // Render the SVG with the icon content
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none" // Keep fill as none, individual icons might have their own fills/strokes
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" // Add aria-hidden if icons are purely decorative
    >
      {iconElement}
    </svg>
  );
};

export default Icon; 
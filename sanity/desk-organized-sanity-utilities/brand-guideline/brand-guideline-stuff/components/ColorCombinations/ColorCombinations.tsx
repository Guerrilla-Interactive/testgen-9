import React from 'react';
// NOTE: Update colorUtils import path/extension when converted
import { cleanHex, WcagContrast } from '../ColorPreview/colorUtils'; 
import WCAGLabel from '../WCAGLabel/WCAGLabel';

// Define type for individual color combination
interface ColorPair {
  color1: string;
  color2: string;
}

// Define type for the main prop (node containing colorCombinations)
interface ColorCombinationsProps {
  node: {
    colorCombinations: ColorPair[];
  };
}

const ColorCombinations: React.FC<ColorCombinationsProps> = ({ node }) => {
  // Return null if node or colorCombinations are missing
  if (!node || !node.colorCombinations) {
    console.warn('ColorCombinations component missing required props');
    return null;
  }

  // Clean hex codes
  const cleanedCombinations = node.colorCombinations.map(({ color1, color2 }) => ({
    color1: cleanHex(color1),
    color2: cleanHex(color2),
  }));

  return (
    <div
      className="grid gap-4 mb-4" // Styles for .combinations
      style={{
        // Keep dynamic grid columns as inline style
        gridTemplateColumns: `repeat(${cleanedCombinations.length}, 1fr)`,
      }}
    >
      {cleanedCombinations.map(({ color1, color2 }) => {
        const contrastRatio = WcagContrast(color1, color2);
        return (
          <div
            key={color1 + color2}
            // Add group for hover effect on child overlay
            className="group relative w-full pb-[100%] overflow-hidden border border-gray-200" // Styles for .outerColor (assuming border-gray-200 for --stroke)
            style={{
              // Inline style for dynamic background
              backgroundColor: color2,
            }}
          >
            <div
              // Styles for .innerColor
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] pb-[60%]"
              style={{ backgroundColor: color1 }} // Inline style for dynamic background
            />
            {/* Overlay shown on hover */}
            <div
              className="absolute bottom-0 left-0 w-full bg-white p-2 border-t border-gray-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex items-center justify-between" // Styles for .overlay (assuming border-t)
            >
              <span className="text-sm font-mono">{contrastRatio}</span>
              <WCAGLabel contrastRatio={contrastRatio} largeText />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ColorCombinations; 
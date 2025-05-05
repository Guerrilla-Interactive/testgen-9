import React from 'react';
// NOTE: Update getImageResolution import path/extension when helpers are converted/typed




import BlockContent from '../BlockContent/BlockContent';
import Image from '../Image/Image';





const getImageResolution = (listLength) => {
  switch (listLength) {
    case 1:
      return 1400;
    case 2:
      return 800;
    case 3: {
      return 600;
    }
    default:
      return 800;
  }
};






// Interface for a single item in the list
interface GridItem {
  image: any; // Replace with a specific Sanity image type if available
  text: any[]; // Replace with a specific Sanity block array type if available
  // Add _key or other unique identifier if available from Sanity data
}

// Interface for the main component props
interface ImageAndTextGridProps {
  node: {
    list?: GridItem[];
  };
}

const ImageAndTextGrid: React.FC<ImageAndTextGridProps> = ({ node }) => {
  // Early return if list is missing or empty
  if (!node?.list || node.list.length === 0) {
    console.warn('ImageAndTextGrid component missing or empty list');
    return null;
  }

  const { list } = node;

  // Calculate image resolution (assuming helper function exists and is typed)
  const imageWidth = getImageResolution(list.length);

  return (
    <div
      className="grid gap-4 my-4" // Tailwind classes for grid, gap, margin
      style={{ 
        // Keep dynamic grid columns as inline style
        gridTemplateColumns: `repeat(${list.length}, 1fr)` 
      }}
    >
      {list.map((item, index) => {
        // Use a more reliable key if available (e.g., item._key from Sanity)
        const key = item.image?.asset?._ref || index; 
        return (
          <div key={key}>
            {item.image && (
              <Image image={item.image} width={imageWidth} />
            )}
            {item.text && (
              <BlockContent blocks={item.text} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageAndTextGrid; 
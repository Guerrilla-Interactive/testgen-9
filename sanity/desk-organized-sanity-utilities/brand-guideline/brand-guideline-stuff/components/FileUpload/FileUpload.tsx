import React from 'react';
import Icon from '../Icon/Icon'; // Import from TSX Icon component
import type { IconName } from '../Icon/iconlibrary'; // Correctly import IconName as a type

// Define the expected structure for the file asset
interface FileAsset {
  url?: string;
  extension?: string;
}

// Define the main props interface for the node
interface FileUploadProps {
  node: {
    title?: string;
    file?: {
      asset?: FileAsset;
    };
  };
}

const FileUpload: React.FC<FileUploadProps> = ({ node }) => {
  // Early return if essential data is missing
  if (!node || !node.file?.asset || !node.title) {
    console.warn('FileUpload component missing required props (node, title, file.asset)');
    return null;
  }

  const { title } = node;
  const { url = '', extension = '' } = node.file.asset;

  // Don't render if URL is missing
  if (!url) {
    console.warn('FileUpload component: file URL is missing');
    return null;
  }

  const downloadUrl = `${url}?dl=${encodeURIComponent(title)}.${extension}`;

  // Combine Tailwind classes
  const linkClasses = [
    'group', // For hover states on children
    'inline-flex',
    'items-center',
    'h-12',
    'bg-gray-800',
    'text-white',
    'no-underline',
    'transition-colors',
    'duration-200',
    'ease-in-out',
    'hover:bg-gray-700',
    'active:bg-gray-800',
    // Add margin if needed in parent: e.g., 'mr-4 mb-4' or use flex/grid gap
  ].join(' ');

  const contentClasses = 'px-4 py-2 text-base'; // .buttonContent styles

  const iconContainerClasses = [
    'flex',
    'items-center',
    'justify-center',
    'w-12',
    'h-full',
    'bg-gray-900',
    'transition-colors',
    'duration-200',
    'ease-in-out',
    'group-hover:bg-gray-800',
    'group-active:bg-gray-900',
  ].join(' ');

  return (
    <a href={downloadUrl} className={linkClasses} download={`${title}.${extension}`}>
      <span className={contentClasses}>
        {title}.{extension}
      </span>
      <span className={iconContainerClasses}>
        {/* Ensure 'download' is a valid IconName */}
        <Icon icon={'download' as IconName} /> 
      </span>
    </a>
  );
};

// PropTypes are removed as TypeScript interfaces provide type checking

export default FileUpload; 
import React from 'react';

// Define the props interface
interface WCAGLabelProps {
  contrastRatio: number;
  largeText?: boolean;
}

const WCAGLabel: React.FC<WCAGLabelProps> = ({ contrastRatio, largeText }) => {
  let label = 'Fail';
  const AAAThreshold = largeText ? 4.5 : 7;
  const AAThreshold = largeText ? 3 : 4.5;

  if (contrastRatio >= AAAThreshold) {
    label = 'AAA';
  } else if (contrastRatio >= AAThreshold) {
    label = 'AA';
  }

  // Combine static and dynamic Tailwind classes
  const labelClasses = [
    'inline-block', // display: inline-block
    'px-1',         // padding: 0 4px
    'text-xs',      // font-size: 0.7rem (approx)
    'ml-2',         // margin-left: 0.5rem
    label === 'Fail' ? 'bg-gray-200 text-gray-700' : 'bg-green-500 text-white', // Dynamic background and text color
  ].join(' ');

  return (
    <div className={labelClasses}>
      {label}
    </div>
  );
};

export default WCAGLabel; 
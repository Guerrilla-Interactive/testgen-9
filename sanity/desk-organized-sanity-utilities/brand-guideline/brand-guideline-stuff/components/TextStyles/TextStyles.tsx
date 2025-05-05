import React from 'react';
import Icon from '../Icon/Icon';
import type { IconName } from '../Icon/iconlibrary'; // Correctly import IconName as a type

// Interface for a single text style configuration
interface TextStyleProps {
  name: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string | number; // Can be string ('normal', 'bold') or number
  fontLineHeight: number; // Assuming percentage
  fontLetterSpacing?: number; // Optional, assuming percentage
  ligatures?: boolean; // Optional
  // Add _key if available from Sanity
  _key?: string;
}

// Interface for the main component props
interface TextStylesContainerProps {
  node: {
    textStyles?: TextStyleProps[];
  };
}

// Internal component to render a single text style example
const TextStyleDisplay: React.FC<TextStyleProps> = ({
  name,
  fontFamily,
  fontSize,
  fontWeight,
  fontLineHeight,
  fontLetterSpacing = 0, // Default letter spacing
  ligatures = false, // Default ligatures
}) => {
  // Dynamic tag rendering based on the style name
  const Tag: React.ElementType = (({ children, style, className }) => {
    const props = { style, className };
    switch (name) {
      case "Heading 1": return <h1 {...props}>{children}</h1>;
      case "Heading 2": return <h2 {...props}>{children}</h2>;
      case "Heading 3": return <h3 {...props}>{children}</h3>;
      case "Heading 4": return <h4 {...props}>{children}</h4>;
      case "Heading 5": return <h5 {...props}>{children}</h5>;
      case "Heading 6": return <h6 {...props}>{children}</h6>;
      case "Subtitle 1": return <h5 {...props}>{children}</h5>; // Assuming subtitle maps to heading
      case "Subtitle 2": return <h6 {...props}>{children}</h6>;
      // Default to paragraph for Body, Button, Overline, Caption, etc.
      default: return <p {...props}>{children}</p>;
    }
  });

  const numberOfLines = fontSize < 24 ? 4 : 2;
  const maxHeight = ((fontSize * fontLineHeight) / 100) * numberOfLines;

  // Inline styles for the text example
  const textStyle = {
    fontFamily,
    fontSize: `${fontSize}px`,
    fontWeight,
    lineHeight: `${fontLineHeight}%`,
    letterSpacing: fontLetterSpacing ? `${fontLetterSpacing}%` : 'normal',
    fontFeatureSettings: ligatures ? '' : '' , // Add ligature settings if needed, e.g., 'liga off', 'clig off'
    maxHeight: `${maxHeight}px`,
  };

  const wrapperClasses =
    "grid grid-cols-[200px_1fr] border-t border-dashed border-gray-200 pt-12 mb-32";
  // Add gap for spacing between icon and text
  const textValuesItemClasses = "flex items-center mb-4 mr-4 text-sm gap-2"; 
  const textDisplayClasses = "my-4 overflow-hidden text-gray-600";

  return (
    <div className={wrapperClasses}>
      {/* Info Column */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{name}</h2>
        <div className="flex flex-wrap gap-2"> {/* Value items container */}
          <div className={textValuesItemClasses}>
            <Icon icon="fontSize" size={16} /> {/* Removed className */}
            <span>{fontSize}px</span>
          </div>
          <div className={textValuesItemClasses}>
            <Icon icon="lineHeight" size={16} /> {/* Removed className */}
            <span>{fontLineHeight}%</span>
          </div>
          {fontLetterSpacing !== 0 && (
            <div className={textValuesItemClasses}>
              <Icon icon="letterSpacing" size={16} /> {/* Removed className */}
              <span>{fontLetterSpacing}%</span>
            </div>
          )}
          <div className={textValuesItemClasses}>
            <Icon icon="textStyle" size={16} /> {/* Removed className */}
            <span>{fontWeight}</span>
          </div>
          {ligatures && (
            <div className={textValuesItemClasses}>
              <Icon icon="ligatures" size={16} /> {/* Removed className */}
              <span>Ligatures On</span>
            </div>
          )}
        </div>
      </div>

      {/* Text Example Column */}
      {/* @ts-ignore - Style prop expects CSSProperties, but we're passing custom ones too */}
      <Tag style={textStyle} className={textDisplayClasses}>
        {/* ... (example text) ... */}
        Far far away, behind the word mountains, far from the countries Vokalia
        and Consonantia, there live the blind texts. Separated they live in
        Bookmarksgrove right at the coast of the Semantics, a large language
        ocean. A small river named Duden flows by their place and supplies it
        with the necessary regelialia. It is a paradisematic country, in which
        roasted parts of sentences fly into your mouth. Even the all-powerful
        Pointing has no control about the blind texts it is an almost
        unorthographic life One day however a small line of blind text by the
        name
      </Tag>
    </div>
  );
};

// Main component to render all text styles
const TextStyles: React.FC<TextStylesContainerProps> = ({ node }) => {
  if (!node?.textStyles || node.textStyles.length === 0) {
    console.warn('TextStyles component missing or empty textStyles list');
    return null;
  }

  return (
    <div className="space-y-8"> {/* Adds margin between style blocks */}
      {node.textStyles.map((textStyle) => (
        <TextStyleDisplay {...textStyle} key={textStyle._key || textStyle.name} />
      ))}
    </div>
  );
};

export default TextStyles; // Ensure default export is present
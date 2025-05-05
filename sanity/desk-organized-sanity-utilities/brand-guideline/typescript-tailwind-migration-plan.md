# TypeScript and Tailwind CSS Migration Plan

## Overview

This document outlines a comprehensive plan for migrating the brand guideline application from JavaScript to TypeScript, and from SCSS modules to Tailwind CSS. This migration will improve code quality, provide better type safety, and streamline the styling approach.

## Project Structure

The current project consists of several React components organized in a component-based structure:

```
brand-guideline-stuff/components/
├── BlockContent/
├── ColorCombinations/
├── ColorPreview/
├── FileUpload/
├── Footer/
├── Icon/
├── Image/
├── ImageAndTextGrid/
├── ImageGrid/
├── Loading/
├── Nav/
├── SideNav/
├── TextStyles/
├── Video/
├── VideoGrid/
└── WCAGLabel/
```

Each component folder typically contains a JavaScript component file and a SCSS module file.

## Migration Process

### 1. Set Up TypeScript

#### 1.1 Install TypeScript Dependencies

```bash
npm install --save-dev typescript @types/react @types/react-dom @types/node
# or using yarn
yarn add --dev typescript @types/react @types/react-dom @types/node
```

#### 1.2 Create TypeScript Configuration

Create a `tsconfig.json` file in the root directory:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

#### 1.3 Install Additional Type Definitions





### 3. Component Migration Strategy

For each component, we'll follow these steps:

1. Rename the JS file to TSX
2. Add proper type definitions
3. Convert SCSS styles to Tailwind classes
4. Update imports and exports

#### 3.1 Defining Common Types

Create a `types.ts` file to define common types used across components:

```typescript
// src/types.ts

// Sanity.io related types
export interface SanityImage {
  asset: {
    _ref: string;
    url?: string;
    extension?: string;
  };
}

export interface SanityFile {
  asset: {
    url?: string;
    extension?: string;
  };
}

export interface SanityColor {
  name: string;
  hex: string;
}

export interface SanityColorCombination {
  color1: string;
  color2: string;
}

export interface SanityTextStyle {
  name: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  fontLetterSpacing: number;
  fontLineHeight: number;
  case?: string;
  ligatures?: boolean;
}

export interface SanityImageAndText {
  image: SanityImage;
  text: any[]; // Portable Text blocks
}

// Component prop types
export interface BlockContentProps {
  blocks: any[];
}

export interface ColorPreviewProps {
  node: {
    colors: SanityColor[];
  };
}

export interface ColorCombinationsProps {
  node: {
    colorCombinations: SanityColorCombination[];
  };
}

export interface FileUploadProps {
  node: {
    title: string;
    file: SanityFile;
  };
}

export interface FooterProps {
  updatedAt?: string;
}

export interface IconProps {
  icon: string;
  size?: number;
}

export interface ImageProps {
  node?: SanityImage;
  image?: SanityImage;
  width?: number;
}

export interface ImageAndTextGridProps {
  node: {
    list: SanityImageAndText[];
  };
}

export interface ImageGridProps {
  node: {
    images: SanityImage[];
  };
}

export interface NavProps {
  logo: string;
}

export interface SideNavProps {
  subPages: {
    title: string;
  }[];
}

export interface TextStylesProps {
  node: {
    textStyles: SanityTextStyle[];
  };
}

export interface VideoProps {
  url: string;
  node?: {
    _type: string;
    url: string;
  };
}

export interface VideoGridProps {
  node: {
    videos: {
      url: string;
    }[];
  };
}

export interface WCAGLabelProps {
  conrastRatio: number;
  largeText?: boolean;
}
```

### 4. Component-by-Component Migration Examples

#### 4.1 BlockContent Component Migration

**Original (BlockContent.js):**
```javascript
import React from "react";
import PortableText from "@sanity/block-content-to-react";
import ColorPreview from "../ColorPreview/ColorPreview";
import { pageWrapper } from "./BlockContent.module.scss";
import Image from "../Image/Image";
import TextStyles from "../TextStyles/TextStyles";
import ColorCombinations from "../ColorCombinations/ColorCombinations";
import ImageAndTextGrid from "../ImageAndTextGrid/ImageAndTextGrid";
import FileUpload from "../FileUpload/FileUpload";
import VideoGrid from "../VideoGrid/VideoGrid";
import ImageGrid from "../ImageGrid/ImageGrid";

const serializers = {
  types: {
    image: Image,
    colors: ColorPreview,
    textStyles: TextStyles,
    colorCombinations: ColorCombinations,
    imageAndTextGrid: ImageAndTextGrid,
    fileUpload: FileUpload,
    videos: VideoGrid,
    imageGrid: ImageGrid,
    undefined: () => null,
  },
  marks: {},
};

const BlockContent = ({ blocks }) => {
  if (!blocks) return null;
  return (
    <PortableText
      blocks={blocks}
      serializers={serializers}
      className={pageWrapper}
    />
  );
};

export default BlockContent;
```

**Migrated (BlockContent.tsx):**
```typescript
import React from "react";
import PortableText from "@sanity/block-content-to-react";
import ColorPreview from "../ColorPreview/ColorPreview";
import Image from "../Image/Image";
import TextStyles from "../TextStyles/TextStyles";
import ColorCombinations from "../ColorCombinations/ColorCombinations";
import ImageAndTextGrid from "../ImageAndTextGrid/ImageAndTextGrid";
import FileUpload from "../FileUpload/FileUpload";
import VideoGrid from "../VideoGrid/VideoGrid";
import ImageGrid from "../ImageGrid/ImageGrid";
import { BlockContentProps } from "../../types";

const serializers = {
  types: {
    image: Image,
    colors: ColorPreview,
    textStyles: TextStyles,
    colorCombinations: ColorCombinations,
    imageAndTextGrid: ImageAndTextGrid,
    fileUpload: FileUpload,
    videos: VideoGrid,
    imageGrid: ImageGrid,
    undefined: () => null,
  },
  marks: {},
};

const BlockContent: React.FC<BlockContentProps> = ({ blocks }) => {
  if (!blocks) return null;
  return (
    <PortableText
      blocks={blocks}
      serializers={serializers}
      className="prose max-w-none [&>*:not(div)]:max-w-[700px] [&>*:not(div)+*:not(div)]:mt-4"
    />
  );
};

export default BlockContent;
```

**Original SCSS (BlockContent.module.scss):**
```scss
.pageWrapper {
  > *:not(div) {
    max-width: 700px;
  }
  > *:not(div) + *:not(div) {
    margin-top: 1em;
  }
}
```

**Migrated to Tailwind classes:**
```
prose max-w-none [&>*:not(div)]:max-w-[700px] [&>*:not(div)+*:not(div)]:mt-4
```

#### 4.2 ColorPreview Component Migration

**Original colorUtils.js:**
```javascript
import Color from "color";

export const WcagContrast = (color1, color2) =>
  Color(color1).contrast(Color(color2)).toFixed(1);

export const cleanHex = (colorString) =>
  colorString.startsWith("#") ? colorString : "#" + colorString;

export const getColorValues = (color, colorType) => {
  color = Color(color)[colorType]().color;
  return color.map((value) => Math.round(value));
};

export const toRGB = (color) => {
  const [r, g, b] = getColorValues(color, "rgb");
  return `RGB: ${r} ${g} ${b}`;
};

export const toHSL = (color) => {
  const [h, s, l] = getColorValues(color, "hsl");
  return `HSL: ${h}° ${s}% ${l}%`;
};

export const toCMYK = (color) => {
  const [c, m, y, k] = getColorValues(color, "cmyk");
  return `CMYK: ${c} ${m} ${y} ${k}`;
};

export const whiteHasHighestContrast = (color) => {
  const whiteTextContrast = Color("#edeff0").contrast(Color(color));
  const blackTextContrast = Color("#212328").contrast(Color(color));
  return whiteTextContrast > blackTextContrast;
};
```

**Migrated (colorUtils.ts):**
```typescript
import Color from "color";

export const WcagContrast = (color1: string, color2: string): string =>
  Color(color1).contrast(Color(color2)).toFixed(1);

export const cleanHex = (colorString: string): string =>
  colorString.startsWith("#") ? colorString : "#" + colorString;

export const getColorValues = (color: string, colorType: "rgb" | "hsl" | "cmyk"): number[] => {
  const colorObj = Color(color)[colorType]();
  const colorArray = colorType === "rgb" ? colorObj.color : colorObj.color;
  return colorArray.map((value: number) => Math.round(value));
};

export const toRGB = (color: string): string => {
  const [r, g, b] = getColorValues(color, "rgb");
  return `RGB: ${r} ${g} ${b}`;
};

export const toHSL = (color: string): string => {
  const [h, s, l] = getColorValues(color, "hsl");
  return `HSL: ${h}° ${s}% ${l}%`;
};

export const toCMYK = (color: string): string => {
  const [c, m, y, k] = getColorValues(color, "cmyk");
  return `CMYK: ${c} ${m} ${y} ${k}`;
};

export const whiteHasHighestContrast = (color: string): boolean => {
  const whiteTextContrast = Color("#edeff0").contrast(Color(color));
  const blackTextContrast = Color("#212328").contrast(Color(color));
  return whiteTextContrast > blackTextContrast;
};
```

### 5. Utility Functions

#### 5.1 SCSS to Tailwind Conversion Helper

Create a helper function to facilitate the conversion of SCSS to Tailwind:

```typescript
// src/utils/tailwindMigration.ts

/**
 * Map common SCSS patterns to Tailwind CSS classes
 */
export const scssToTailwind = {
  // Layout
  'display: flex;': 'flex',
  'flex-direction: row;': 'flex-row',
  'flex-direction: column;': 'flex-col',
  'align-items: center;': 'items-center',
  'justify-content: center;': 'justify-center',
  'justify-content: space-between;': 'justify-between',
  
  // Spacing
  'margin: 0;': 'm-0',
  'padding: 0;': 'p-0',
  
  // Typography
  'font-size: 0.875rem;': 'text-sm',
  'font-size: 1rem;': 'text-base',
  
  // Colors
  'color: var(--color-gray-600);': 'text-gray-600',
  'background-color: var(--background-color);': 'bg-background',
  
  // Borders
  'border: var(--stroke);': 'border border-solid border-default',
  'border-top: var(--stroke);': 'border-t border-solid border-default',
  'border-bottom: var(--stroke);': 'border-b border-solid border-default',
  
  // And so on...
};
```

### 6. Step-by-Step Migration Guide

1. **Preparatory Phase**
   - Install TypeScript and configure the project
   - Install Tailwind CSS and configure
   - Create common type definitions
   - Back up the project

2. **Component Migration**
   - Start with simpler components (e.g., Loading, WCAGLabel)
   - Progress to more complex components
   - Update imports across the application
   - Test each component after migration

3. **Specific Migration Tasks for Each Component**

   a. **BlockContent**
   - Convert to TS with proper typing
   - Replace SCSS module with Tailwind classes
   - Update imports

   b. **ColorPreview and ColorCombinations**
   - Convert complex color utilities to TypeScript
   - Rebuild the component with proper types
   - Convert SCSS transitions and effects to Tailwind

   c. **FileUpload**
   - Add TypeScript interfaces for file props
   - Convert button styling to Tailwind

   d. **Icon System**
   - Convert icon library to TypeScript
   - Consider using an icon library like Heroicons

   e. **Image Components**
   - Add proper TypeScript interfaces for image sources
   - Convert image styling to Tailwind

   f. **Text Styles**
   - This is one of the most complex components - break it down into smaller typed components
   - Convert the extensive styling to Tailwind with custom utilities

### 7. Testing Strategy

1. **Component Testing**
   - Test each component after migration
   - Verify visual appearance matches the original
   - Check functionality

2. **Integration Testing**
   - Test components together to ensure they still work as expected
   - Verify data flow between components

3. **E2E Testing**
   - Test the complete user flow after migration

### 8. Handling Edge Cases and Challenges

#### 8.1 Complex SCSS Features

Some SCSS features don't have direct Tailwind equivalents:

- **Nested selectors**: Use arbitrary variants (`[&.selected]:bg-blue-500`)
- **Variables**: Use CSS variables in the root stylesheet and reference in Tailwind config
- **Complex animations**: May need custom CSS animations defined in the base layer

#### 8.2 Type Challenges

- **Sanity.io types**: May need to create custom type definitions
- **Third-party libraries**: Some may lack TypeScript definitions


### 10. Post-Migration Tasks

1. Update documentation
2. Remove unused SCSS files
3. Optimize bundle size
4. Consider further improvements

## Conclusion

Migrating from JavaScript to TypeScript and from SCSS Modules to Tailwind CSS will significantly improve the codebase's maintainability, type safety, and styling consistency. While the process requires careful planning and execution, the long-term benefits of improved developer experience and code quality make this effort worthwhile.

The migration can be done incrementally, component by component, allowing for continuous testing and validation. This approach minimizes risks and ensures that the application remains functional throughout the migration process. 
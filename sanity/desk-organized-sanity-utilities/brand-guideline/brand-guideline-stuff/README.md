# Brand Guideline Sanity Schema

This folder contains the TypeScript implementation of a Sanity.io schema for brand guidelines.

## Structure

- **types/**: TypeScript type definitions for Sanity schema
  - `schema.ts`: Base type definitions for Sanity schema structures
  - `brandGuideline.ts`: Specific type definitions for brand guideline document types

- **documents/**: Document schema types
  - `brandGuideline.ts`: Main brand guideline document type
  - `subPage.ts`: Sub page document type for sections within brand guidelines
  - `index.ts`: Exports all document schemas

- **objects/**: Object schema types
  - `color.ts`: Color object type
  - `colors.ts`: Collection of colors
  - `textStyle.ts`: Text style object type
  - `textStyles.ts`: Collection of text styles
  - `fileUpload.ts`: File upload object type
  - `simpleBlockContent.ts`: Simple rich text content type
  - `index.ts`: Exports all object schemas

- **queries/**: GROQ queries for fetching data
  - `brandGuideline.queries.ts`: Queries for brand guidelines and sub pages

- **structure/**: Sanity Studio desk structure configurations
  - `brandGuideline.structure.ts`: Desk structure for brand guidelines

- **translations/**: Translation strings for the schema
  - `brandGuideline.translations.ts`: Translations for schema fields and components

## Usage

Import the schema types in your Sanity studio's schema.js file:

```js
import brandGuidelineSchema from './desk-organized-sanity-utilities/brand-guideline/brand-guideline-stuff';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    ...brandGuidelineSchema,
    // ... other schemas
  ]),
});
```

## Data Structure

The brand guideline schema allows for structured content management of brand assets:

1. **Brand Guidelines**: Main document containing company information and references to sub pages
2. **Sub Pages**: Documents representing sections of a brand guideline
3. **Content Blocks**: Various reusable components like colors, typography, files, etc.

## Key Relationships

- `brandGuideline` has references to `subPage` documents
- Sub pages can contain various content blocks:
  - `colors`: Collection of color definitions
  - `textStyles`: Collection of typography definitions
  - `fileUpload`: Uploaded brand assets
  - `simpleBlockContent`: Rich text content

## Benefits of TypeScript

- Type safety for schema definitions
- Better IDE support with autocompletion
- Improved code maintainability
- Clear documentation through types 
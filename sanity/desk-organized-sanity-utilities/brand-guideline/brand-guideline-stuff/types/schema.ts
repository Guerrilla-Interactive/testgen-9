// Base type for all schema types
export interface SanitySchemaType {
  name: string;
  type: string;
  title?: string;
  description?: string;
  icon?: any;
}

// Document schema type
export interface SanityDocumentType extends SanitySchemaType {
  type: 'document';
  fields: SanityFieldDefinition[];
  preview?: SanityPreviewConfig;
  initialValue?: Record<string, any>;
  orderings?: SanityOrdering[];
}

// Object schema type
export interface SanityObjectType extends SanitySchemaType {
  type: 'object';
  fields: SanityFieldDefinition[];
  preview?: SanityPreviewConfig;
}

// Field definition
export interface SanityFieldDefinition {
  name: string;
  type: string;
  title?: string;
  description?: string;
  validation?: any;
  options?: any;
  of?: any[];
  to?: any[];
}

// Preview configuration
export interface SanityPreviewConfig {
  select?: Record<string, string>;
  prepare?: (selection: any) => { title?: string; subtitle?: string; media?: any };
}

// Ordering configuration
export interface SanityOrdering {
  title: string;
  name: string;
  by: {
    field: string;
    direction: 'asc' | 'desc';
  }[];
} 
import { SanityDocumentType, SanityFieldDefinition } from './schema';

export interface BrandGuidelineDocument extends SanityDocumentType {
  name: 'brandGuideline';
  fields: (SanityFieldDefinition & { 
    name: 'companyName' | 'logo' | 'subPage' | string; 
  })[];
}

export interface SubPageDocument extends SanityDocumentType {
  name: 'subPage';
  fields: (SanityFieldDefinition & { 
    name: 'title' | 'slug' | 'content' | string; 
  })[];
} 
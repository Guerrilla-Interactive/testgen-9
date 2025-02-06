import type { SchemaTypeDefinition } from "sanity";
// documents
import page from "./schemas/documents/page.document-schema";
import post from "./schemas/documents/post.document-schema";
import author from "./schemas/documents/author.document-schema";
import category from "./schemas/documents/category.document-schema";
import faq from "./schemas/documents/faq.document-schema";
import testimonial from "./schemas/documents/testimonial.document-schema";

// Schema UI shared objects


// Schema UI objects (imported from feature-based component folders)
import { allBlockSchemas } from "@/features/page-builder-blocks/block-indexer";
import allSharedBlockRelatedSchemas from "@/features/page-builder-blocks/shared/shared-schemas";
import buttonVariantSchema from "@/features/page-builder-blocks/shared/button/button-variant.schema";





export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // documents
    page,
    post,
    author,
    category,
    faq,
    testimonial,
    buttonVariantSchema,
    // shared block related schemas
    ...allSharedBlockRelatedSchemas,
    // block schemas
    ...allBlockSchemas,

  ],
};

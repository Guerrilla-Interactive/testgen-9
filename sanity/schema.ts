import type { SchemaTypeDefinition } from "sanity";
// documents
import page from "./schemas/documents/page";
import post from "./schemas/documents/post";
import author from "./schemas/documents/author";
import category from "./schemas/documents/category";
import faq from "./schemas/documents/faq";
import testimonial from "./schemas/documents/testimonial";

// Schema UI shared objects
import blockContent from "../features/page-builder-blocks/shared/shared-schemas/block-content";
import link from "../features/page-builder-blocks/shared/shared-schemas/link";
import  colorVariant  from "../features/page-builder-blocks/shared/shared-schemas/color-variant";
import buttonVariant from "@/features/page-builder-blocks/shared/button/button-variant.schema";
import sectionPadding from "../features/page-builder-blocks/shared/shared-schemas/section-padding";

// Schema UI objects (imported from feature-based component folders)
import { allBlockSchemas } from "@/features/page-builder-blocks/blocks-indexer";





export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // documents
    page,
    post,
    author,
    category,
    faq,
    testimonial,
    // shared objects
    blockContent,
    link,
    colorVariant,
    buttonVariant,
    sectionPadding,
    // blocks
    ...allBlockSchemas,

  ],
};

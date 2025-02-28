import type { SchemaTypeDefinition } from "sanity";

import allSharedBlockRelatedSchemas from "@/features/page-builder-blocks/shared/shared-schemas/all-shared-block-related-schemas";
import { allSettingsSchemas } from "@/sanity/desk-organized-sanity-utilities/settings/all-settings-document-schemas";
import { allRouteDocumentSchemas } from "../app/(main)/all-route-document-schemas";
import { allUnorganizedDocumentSchemas } from "./type-organized-schemas/all-unorganized-document-schemas";
import { allFieldSchemas } from "./type-organized-schemas/fields/all-field-schemas";
import { allBlockSchemas } from "@/features/page-builder-blocks/block-indexer";





export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
   
    ...allUnorganizedDocumentSchemas, // dependent on allSharedBlockRelatedSchemas
    ...allRouteDocumentSchemas,
    ...allSharedBlockRelatedSchemas,
    ...allFieldSchemas,
    ...allBlockSchemas,
    ...allSettingsSchemas,
  ],
};

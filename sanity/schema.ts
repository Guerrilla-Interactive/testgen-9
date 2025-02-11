import type { SchemaTypeDefinition } from "sanity";
import { allBlockSchemas } from "@/features/page-builder-blocks/block-indexer";
import allSharedBlockRelatedSchemas from "@/features/page-builder-blocks/shared/shared-schemas";
import buttonVariantSchema from "@/features/page-builder-blocks/shared/button/button-variant.schema";
import { allSettingsSchemas } from "@/features/desk-structure/settings/settings-schemas";
import { allRouteDocumentSchemas } from "./schemas/all-route-document-schemas";
import { allUnorganizedDocumentSchemas } from "./schemas/all-unorganized-document-schemas";
import { allFieldSchemas } from "./schemas/fields/all-field-schemas";


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    buttonVariantSchema,
    ...allUnorganizedDocumentSchemas,
    ...allRouteDocumentSchemas,
    ...allSharedBlockRelatedSchemas,
    ...allFieldSchemas,
    ...allBlockSchemas,
    ...allSettingsSchemas,
  ],
};

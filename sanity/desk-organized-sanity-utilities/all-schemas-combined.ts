import type { SchemaTypeDefinition } from "sanity";
import { allBlockSchemas } from "@/features/page-builder-blocks/block-indexer";
import allSharedBlockRelatedSchemas from "@/features/page-builder-blocks/shared/shared-schemas";
import buttonVariantSchema from "@/features/page-builder-blocks/shared/button/button-variant.schema";
import { allSettingsSchemas } from "@/sanity/desk-organized-sanity-utilities/settings/all-settings-document-schemas";
import { allRouteDocumentSchemas } from "../../app/(main)/all-route-document-schemas";
import { allUnorganizedDocumentSchemas } from "../type-organized-schemas/all-unorganized-document-schemas";
import { allFieldSchemas } from "../type-organized-schemas/fields/all-field-schemas";


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

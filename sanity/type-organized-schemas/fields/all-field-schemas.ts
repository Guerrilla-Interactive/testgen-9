import { externalLinkSchema } from "@/sanity/type-organized-schemas/fields/external-link.schema";
import { internalLinkSchema } from "@/sanity/type-organized-schemas/fields/internal-link.schema";


const fieldSchemas = {
  externalLinkSchema,
  internalLinkSchema
};

export const allFieldSchemas = Object.values(fieldSchemas);


import { externalLinkSchema } from "@/sanity/schemas/fields/external-link.schema";
import { internalLinkSchema } from "@/sanity/schemas/fields/internal-link.schema";


const fieldSchemas = {
  externalLinkSchema,
  internalLinkSchema,
};

export const allFieldSchemas = Object.values(fieldSchemas);


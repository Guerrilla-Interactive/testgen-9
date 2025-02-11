import { defineField } from "sanity";
import { ROUTE_DOCUMENT_SCHEMA_TYPES } from "../all-route-document-schemas";

export const internalLinkSchema = defineField({
  name: "internalLink",
  title: "Velg dokument",
  type: "reference",
  to: ROUTE_DOCUMENT_SCHEMA_TYPES.map((type) => {
    return { type };
  }),
  options: {
    disableNew: true,
  },
});

import type { StructureBuilder } from "sanity/structure";

export const serviceSlugDeskStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title("Tjenester")
    .schemaType("service-slug")
    .child(
      S.documentTypeList("service-slug")
        .title("Tjenester")
        .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
    );
};

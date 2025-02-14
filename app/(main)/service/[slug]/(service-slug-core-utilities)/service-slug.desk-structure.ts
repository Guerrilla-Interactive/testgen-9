import type { StructureBuilder } from "sanity/structure";

export const serviceSlugDeskStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title("Service")
    .schemaType("service-slug")
    .child(
      S.documentTypeList("service-slug")
        .title("Service")
        .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
    );
};

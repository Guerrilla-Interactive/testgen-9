import type { StructureBuilder } from "sanity/structure";

export const brandGuideDeskStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title("BrandGuide")
    .schemaType("brand-guide-slug")
    .child(
      S.documentTypeList("brand-guide-slug")
        .title("Brand guide")
        .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
    );
};

import type { StructureBuilder } from "sanity/structure";

export const courseSlugDeskStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title("Kurs")
    .schemaType("course-slug")
    .child(
      S.documentTypeList("course-slug")
        .title("Kurs")
        .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
    );
};

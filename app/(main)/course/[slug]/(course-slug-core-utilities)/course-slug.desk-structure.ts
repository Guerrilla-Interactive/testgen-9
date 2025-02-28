import type { StructureBuilder } from "sanity/structure";

export const courseSlugDeskStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title("Course")
    .schemaType("course-slug")
    .child(
      S.documentTypeList("course-slug")
        .title("Course")
        .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
    );
};

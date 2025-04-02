import type { StructureBuilder } from "sanity/structure";
import { courseSlugVariables } from "./course-slug.translations-and-variables";
export const courseSlugDeskStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title("Kurs")
    .schemaType(courseSlugVariables("DOCUMENT_TYPE"))
    .child(
      S.documentTypeList(courseSlugVariables("DOCUMENT_TYPE"))
        .title("Kurs")
        .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
    );
};

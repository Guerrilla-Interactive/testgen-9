import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { BookA, Scroll } from "lucide-react";
import type { StructureBuilder } from "sanity/structure";

// Structure for brand guidelines
export const brandGuidelineDeskStructure = (S: StructureBuilder, context: any) => {
  return orderableDocumentListDeskItem({
    type: "brandGuideline",
    title: "Brand Guidelines",
    icon: BookA,
    S,
    context,
  });
};

// Structure for subpages
export const subPageDeskStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title('Sub Pages')
    .icon(Scroll)
    .child(
      S.documentTypeList('subPage')
        .title('Sub Pages')
        .filter('_type == "subPage"')
    );
};

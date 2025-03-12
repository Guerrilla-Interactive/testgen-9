import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { Tag } from "lucide-react";
import type { StructureBuilder } from "sanity/structure";

// Defines the structure for FAQ Categories
export const faqCategoryDeskStructure = (S: StructureBuilder, context: any) => {
  return orderableDocumentListDeskItem({
    type: "faqCategory",
    title: "FAQ Categories",
    icon: Tag,
    S,
    context,
  });
};

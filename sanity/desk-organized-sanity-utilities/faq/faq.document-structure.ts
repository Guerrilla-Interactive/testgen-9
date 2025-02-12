import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { ListCollapse } from "lucide-react";
import type { StructureBuilder } from "sanity/structure";

// Defines the structure for FAQs
export const faqDeskStructure = (S: StructureBuilder, context: any) => {
  return orderableDocumentListDeskItem({
    type: "faq",
    title: "FAQs",
    icon: ListCollapse,
    S,
    context,
  });
}; 
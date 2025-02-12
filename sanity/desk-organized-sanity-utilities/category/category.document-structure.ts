import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { BookA } from "lucide-react";
import type { StructureBuilder } from "sanity/structure";

export const categoryDeskStructure = (S: StructureBuilder, context: any) => {
  return  orderableDocumentListDeskItem({
    type: "category",
    title: "Categories",
    icon: BookA,
    S,
    context,
  });
};

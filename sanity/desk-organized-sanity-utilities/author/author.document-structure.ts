import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { User } from "lucide-react";
import type { StructureBuilder } from "sanity/structure";

// Defines the structure for Authors
export const authorDeskStructure = (S: StructureBuilder, context: any) => {
  return orderableDocumentListDeskItem({
    type: "author",
    title: "Authors",
    icon: User,
    S,
    context,
  });
}; 
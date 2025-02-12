import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { Quote } from "lucide-react";
import type { StructureBuilder } from "sanity/structure";

// Defines the structure for Testimonials
export const testimonialDeskStructure = (S: StructureBuilder, context: unknown) => {
  return orderableDocumentListDeskItem({
    type: "testimonial",
    title: "Testimonials",
    icon: Quote,
    S,
    context,
  });
}; 
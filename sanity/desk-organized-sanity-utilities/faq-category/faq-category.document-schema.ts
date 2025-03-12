import { defineField, defineType } from "sanity";
import { Tag } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "faqCategory",
  title: "FAQ Category",
  type: "document",
  icon: Tag,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      type: "block-content",
      title: "Body",
    }),
    orderRankField({ type: "faqCategory" }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});

import { defineField, defineType } from "sanity";
import { Info } from "lucide-react";
import { extractPlainText } from "@/features/unorganized-utils/utils";

export default defineType({
  name: "split-info-list-block",
  type: "object",
  icon: Info,
  title: "Split Info List",
  description:
    "Column with list of cards. Each card has a title, content body, image and tags",
  fields: [
    defineField({
      name: "list",
      type: "array",
      of: [{ type: "split-info-item-block" }],
    }),
  ],
  preview: {
    select: {
      title: "list.0.title",
      subtitle: "list.0.body",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "No Title",
        subtitle: extractPlainText(subtitle) || "No Subtitle",
      };
    },
  },
}); 
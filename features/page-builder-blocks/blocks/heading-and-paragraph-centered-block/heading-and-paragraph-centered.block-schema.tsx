import { defineField, defineType } from "sanity";
import { LayoutList } from "lucide-react";

export default defineType({
  name: "heading-and-paragraph-centered-block",
  type: "object",
  title: "HeadingAndParagraphCentered",
  description: "A list of heading-and-paragraph-centered",
  icon: LayoutList,
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
    }),
    defineField({
      name: "paragraph",
      type: "text",
      title: "Paragraph",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "HeadingAndParagraphCentered",
      };
    },
  },
});

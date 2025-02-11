import { defineField, defineType } from "sanity";
import { LayoutTemplate } from "lucide-react";

export default defineType({
  name: "hero-3-block",
  type: "object",
  title: "Hero3",
  description: "A list of hero-3",
  icon: LayoutTemplate,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      title: "Color Variant",
      description: "Select a background color variant",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Enter a title for the hero-3 block",
    }),
    
  ],
  preview: {
    prepare() {
      return {
        title: "Hero3",
      };
    },
  },
});

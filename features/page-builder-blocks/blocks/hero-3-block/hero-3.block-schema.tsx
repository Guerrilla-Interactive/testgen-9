import { defineField, defineType } from "sanity";
import { LayoutTemplate } from "lucide-react";

export default defineType({
  name: "hero-3-block",
  type: "object",
  title: "Hero3",
  description:
    "A hero block with full viewport background image, a dark overlay, and text positioned at the bottom.",
  icon: LayoutTemplate,
  fields: [
    defineField({
      name: "backgroundImage",
      type: "image",
      title: "Background Image",
      description: "Full viewport background image for the hero block",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "titleOrange",
      type: "string",
      title: "Title Highlight",
      description:
        "A single word displayed in orange on the first line at the bottom left.",
    }),
    defineField({
      name: "titleWhite",
      type: "string",
      title: "Title",
      description:
        "Text displayed in white on the next line below the highlighted word.",
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Subtitle",
      description: "Text displayed on the bottom right of the hero block.",
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

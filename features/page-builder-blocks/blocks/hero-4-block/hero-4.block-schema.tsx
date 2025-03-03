import { defineField, defineType } from "sanity";
import { Layout } from "lucide-react";

export default defineType({
  name: "hero-4-block",
  type: "object",
  title: "Page Header Hero",
  description: "A smaller hero block that works as a page header with title and description.",
  icon: Layout,
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      description: "Main title for the header",
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "text",
      description: "A short description or subheading",
    }),
    defineField({
      name: "backgroundImage",
      type: "image",
      title: "Background Image",
      description: "Optional background image for the header",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "showOverlay",
      type: "boolean",
      title: "Show Overlay",
      description: "Toggle the overlay on and off",
    }),
    defineField({
      name: "topOverlayStrength",
      type: "number",
      title: "Top Overlay Strength",
      description: "Opacity at the top (0–1)",
      initialValue: 0.2,
      validation: (Rule) => Rule.min(0).max(1),
      hidden: ({ parent }) => !parent?.showOverlay,
    }),
    defineField({
      name: "upperCenterOverlayStrength",
      type: "number",
      title: "Upper Center Overlay Strength",
      description: "Opacity at the upper center (0–1)",
      initialValue: 0.0,
      validation: (Rule) => Rule.min(0).max(1),
      hidden: ({ parent }) => !parent?.showOverlay,
    }),
    defineField({
      name: "lowerCenterOverlayStrength",
      type: "number",
      title: "Lower Center Overlay Strength",
      description: "Opacity at the lower center (0–1)",
      initialValue: 0.2,
      validation: (Rule) => Rule.min(0).max(1),
      hidden: ({ parent }) => !parent?.showOverlay,
    }),
    defineField({
      name: "bottomOverlayStrength",
      type: "number",
      title: "Bottom Overlay Strength",
      description: "Opacity at the bottom (0–1)",
      initialValue: 0.3,
      validation: (Rule) => Rule.min(0).max(1),
      hidden: ({ parent }) => !parent?.showOverlay,
    }),
    
  ],
  preview: {
    select: {
      title: 'title',
      backgroundImage: 'backgroundImage',
    },
    prepare({ title, backgroundImage }) {
      return {
        title: "Page Header Hero",
        subtitle: title || "No title set",
        media: backgroundImage ? backgroundImage : Layout,
      };
    },
  },
});

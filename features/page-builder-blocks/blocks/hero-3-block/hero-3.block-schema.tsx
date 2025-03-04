import { defineField, defineType } from "sanity";
import { LayoutTemplate, Monitor } from "lucide-react";

export default defineType({
  name: "hero-3-block",
  type: "object",
  title: "Fullscreen Hero",
  description:
    "A hero block with full viewport background image, a dark overlay, and text positioned at the bottom.",
  icon: Monitor,
  fields: [

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
      titleOrange: 'titleOrange',
      titleWhite: 'titleWhite',
      backgroundImage: 'backgroundImage',
    },
    prepare({ titleOrange, titleWhite, backgroundImage }) {
      const hasTitle = titleOrange || titleWhite;
      return {
        title: "Fullscreen Hero",
        subtitle: hasTitle ? `${titleOrange || ''} ${titleWhite || ''}`.trim() : "No title set",
        media: backgroundImage ? backgroundImage : Monitor,
      };
    },
  },
});

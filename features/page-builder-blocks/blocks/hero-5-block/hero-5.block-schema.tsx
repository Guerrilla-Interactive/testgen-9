import { defineField, defineType } from "sanity";
import { Image } from "lucide-react";

export default defineType({
  name: "hero-5-block",
  type: "object",
  title: "Full-Width Image Hero",
  description: "Hero with full-width image and title below",
  icon: Image,
  fields: [

    defineField({
      name: "image",
      type: "image",
      title: "Hero Image",
      description: "Full-width image with 16:9 aspect ratio",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      image: 'image',
    },
    prepare({ image }) {
      return {
        title: "Full-Width Image Hero",
        subtitle: image ? "Has background image" : "No image selected",
        media: image ? image : Image,
      };
    },
  },
});

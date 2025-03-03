import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "hero-5-block",
  type: "object",
  title: "Hero5",
  description: "Hero with full-width image and title below",
  icon: Newspaper,
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
    prepare() {
      return {
        title: "Hero5",
      };
    },
  },
});

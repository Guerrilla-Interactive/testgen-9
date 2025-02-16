import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "service-grid-block",
  type: "object",
  title: "ServiceGrid",
  description: "A list of service-grid",
  icon: Newspaper,
  fields: [
    {
      name: "services",
      type: "array",
      title: "Services",
      of: [
        { type: "reference", to: [{ type: "service-slug" }] },
        {
          type: "object",
          name: "manualService",
          title: "Manual Service",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Title",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "link",
              type: "url",
              title: "Link",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "featuredImage",
              type: "image",
              title: "Featured Image",
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "ServiceGrid",
      };
    },
  },
});

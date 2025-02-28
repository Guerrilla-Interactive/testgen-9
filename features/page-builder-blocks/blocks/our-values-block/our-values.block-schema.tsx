import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "our-values-block",
  type: "object",
  title: "Our Values Block",
  description: "A list of our values",
  icon: Newspaper,
  fields: [
    defineField({
      name: "values",
      type: "array",
      title: "Values",
      of: [
        defineType({
          name: "value",
          type: "object",
          title: "Value",
          fields: [
            defineField({
              name: "icon",
              type: "icon",
              title: "Icon",
              options: {
                collections: ["fa-brands", "mdi", "f7", "sa", "hi", "fi", "si"],
                showName: true,
              },
            }),
            defineField({
              name: "title",
              type: "string",
              title: "Title",
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Description",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare({ value }) {
      const count = value?.values?.length ?? 0;
      return {
        title: "Our Values Block",
        subtitle: `${count} value${count !== 1 ? "s" : ""}`,
      };
    },
  },
});

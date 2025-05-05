import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";

export default defineType({
  name: "brand-guide-slug",
  title: "Brand guide",
  type: "document",
  icon: FileText,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    // reference to brand guideline
    defineField({
      name: "brandGuideline",
      title: "Brand guideline",
      type: "reference",
      to: [{ type: "brandGuideline" }],
    }),
  ],
});

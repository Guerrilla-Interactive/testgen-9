import { defineField, defineType, defineArrayMember } from "sanity";
import { SubPageDocument } from "../types/brandGuideline";
import { Scroll } from "lucide-react";

const subPage = defineType({
  name: 'subPage',
  title: 'Brand Guideline Sub Page',
  type: 'document',
  icon: Scroll,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required().error('A title is required'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('A slug is required'),
    }),
    {
      name: "components",
      type: "componentBlockContent",
      title: "Components",
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled Sub Page',
        subtitle: slug ? `/${slug}` : 'No slug',
        media: Scroll,
      };
    },
  },
});

export default subPage; 
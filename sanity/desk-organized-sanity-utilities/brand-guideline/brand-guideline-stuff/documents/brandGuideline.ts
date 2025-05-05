import { defineField, defineType, defineArrayMember } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import { BookA } from "lucide-react";
import { BrandGuidelineDocument } from "../types/brandGuideline";

const brandGuideline = defineType({
  name: 'brandGuideline',
  title: 'Brand Guideline',
  type: 'document',
  icon: BookA,
  fields: [
    defineField({
      name: 'companyName',
      type: 'string',
      title: 'Company name',
      validation: (Rule) => Rule.required().error('Company name is required'),
    }),
    // slug
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      validation: (Rule) => Rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      description: '.svg er best',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'subPage',
      type: 'array',
      title: 'Sub Pages',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'subPage' }] })],
      initialValue: [],
    }),
    orderRankField({ type: "brandGuideline" }),
  ],
  preview: {
    select: {
      title: 'companyName',
      media: 'logo',

    },
    prepare({ title, media }) {
      return {
        title: title || 'Unnamed Brand Guideline',
        media: media || BookA,
      };
    },
  },
});

export default brandGuideline; 
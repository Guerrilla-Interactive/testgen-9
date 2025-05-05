import { defineField, defineType } from "sanity";
import { SanityObjectType } from '../types/schema';
import { ImagePlus } from "lucide-react";

const imageAndText = defineType({
  name: 'imageAndText',
  title: 'Image + Text',
  type: 'object',
  icon: ImagePlus,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('An image is required'),
    }),
    defineField({
      name: 'text',
      type: 'simpleBlockContent',
      title: 'Text',
      
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Image + Text',
        subtitle: 'Combined image and text content',
        media: media || ImagePlus,
      };
    },
  },
});

export default imageAndText; 
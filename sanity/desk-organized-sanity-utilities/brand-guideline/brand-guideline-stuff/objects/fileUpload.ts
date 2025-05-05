import { defineField, defineType } from "sanity";
import { SanityObjectType } from '../types/schema';
import { FileDigit } from "lucide-react";

const fileUpload = defineType({
  name: 'fileUpload',
  title: 'File Upload',
  type: 'object',
  icon: FileDigit,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'file',
      type: 'file',
      title: 'File',
      options: {
        accept: '.pdf,.zip,.svg,.eps,.ai,.psd',
      },
      validation: (Rule) => Rule.required().error('A file is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'file',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Unnamed File',
        subtitle: subtitle,
        media: media || FileDigit,
      };
    },
  },
});

export default fileUpload; 
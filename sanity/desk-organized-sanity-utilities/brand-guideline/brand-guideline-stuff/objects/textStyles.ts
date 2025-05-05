import { defineField, defineType, defineArrayMember } from "sanity";
import { SanityObjectType } from '../types/schema';
import { Type } from "lucide-react";

const textStyles = defineType({
  name: 'textStyles',
  title: 'Typography',
  type: 'object',
  icon: Type,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      initialValue: 'Typography',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      initialValue: 'Brand typography styles',
    }),
    defineField({
      name: 'styleList',
      type: 'array',
      title: 'Text Styles',
      of: [defineArrayMember({ type: 'textStyle' })],
      validation: (Rule) => Rule.required().min(1).error('At least one text style is required'),
      initialValue: [{
        _type: 'textStyle',
        name: 'Heading 1',
        fontFamily: 'Arial',
        fontSize: '24px',
        fontWeight: 'bold',
        lineHeight: '1.2',
        example: 'This is a heading example'
      }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Typography',
        media: Type,
      };
    },
  },
});

export default textStyles; 
import { defineField, defineType } from "sanity";
import { SanityObjectType } from '../types/schema';
import { Type } from "lucide-react";

const textStyle = defineType({
  name: 'textStyle',
  title: 'Text Style',
  type: 'object',
  icon: Type,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'E.g., "Heading 1", "Body Text", etc.',
    }),
    defineField({
      name: 'fontFamily',
      type: 'string',
      title: 'Font Family',
    }),
    defineField({
      name: 'fontSize',
      type: 'string',
      title: 'Font Size',
      description: 'E.g., "16px", "1.5rem", "2em", etc.',
    }),
    defineField({
      name: 'fontWeight',
      type: 'string',
      title: 'Font Weight',
      description: 'E.g., "400", "bold", etc.',
    }),
    defineField({
      name: 'lineHeight',
      type: 'string',
      title: 'Line Height',
      description: 'E.g., "1.5", "24px", etc.',
    }),
    defineField({
      name: 'example',
      type: 'text',
      title: 'Example Text',
      description: 'Example text to show this style',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'fontFamily',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Unnamed Text Style',
        subtitle: subtitle ? `Font: ${subtitle}` : '',
        media: Type,
      };
    },
  },
});

export default textStyle; 
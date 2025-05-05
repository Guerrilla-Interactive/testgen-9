import { defineField, defineType } from "sanity";
import { SanityObjectType } from '../types/schema';

const color = defineType({
  name: 'color',
  title: 'Color',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Navn',
    }),
    defineField({
      name: 'hex',
      type: 'string',
      title: 'HEX',

    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'hex',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Unnamed color',
        subtitle: subtitle,
        // Media will be handled by a custom component in the Sanity Studio
      };
    },
  },
});

export default color; 
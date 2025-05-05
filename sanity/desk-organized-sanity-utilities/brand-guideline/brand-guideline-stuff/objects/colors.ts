import { defineField, defineType, defineArrayMember } from "sanity";
import { SanityObjectType } from '../types/schema';
import { Palette } from "lucide-react";

const colors = defineType({
  name: 'colors',
  title: 'Colors',
  type: 'object',
  icon: Palette,
  fields: [
    defineField({
      name: "colors",
      type: "array",
      title: "Colors",
      of: [defineArrayMember({ type: "color" })],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      colors: 'colors',
    },
    prepare({ title, colors = [] }) {
      // Create a helpful subtitle that shows color count
      const subtitle = colors?.length 
        ? `${colors.length} color${colors.length === 1 ? '' : 's'}`
        : 'No colors added';
      
      return {
        title: title || 'Colors',
        subtitle,
        media: Palette,
      };
    },
  },
});

export default colors; 
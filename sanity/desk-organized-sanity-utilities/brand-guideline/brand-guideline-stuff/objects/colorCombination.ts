import { defineField, defineType } from "sanity";
import { SanityObjectType } from '../types/schema';
import { Brush } from "lucide-react";

const colorCombination = defineType({
  name: 'colorCombination',
  title: 'Color Combination',
  type: 'object',
  icon: Brush,
  fields: [
    defineField({
      name: 'color1',
      type: 'string',
      title: 'Color 1 Hex',
      description: 'Foreground',

    }),
    defineField({
      name: 'color2',
      type: 'string',
      title: 'Color 2 Hex',
      description: 'Background',
    }),
  ],
  preview: {
    select: {
      color1: 'color1',
      color2: 'color2',
    },
    prepare({ color1, color2 }) {
      return {
        title: 'Color Combination',
        subtitle: `${color1 || '#000000'} / ${color2 || '#FFFFFF'}`,
        // Media will be handled by a custom component in the Sanity Studio
      };
    },
  },
});

export default colorCombination; 
import { defineField, defineType, defineArrayMember } from "sanity";
import { SanityObjectType } from '../types/schema';
import { PaintBucket } from "lucide-react";

const colorCombinations = defineType({
  name: 'colorCombinations',
  title: 'Color Combinations',
  type: 'object',
  icon: PaintBucket,
  fields: [
    {
      name: "colorCombinations",
      type: "array",
      title: "Color combinations",
      of: [{ type: "colorCombination" }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Color Combinations',
        media: PaintBucket,
      };
    },
  },
});

export default colorCombinations; 
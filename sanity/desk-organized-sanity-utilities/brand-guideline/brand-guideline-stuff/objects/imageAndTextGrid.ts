import { defineField, defineType, defineArrayMember } from "sanity";
import { SanityObjectType } from '../types/schema';
import { LayoutGrid } from "lucide-react";

const imageAndTextGrid = defineType({
  name: 'imageAndTextGrid',
  title: 'Image + Text Grid',
  type: 'object',
  icon: LayoutGrid,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      initialValue: 'Content Grid',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'list',
      type: 'array',
      title: 'Content Items',
      of: [defineArrayMember({ type: 'imageAndText' })],
      validation: (Rule) => Rule.required().min(1).error('At least one image + text item is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'list',
    },
    prepare({ title, items }) {
      return {
        title: title || 'Image + Text Grid',
        subtitle: items ? `${items.length} item${items.length === 1 ? '' : 's'}` : '0 items',
        media: LayoutGrid,
      };
    },
  },
});

export default imageAndTextGrid; 
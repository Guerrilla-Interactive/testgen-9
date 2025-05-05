import { defineField, defineType, defineArrayMember } from "sanity";
import { SanityObjectType } from '../types/schema';
import { ImageIcon } from "lucide-react";

const imageGrid = defineType({
  name: 'imageGrid',
  title: 'Image Grid',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      initialValue: 'Image Gallery',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        })
      ],
      validation: (Rule) => Rule.required().min(1).error('At least one image is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Image Grid',
        subtitle: 'Collection of images',
        media: media || ImageIcon,
      };
    },
  },
});

export default imageGrid; 
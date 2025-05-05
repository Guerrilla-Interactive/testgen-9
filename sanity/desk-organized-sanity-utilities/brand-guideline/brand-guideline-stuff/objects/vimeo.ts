import { defineField, defineType } from "sanity";
import { SanityObjectType } from '../types/schema';
import { Video } from "lucide-react";

const vimeo = defineType({
  name: 'vimeo',
  title: 'Vimeo Embed',
  type: 'object',
  icon: Video,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Vimeo Video URL',
      validation: (Rule) => 
        Rule.required()
            .error('A Vimeo URL is required')
            .uri({
              scheme: ['http', 'https']
            })
            .custom((url) => {
              if (!url || !url.includes('vimeo.com')) {
                return 'URL must be a valid Vimeo link';
              }
              return true;
            }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare({ title, url }) {
      return {
        title: title || 'Vimeo Video',
        subtitle: url,
        media: Video,
      };
    },
  },
});

export default vimeo; 
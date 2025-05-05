import { defineField, defineType, defineArrayMember } from "sanity";
import { SanityObjectType } from '../types/schema';
import { Film } from "lucide-react";

const videos = defineType({
  name: 'videos',
  title: 'Videos',
  type: 'object',
  icon: Film,
  fields: [
    {
      name: "videos",
      type: "array",
      title: "Videos",
      of: [{ type: "vimeo" }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      videos: 'videos',
    },
    prepare({ title, videos }) {
      return {
        title: title || 'Videos',
        subtitle: videos ? `${videos.length} video${videos.length === 1 ? '' : 's'}` : '0 videos',
        media: Film,
      };
    },
  },
});

export default videos; 
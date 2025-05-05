import { defineType, defineArrayMember } from "sanity";
import { SanityObjectType } from '../types/schema';
import { Layout } from "lucide-react";

const componentBlockContent = defineType({
  name: 'componentBlockContent',
  title: 'Content',
  type: 'array',
  icon: Layout,
  of: [
    {
        type: "block",
      },
      {
        type: "colors",
      },
      {
        type: "image",
      },
      {
        type: "imageGrid",
      },
      {
        type: "textStyles",
      },
      {
        type: "colorCombinations",
      },
      {
        type: "imageAndTextGrid",
      },
      {
        type: "fileUpload",
      },
      {
        type: "videos",
      }
    


  ],
});

export default componentBlockContent; 
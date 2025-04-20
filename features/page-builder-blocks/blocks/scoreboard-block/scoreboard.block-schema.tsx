import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "scoreboard-block",
  type: "object",
  title: "Scoreboard",
  description: "A list of scoreboard",
  icon: Newspaper,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "defaultSort",
      title: "Default Sort Order",
      type: "string",
      options: {
        list: [
          { title: "Latest First", value: "latest" },
          { title: "Highest Score", value: "highest" },
          { title: "Lowest Score", value: "lowest" },
          { title: "Alphabetical (A-Z)", value: "alphabetical" },
        ],
        layout: "radio",
      },
      initialValue: "latest",
      description: "Choose how participants are sorted by default",
    }),
    defineField({
      name: "useEnhancedMode",
      title: "Use Enhanced Real-Time Mode",
      type: "boolean",
      description: "Enable optimized real-time updates with adaptive network handling and optimistic UI updates",
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Scoreboard",
      };
    },
  },
});

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
  ],
  preview: {
    prepare() {
      return {
        title: "Scoreboard",
      };
    },
  },
});

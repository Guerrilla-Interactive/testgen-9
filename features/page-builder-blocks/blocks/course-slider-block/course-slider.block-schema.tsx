import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "course-slider-block",
  type: "object",
  title: "CourseSlider",
  description: "A list of course-slider",
  icon: Newspaper,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "courses",
      type: "array",
      title: "Courses",
      of: [{ type: "reference", to: [{ type: "course-slug" }] }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "CourseSlider",
      };
    },
  },
});

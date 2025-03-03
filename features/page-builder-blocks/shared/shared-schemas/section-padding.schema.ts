import { defineField, defineType } from "sanity";

export default defineType({
  name: "section-padding",
  type: "object",
  title: "Padding",
  description: "Add padding to the section based on design system spacing",
  fields: [
    defineField({
      name: "top",
      type: "number",
      title: "Top Padding",
      description: "Adjust the padding at the top of the section (0 = none, 10 = maximum)",
      validation: (Rule) => Rule.min(0).max(10),
      initialValue: 4,
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "0", value: 0 },
          { title: "1", value: 1 }, 
          { title: "2", value: 2 },
          { title: "3", value: 3 },
          { title: "4", value: 4 },
          { title: "5", value: 5 },
          { title: "6", value: 6 },
          { title: "7", value: 7 },
          { title: "8", value: 8 },
          { title: "9", value: 9 },
          { title: "10", value: 10 },
        ]
        
      }
    }),
    defineField({
      name: "bottom",
      type: "number",
      title: "Bottom Padding",
      description: "Adjust the padding at the bottom of the section (0 = none, 10 = maximum)",
      validation: (Rule) => Rule.min(0).max(10),
      initialValue: 4,
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "0", value: 0 },
          { title: "1", value: 1 },
          { title: "2", value: 2 },
          { title: "3", value: 3 },
          { title: "4", value: 4 },
          { title: "5", value: 5 },
          { title: "6", value: 6 },
          { title: "7", value: 7 },
          { title: "8", value: 8 },
          { title: "9", value: 9 },
          { title: "10", value: 10 },
        ]
        
      }
    })
  ],
});

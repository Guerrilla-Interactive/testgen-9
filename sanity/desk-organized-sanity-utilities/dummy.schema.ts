import { defineType } from "sanity";

// dummy schema to test sanity studio
export default defineType({
  name: "dummy",
  title: "Dummy",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
  ],
});


import { defineField } from "sanity";

export const externalLinkSchema = defineField({
  name: "externalLink",
  title: "URL",
  type: "url",
  options: {
    // tip property removed
  },
  validation: (Rule) =>
    Rule.uri({
      scheme: ["https", "http", "mailto", "tel"],
    }).error('Ugyldig URL. URLen må start med "https://", "http://", "mailto:" eller "tel:".'),
});

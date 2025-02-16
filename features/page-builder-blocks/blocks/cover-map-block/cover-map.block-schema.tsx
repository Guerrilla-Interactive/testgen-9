import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "cover-map-block",
  type: "object",
  title: "CoverMap",
  description: "A cover section with Mapbox integration",
  icon: Newspaper,
  fields: [
    defineField({
      name: "center",
      title: "Map Center",
      type: "geopoint",
      description: "Center of the map",
    }),
    defineField({
      name: "zoom",
      title: "Zoom Level",
      type: "number",
      description: "Initial zoom level of the map",
      initialValue: 9,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "CoverMap",
      };
    },
  },
});

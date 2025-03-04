import { defineField, defineType } from "sanity";
import { Map } from "lucide-react";

export default defineType({
  name: "cover-map-block",
  type: "object",
  title: "Map Cover",
  description: "A cover section with Mapbox integration",
  icon: Map,
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
    select: {
      center: 'center',
      zoom: 'zoom',
    },
    prepare({ center, zoom }) {
      return {
        title: "Map Cover",
        subtitle: center ? `Zoom level: ${zoom || 9}` : "No location selected",
        media: Map,
      };
    },
  },
});

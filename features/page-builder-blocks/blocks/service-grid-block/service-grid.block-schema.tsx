import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "service-grid-block",
  type: "object",
  title: "ServiceGrid",
  description: "A list of service-grid",
  icon: Newspaper,
  fields: [
    {
      name: "services",
      type: "string"
      
    }
  ],
  preview: {
    prepare() {
      return {
        title: "ServiceGrid",
      };
    },
  },
});

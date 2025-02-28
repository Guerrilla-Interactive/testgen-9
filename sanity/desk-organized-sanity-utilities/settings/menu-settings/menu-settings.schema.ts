

import { Menu } from "lucide-react";
import { defineField, defineType } from "sanity";

export const menuSettingsSchema = defineType({
  type: "document",
  name: "menuSettings",
  title: "Menyer",
  icon: Menu,
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Menyer",
      };
    },
  },
});

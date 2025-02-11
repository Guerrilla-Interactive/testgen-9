
import { linksField } from "@/sanity/schemas/generator-fields/links.field";
import { Menu } from "lucide-react";
import { defineType } from "sanity";

export const menuSettingsSchema = defineType({
  type: "document",
  name: "menuSettings",
  title: "Menyer",
  icon: Menu,
  fields: [
    linksField({
      name: "mainMenu",
      title: "Hovedmeny",
      includeExternal: true,
      includeLinkGroup: true,
      includeDescriptionInLinkGroup: true,
    }),
    linksField({
      name: "button",
      title: "Knapp",
      max: 1,
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

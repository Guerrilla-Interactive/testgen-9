

import { Globe } from "lucide-react";
import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  type: "document",
  title: "Globale innstillinger",
  name: "siteSettings",
  icon: Globe,
  
  
  fields: [
    defineField ({
      name: "frontPage",
      title: "Forside",
      type: "reference",
      to: [{ type: "page-slug" }],
      validation: (Rule) => Rule.required(),
    }),


    defineField({
      name: "privacyPolicyPage",
      type: "reference",
      title: "Side for personvernerklæring",
      to: [{ type: "page-slug" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Globale innstillinger",
      };
    },
  },
});

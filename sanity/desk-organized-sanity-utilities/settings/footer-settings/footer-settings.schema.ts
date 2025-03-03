// footer settings schema
// Pagebuilder blocks.
// CTA text. 
// Info text.
// Contact info.

import { getSanityPageBuilderBlocks } from "@/features/page-builder-blocks/block-indexer";
import { defineField, defineType } from "sanity";
import { PanelBottom } from "lucide-react";
// Social media links.


export const footerSettingsSchema = defineType({
  name: "footerSettings",
  title: "Footer Settings",
  type: "document",
  icon: PanelBottom,
  fields: [
    defineField({
        name: "blocks",
        type: "array",
        of: getSanityPageBuilderBlocks(),
      }),
      
    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "text",
    }),
    defineField({
      name: "infoText",
      title: "Info Text",
      type: "text",
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Info",
      type: "text",
    }),
    defineField({
      name: "socialMediaLinks",
      title: "Social Media Links",
      type: "array",
      of: [{ type: "object", fields: [{ type: "string", name: "platform" }, { type: "string", name: "url" }] }],
    }),


  ],
});



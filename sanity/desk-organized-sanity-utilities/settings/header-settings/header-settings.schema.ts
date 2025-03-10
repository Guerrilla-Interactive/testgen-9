// footer settings schema
// Pagebuilder blocks.
// CTA text. 
// Info text.
// Contact info.

import { getSanityPageBuilderBlocks } from "@/features/page-builder-blocks/block-indexer";
import { defineField, defineType } from "sanity";
import { PanelTop } from "lucide-react";
// Social media links.


export const headerSettingsSchema = defineType({
  name: "headerSettings",
  title: "Header Settings",
  type: "document",
  icon: PanelTop,
  fields: [
    // title 
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Header",
      
    }),

    //  object with icon and email
    defineField({
      name: "email",
      title: "Email",
      type: "object",
      options: {
        columns: 2,
      },
      fields: [
        defineField({
          name: "icon",
          title: "Icon",
          type: "icon",
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
        }),
      ],
    }),


  //  object with icon and phone number
  defineField({
    name: "phoneNumber",
    title: "Phone Number",
    type: "object",
    options: {
      columns: 3,
    },
    fields: [
      defineField({
        name: "icon",
        title: "Icon",
        type: "icon",
      }),
      defineField({
        name: "phoneNumber",
        title: "Phone Number",
        type: "string",
      }),
      defineField({
        name: "additionalText",
        title: "Additional Text",
        type: "string",
      })
    ],
  }),

  // light and dark logo
  defineField({
    name: "logo",
    title: "Logo",
    type: "object",
    options: {
      columns: 2,
    },
    fields: [
      defineField({
        name: "lightLogo",
        title: "Light Logo",
        type: "image",
      }),
      defineField({
        name: "darkLogo",
        title: "Dark Logo",
        type: "image",
      }),
    ],
  }),

  // navigation items - references to pages
  defineField({
    name: "navigationItems",
    title: "Navigation Items",
    type: "array",
    of: [{ type: "reference", to: [{ type: "page-slug" }] }],
  })


  ],
});





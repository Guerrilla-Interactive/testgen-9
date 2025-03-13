import { defineField, defineType } from "sanity";
import {  Star } from "lucide-react";

export default defineType({
  name: "service-slug",
  title: "Service",
  type: "document",
  icon: Star,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "customTitle",
      title: "Custom Title",
      type: "string",
      group: "settings",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "body",
      title: "Text Content",
      type: "block-content",
      
    }),
    defineField({
      name: "customContactForm",
      title: "Custom Contact Form",
      type: "custom-contact-form-block",
      group: "content",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
    }),

    defineField({
      name: "faqs",
      title: "FAQs",
      type: "faqs-block",

    })

  ],
});

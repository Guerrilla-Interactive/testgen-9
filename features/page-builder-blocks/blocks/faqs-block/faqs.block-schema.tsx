import { defineField, defineType } from "sanity";
import { ListCollapse } from "lucide-react";

export default defineType({
  name: "faqs-block",
  type: "object",
  icon: ListCollapse,
  fields: [

    defineField({
      name: "faqs",
      type: "array",
      title: "FAQs",
      of: [
        {
          name: "faq",
          type: "reference",
          to: [{ type: "faq" }],
        },
      ],


    }),

    defineField({
      name: "faqsByCategory",
      type: "array",
      title: "FAQs by Category",
      of: [
        {
          name: "faqCategory",
          type: "reference",
          to: [{ type: "faqCategory" }],
        },
      ],
      description: "Title of the FAQs block",
    }),
    
  ],
  preview: {
    select: {
      title: "faqs.0.title",
    },
    prepare({ title }) {
      return {
        title: "FAQs",
        subtitle: title || "No Title",
      };
    },
  },
}); 
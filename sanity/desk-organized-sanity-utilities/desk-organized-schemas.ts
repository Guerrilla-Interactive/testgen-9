import authorSchema from "@/sanity/desk-organized-sanity-utilities/author/author.document-schema";
import categorySchema from "@/sanity/desk-organized-sanity-utilities/category/category.document-schema";
import faqSchema from "@/sanity/desk-organized-sanity-utilities/faq/faq.document-schema";
import testimonialSchema from "@/sanity/desk-organized-sanity-utilities/testimonial/testimonial.document-schema";

const deskOrganizedDocumentSchemas = {
    authorSchema,
    categorySchema,
    faqSchema,
    testimonialSchema
}

export const allDeskOrganizedDocumentSchemas = Object.values(deskOrganizedDocumentSchemas);

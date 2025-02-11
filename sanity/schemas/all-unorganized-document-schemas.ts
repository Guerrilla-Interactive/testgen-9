import authorSchema from "@/sanity/schemas/unorganized-documents/author.document-schema";
import categorySchema from "@/sanity/schemas/unorganized-documents/category.document-schema";
import faqSchema from "@/sanity/schemas/unorganized-documents/faq.document-schema";
import testimonialSchema from "@/sanity/schemas/unorganized-documents/testimonial.document-schema";

const unorganizedDocumentSchemas = {
    authorSchema,
    categorySchema,
    faqSchema,
    testimonialSchema
}

export const allUnorganizedDocumentSchemas = Object.values(unorganizedDocumentSchemas);

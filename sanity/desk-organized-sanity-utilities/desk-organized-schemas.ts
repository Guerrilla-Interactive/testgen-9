import participantSchema from "@/sanity/desk-organized-sanity-utilities/participant/participant.document-schema";
import categorySchema from "@/sanity/desk-organized-sanity-utilities/category/category.document-schema";
import faqSchema from "@/sanity/desk-organized-sanity-utilities/faq/faq.document-schema";
import testimonialSchema from "@/sanity/desk-organized-sanity-utilities/testimonial/testimonial.document-schema";
import faqCategorySchema from "@/sanity/desk-organized-sanity-utilities/faq-category/faq-category.document-schema";
import brandGuidelineObjects from "@/sanity/desk-organized-sanity-utilities/brand-guideline/brand-guideline-objects";
import brandGuidelineStuff from "@/sanity/desk-organized-sanity-utilities/brand-guideline/brand-guideline-stuff/index";

const deskOrganizedDocumentSchemas = {
    participantSchema,
    categorySchema,
    faqSchema,
    faqCategorySchema,
    testimonialSchema,
    ...brandGuidelineObjects,
    ...brandGuidelineStuff,
}

export const allDeskOrganizedDocumentSchemas = Object.values(deskOrganizedDocumentSchemas);

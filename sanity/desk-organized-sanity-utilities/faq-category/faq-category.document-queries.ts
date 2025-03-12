import { groq } from "next-sanity";
import { faqQuery } from "../faq/faq.document-queries";
export const getAllFaqCategoriesQuery = groq`
    faqsByCategory[]->{
      _id,
      title,
      "faqs": *[_type == "faq" && references(^._id)] {
        ${faqQuery}
        }
      }
`;

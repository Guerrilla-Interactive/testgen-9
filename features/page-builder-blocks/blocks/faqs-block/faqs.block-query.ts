import { groq } from "next-sanity";
import { getAllReferencedFaqsQuery } from "@/sanity/desk-organized-sanity-utilities/faq/faq.document-queries";
const faqsBlockQuery = groq`
  _type == "faqs-block" => {
    padding,
    colorVariant,
    ${getAllReferencedFaqsQuery}
  },
`;

export default faqsBlockQuery; 
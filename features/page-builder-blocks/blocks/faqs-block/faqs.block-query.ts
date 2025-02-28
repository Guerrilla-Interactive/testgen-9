import { groq } from "next-sanity";
import { getAllReferencedFaqsQuery } from "@/sanity/desk-organized-sanity-utilities/faq/faq.document-queries";

// @sanity-typegen-ignore
const faqsBlockQuery = groq`
  _type == "faqs-block" => {
    _type,
    padding,
    colorVariant,
    ${getAllReferencedFaqsQuery},
  }
`;

export default faqsBlockQuery; 
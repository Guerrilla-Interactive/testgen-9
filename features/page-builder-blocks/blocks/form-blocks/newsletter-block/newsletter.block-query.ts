import { groq } from "next-sanity";

const formNewsletterBlockQuery = groq`
  _type == "form-newsletter-block" => {
    _type,
    padding,
    colorVariant,
    stackAlign,
    consentText,
    buttonText,
    successMessage,
  },
`;

export default formNewsletterBlockQuery; 
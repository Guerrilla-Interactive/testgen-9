import { groq } from "next-sanity";

const formNewsletterQuery = groq`
  _type == "form-newsletter" => {
    _type,
    padding,
    colorVariant,
    stackAlign,
    consentText,
    buttonText,
    successMessage,
  },
`;

export default formNewsletterQuery; 
import { groq } from "next-sanity";

export const newsletterQuery = groq`
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
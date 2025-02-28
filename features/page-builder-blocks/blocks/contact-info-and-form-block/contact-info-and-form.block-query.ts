import { groq } from "next-sanity";

// @sanity-typegen-ignore
const contactInfoAndFormBlockQuery = groq`
  _type == "contact-info-and-form-block" => {
    _type,
    padding,
    colorVariant,
    contactHeading,
    contactDescription,
    contactEmail,
    contactPhone,
    contactAddress,
    formHeading,
    buttonText,
    successMessage,
    }
`;

export default contactInfoAndFormBlockQuery;

import { groq } from "next-sanity";

const hero3BlockQuery = groq`
  _type == "hero-3-block" => {
    _type,
    padding,
    colorVariant,
    title,
  },
`;

export default hero3BlockQuery;

import { groq } from "next-sanity";

const serviceGridBlockQuery = groq`
  _type == "service-grid-block" => {
    _type,
    padding,
    colorVariant,
  },
`;

export default serviceGridBlockQuery;

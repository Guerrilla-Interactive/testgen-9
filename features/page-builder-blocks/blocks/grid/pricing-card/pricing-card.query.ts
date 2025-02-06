import { groq } from "next-sanity";

const pricingCardQuery = groq`
  _type == "pricing-card" => {
    _type,
    title,
    tagLine,
    price,
    list[],
    excerpt,
    link,
  },
`;

export default pricingCardQuery; 
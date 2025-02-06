import { groq } from "next-sanity";

const pricingCardBlockQuery = groq`
  _type == "pricing-card-block" => {
    _type,
    title,
    tagLine,
    price,
    list[],
    excerpt,
    link,
  },
`;

export default pricingCardBlockQuery; 
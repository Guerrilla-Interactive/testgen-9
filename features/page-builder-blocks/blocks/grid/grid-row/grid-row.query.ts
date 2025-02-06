import { groq } from "next-sanity";
// Update paths for the queries based on your reorg

import pricingCardQuery from "../pricing-card/pricing-card.query";
import gridPostQuery from "../grid-post/grid-post.query";
import gridCardQuery from "../grid-card/grid-card.query";

const gridRowQuery = groq`
  _type == "grid-row" => {
    _type,
    padding,
    colorVariant,
    gridColumns,
    columns[]{
      ${gridCardQuery}
      ${pricingCardQuery}
      ${gridPostQuery}
    },
  },
`;

export default gridRowQuery; 
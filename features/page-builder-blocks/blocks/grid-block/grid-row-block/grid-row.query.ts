import { groq } from "next-sanity";
// Update paths for the queries based on your reorg

import pricingCardQuery from "../pricing-card-block/pricing-card.query";
import gridPostQuery from "../grid-post-block/grid-post.query";
import gridCardQuery from "../grid-card-block/grid-card.query";

const gridRowBlockQuery = groq`
  _type == "grid-row-block" => {
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

export default gridRowBlockQuery; 
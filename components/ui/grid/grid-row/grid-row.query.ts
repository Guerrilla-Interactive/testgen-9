import { groq } from "next-sanity";
// Update paths for the queries based on your reorg
import { gridCardQuery } from "@/components/ui/grid/grid-card/grid-card.query";
import { pricingCardQuery } from "../pricing-card/pricing-card.query";
import { gridPostQuery } from "../grid-post/grid-post.query";


export const gridRowQuery = groq`
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
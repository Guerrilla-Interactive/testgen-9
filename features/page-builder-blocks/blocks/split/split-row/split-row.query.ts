import { groq } from "next-sanity";
import { splitCardsListQuery } from "../split-cards-list/split-cards-list.query";
import { splitContentQuery } from "../split-content/split-content.query";
import { splitImageQuery } from "../split-image/split-image.query";
import { splitInfoListQuery } from "../split-info-list/split-info-list.query";


export const splitRowQuery = groq`
  _type == "split-row" => {
    _type,
    padding,
    colorVariant,
    noGap,
    splitColumns[]{
      ${splitContentQuery}
      ${splitCardsListQuery}
      ${splitImageQuery}
      ${splitInfoListQuery}
    },
  },
`; 
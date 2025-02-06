import { groq } from "next-sanity";
import splitCardsListQuery from "../split-cards-list/split-cards-list.query";
import splitContentQuery from "../split-content/split-content.query";
import splitImageQuery from "../split-image/split-image.query";
import splitInfoListQuery from "../split-info-list/split-info-list.query";

const splitRowBlockQuery = groq`
  _type == "split-row-block" => {
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

export default splitRowBlockQuery; 
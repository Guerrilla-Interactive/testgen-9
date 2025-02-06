import { groq } from "next-sanity";
import splitCardsListQuery from "../split-cards-list-block/split-cards-list.block-query";
import splitContentQuery from "../split-content-block/split-content.block-query";
import splitImageQuery from "../split-image-block/split-image.block-query";
import splitInfoListQuery from "../split-info-list-block/split-info-list.block-query";

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
import { groq } from "next-sanity";
import splitCardsListQuery from "../split-cards-list-block/split-cards-list.query";
import splitContentQuery from "../split-content-block/split-content.query";
import splitImageQuery from "../split-image-block/split-image.query";
import splitInfoListQuery from "../split-info-list-block/split-info-list.query";

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
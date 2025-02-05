import { groq } from "next-sanity";
import { splitContentQuery } from "@/components/ui/split/split-content/split-content.query";
import { splitCardsListQuery } from "@/components/ui/split/split-cards-list/split-cards-list.query";
import { splitImageQuery } from "@/components/ui/split/split-image/split-image.query";
import { splitInfoListQuery } from "@/components/ui/split/split-info-list/split-info-list.query";

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

import { imageQuery } from "@/features/unorganized-components/image-component/image.query";
import { groq } from "next-sanity";

const hero3BlockQuery = groq`
  _type == "hero-3-block" => {
    _type,
    titleOrange,
    titleWhite,
    subtitle,
    backgroundImage{
      ${imageQuery}
    },
  },
`;

export default hero3BlockQuery;

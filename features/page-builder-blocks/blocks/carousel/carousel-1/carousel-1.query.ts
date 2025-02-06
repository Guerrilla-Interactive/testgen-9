import { groq } from "next-sanity";

const carousel1Query = groq`
  _type == "carousel-1" => {
    _type,
    padding,
    colorVariant,
    size,
    orientation,
    indicators,
    images[]{
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
  },
`;

export default carousel1Query; 
import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const imageInnerQuery = groq`
  crop,
  hotspot,
  asset->{
    _id,
    title,
    altText,
    description,
    metadata {
      lqip,
      dimensions {
        aspectRatio,
        width,
        height
      }
    }
  }
`;

// @sanity-typegen-ignore
export const imageQuery = groq`
  ${imageInnerQuery}
`;

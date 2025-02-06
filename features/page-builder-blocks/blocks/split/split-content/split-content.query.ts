import { groq } from "next-sanity";

const splitContentQuery = groq`
  _type == "split-content" => {
    _type,
    sticky,
    padding,
    colorVariant,
    tagLine,
    title,
    body[]{
      ...,
      _type == "image" => {
        ...,
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
        }
      }
    },
    link,
  },
`;

export default splitContentQuery; 
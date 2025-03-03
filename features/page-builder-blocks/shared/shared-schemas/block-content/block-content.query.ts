import { groq } from "next-sanity";

const blockContentQuery = groq`
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
`;

export default blockContentQuery;

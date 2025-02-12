import { groq } from "next-sanity";
export const getAuthorReferenceQuery = groq`
  author->{
    name,
    image {
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
    }
  },
`;

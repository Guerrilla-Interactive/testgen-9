import { groq } from "next-sanity";



export const getAllReferencedFaqsQuery = groq`
faqs[]->{
    _id,
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
  },
`;

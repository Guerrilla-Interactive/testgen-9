import { groq } from "next-sanity";

export const getAllReferencedTestimonialsQuery = groq`
testimonial[]->{
    _id,
    name,
    title,
    image{
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
  }
`;

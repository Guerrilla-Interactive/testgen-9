import { groq } from "next-sanity";


export const faqQuery = groq`
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
    }
`;


export const getAllReferencedFaqsQuery = groq`
faqs[]->{
  ${faqQuery}
}
`;




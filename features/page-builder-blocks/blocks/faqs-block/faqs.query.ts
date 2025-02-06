import { groq } from "next-sanity";

const faqsBlockQuery = groq`
  _type == "faqs-block" => {
    padding,
    colorVariant,
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
  },
`;

export default faqsBlockQuery; 
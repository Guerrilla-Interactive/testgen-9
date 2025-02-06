import { groq } from "next-sanity";

const gridCardBlockQuery = groq`
  _type == "grid-card-block" => {
    _type,
    title,
    excerpt,
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
    link,
  },
`;

export default gridCardBlockQuery; 
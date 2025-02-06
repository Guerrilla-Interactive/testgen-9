import { groq } from "next-sanity";

const gridCardQuery = groq`
  _type == "grid-card" => {
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

export default gridCardQuery; 
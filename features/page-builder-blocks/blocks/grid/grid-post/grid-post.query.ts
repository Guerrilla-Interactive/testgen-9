import { groq } from "next-sanity";

const gridPostBlockQuery = groq`
  _type == "grid-post-block" => {
    _type,
    ...post->{
      title,
      slug,
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
      categories[]->{
        title,
      },
    },
  },
`;

export default gridPostBlockQuery; 
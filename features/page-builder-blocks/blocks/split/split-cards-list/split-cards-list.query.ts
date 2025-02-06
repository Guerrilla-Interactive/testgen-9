import { groq } from "next-sanity";

const splitCardsListBlockQuery = groq`
  _type == "split-cards-list-block" => {
    _type,
    list[]{
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
    },
  },
`;

export default splitCardsListBlockQuery; 
import { groq } from "next-sanity";

const timelineRowQuery = groq`
  _type == "timeline-row" => {
    _type,
    padding,
    colorVariant,
    timelines[]{
      title,
      tagLine,
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

export default timelineRowQuery;

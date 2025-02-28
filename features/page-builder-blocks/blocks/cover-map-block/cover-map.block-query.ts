import { groq } from "next-sanity";

// @sanity-typegen-ignore
const coverMapBlockQuery = groq`
  _type == "cover-map-block" => {
    _type,
    center,
    zoom,
  }
`;

export default coverMapBlockQuery;

import { groq } from "next-sanity";
import { metadataQuery } from "./metadata.query";

export const metadataSettingsQuery = groq`
  *[_type == "metadataSettings"][0] {
    ${metadataQuery}
  }
`;

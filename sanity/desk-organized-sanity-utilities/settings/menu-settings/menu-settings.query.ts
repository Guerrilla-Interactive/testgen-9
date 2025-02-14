
import { linksQuery } from "@/features/unorganized-queries/links.query";
import { groq } from "next-sanity";

export const menuSettingsQuery = groq`
  *[_type == "menuSettings"][0] {
    mainMenu[] {
      ${linksQuery}
    }
  }
`;

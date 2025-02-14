
import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    privacyPolicyPage-> {
      "slug": slug.current,
      title
    },
  }
`;

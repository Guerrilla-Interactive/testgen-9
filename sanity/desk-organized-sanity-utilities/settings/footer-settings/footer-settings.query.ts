import { pageBuilderQuery } from "@/features/page-builder-blocks/block-indexer";
import { groq } from "next-sanity";


export const footerSettingsQuery = groq`
    ${pageBuilderQuery},
    ctaText,
    infoText,
    contactInfo,
    socialMediaLinks[] {
      platform,
      url
  }
`;






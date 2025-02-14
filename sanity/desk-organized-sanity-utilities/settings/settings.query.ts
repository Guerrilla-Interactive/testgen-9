

import { groq } from "next-sanity";
import { siteSettingsQuery } from "./site-settings/site-settings.query";
import { menuSettingsQuery } from "./menu-settings/menu-settings.query";
import { metadataSettingsQuery } from "./metadata-settings/metadata-settings.query";
import { sanityFetch } from "@/sanity/lib/live";


const settingsQuery = groq`{
  "siteSettings": ${siteSettingsQuery},
  "menuSettings": ${menuSettingsQuery},
  "metadataSettings": ${metadataSettingsQuery},
}`;

export const fetchSettings = async () => {
  const data = await sanityFetch({
    query: settingsQuery,
  });

  return data;
};

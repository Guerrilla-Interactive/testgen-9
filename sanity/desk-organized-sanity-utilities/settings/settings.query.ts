

import { groq } from "next-sanity";
import { siteSettingsQuery } from "./site-settings/site-settings.query";
import { menuSettingsQuery } from "./menu-settings/menu-settings.query";
import { metadataSettingsQuery } from "./metadata-settings/metadata-settings.query";
import { sanityFetch } from "@/sanity/lib/live";
import { footerSettingsQuery } from "./footer-settings/footer-settings.query";
import { headerSettingsQuery } from "./header-settings/header-settings.query";




const footerQuery = groq`
  *[_type == "footerSettings"][0] {
  ${footerSettingsQuery}
  }
`;

const headerQuery = groq`
  *[_type == "headerSettings"][0] {
  ${headerSettingsQuery}
  }
`;


const settingsQuery = groq`{
  "siteSettings": ${siteSettingsQuery},
  "headerSettings": ${headerQuery},
  "footerSettings": ${footerSettingsQuery},
  "menuSettings": ${menuSettingsQuery},
  "metadataSettings": ${metadataSettingsQuery},
}`;





export const fetchSettings = async () => {
  const data = await sanityFetch({
    query: settingsQuery,
  });

  return data;
};


export const fetchFooter = async () => {
  const data = await sanityFetch({
    query: footerQuery,
  });
  return data;
};

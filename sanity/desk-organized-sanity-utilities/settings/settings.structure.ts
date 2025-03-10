import { Settings } from "lucide-react";

import type { StructureBuilder } from "sanity/structure";


import { singletonListItem } from "@/features/unorganized-utils/singleton-list-item.desk";
import { menuSettingsSchema, metadataSettingsSchema, siteSettingsSchema, footerSettingsSchema } from "./all-settings-document-schemas";
import { headerSettingsSchema } from "./header-settings/header-settings.schema";



export const settingsStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title("Innstillinger")
    .icon(Settings)
    .child(
      S.list()
        .title("Innstillinger")
        .items([
          singletonListItem(S, siteSettingsSchema),
          singletonListItem(S, menuSettingsSchema),
          
          S.divider(),
          singletonListItem(S, metadataSettingsSchema),
          singletonListItem(S, headerSettingsSchema),
          singletonListItem(S, footerSettingsSchema),
        ]),
    );
};

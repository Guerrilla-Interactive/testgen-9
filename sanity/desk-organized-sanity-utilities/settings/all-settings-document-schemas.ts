import { menuSettingsSchema } from "./menu-settings/menu-settings.schema";
import { metadataSettingsSchema } from "./metadata-settings/metadata-settings.schema";
import { siteSettingsSchema } from "./site-settings/site-settings.schema";

export { menuSettingsSchema } from "./menu-settings/menu-settings.schema";
export { metadataSettingsSchema } from "./metadata-settings/metadata-settings.schema";
export { siteSettingsSchema } from "./site-settings/site-settings.schema";

const settingsSchemas = {
  // menuSettingsSchema,
  metadataSettingsSchema,
  siteSettingsSchema,
};

export const allSettingsSchemas= Object.values( settingsSchemas);


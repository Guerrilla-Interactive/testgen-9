import { menuSettingsSchema } from "./menu-settings.schema";
import { metadataSettingsSchema } from "./metadata-settings.schema";
import { siteSettingsSchema } from "./site-settings.schema";

export { menuSettingsSchema } from "./menu-settings.schema";
export { metadataSettingsSchema } from "./metadata-settings.schema";
export { siteSettingsSchema } from "./site-settings.schema";

const settingsSchemas = {
  menuSettingsSchema,
  metadataSettingsSchema,
  siteSettingsSchema,
};

export const allSettingsSchemas= Object.values( settingsSchemas);


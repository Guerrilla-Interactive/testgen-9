import { metadataField } from "@/sanity/schemas/generator-fields/metadata.field";
import { Search } from "lucide-react";
import { defineType } from "sanity";

export const metadataSettingsSchema = defineType({
  type: "document",
  name: "metadataSettings",
  title: "Standard SEO & metadata",
  icon: Search,
  fields: [metadataField({ isDefault: true, group: false })],
  preview: {
    prepare() {
      return {
        title: "Standard SEO & metadata",
      };
    },
  },
});

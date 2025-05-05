function translate<T extends Record<string, any>>(
  translations: T | undefined | null
) {
  return function t<K extends keyof T>(
    key: K, 
    fallback: string
  ): string {
    if (!translations) return fallback;
    const value = translations[key];
    return (value !== undefined ? String(value) : fallback);
  };
} 

export const brandGuidelineSchemaTranslations = translate({
  // Document schemas
  "brandGuideline.title": "Merkevaremanual",
  "brandGuideline.description": "Hovedmal for merkevare og stil",
  "companyName.title": "Firmanavn",
  "logo.title": "Logo",
  "logo.description": ".svg er best",
  "subPage.title": "Undersider",

  // Object schemas
  "colors.title": "Farger",
  "colors.description": "Fargepalett for merkevaren",
  "textStyles.title": "Typografi",
  "textStyles.description": "Skrifttyper og stiler for merkevaren",
  "fileUpload.title": "Filopplastning",
  "fileUpload.description": "Last opp og administrer filer for merkevaren",
});

export const brandGuidelineComponentTranslations = translate({
  // Component translations
  "brandGuideline.title": "Merkevaremanual",
  "colors.title": "Farger",
  "typography.title": "Typografi",
  "assets.title": "Ressurser"
}); 
/**
 * Simple, type-safe translation utility with autosuggestions
 */

/**
 * Creates a typed translation helper with autosuggestions
 */
export function translate<T extends Record<string, any>>(
  translations: T | undefined | null
) {
  // Return a strongly-typed translation function
  return function t<K extends keyof T>(
    key: K, 
    fallback: string
  ): string {
    if (!translations) return fallback;
    const value = translations[key];
    return (value !== undefined ? String(value) : fallback);
  };
} 
import Color from 'color';

// Ensure you have installed `@types/color`

/**
 * Calculates the WCAG contrast ratio between two colors.
 * @param color1 First color string (hex, rgb, etc.).
 * @param color2 Second color string (hex, rgb, etc.).
 * @returns Contrast ratio rounded to one decimal place.
 */
export const WcagContrast = (color1: string, color2: string): number => {
  try {
    return Number(Color(color1).contrast(Color(color2)).toFixed(1));
  } catch (error) {
    console.error('Error calculating contrast:', error);
    return 0; // Return a default value on error
  }
};

/**
 * Ensures a hex color string starts with '#'.
 * @param colorString Input color string.
 * @returns Hex string with leading '#'.
 */
export const cleanHex = (colorString: string): string => {
  return colorString.startsWith('#') ? colorString : `#${colorString}`;
};

/**
 * Gets the numerical values of a color in a specified format (rgb, hsl, cmyk).
 * @param color Color string (hex, rgb, etc.).
 * @param colorType The target color model ('rgb', 'hsl', 'cmyk').
 * @returns Array of rounded numerical values.
 */
const getColorValues = (color: string, colorType: 'rgb' | 'hsl' | 'cmyk'): number[] => {
  try {
    const colorValues = Color(color)[colorType]().color;
    return colorValues.map((value) => Math.round(value));
  } catch (error) {
    console.error(`Error getting ${colorType} values:`, error);
    return []; // Return empty array on error
  }
};

/**
 * Converts a color string to an RGB string.
 * @param color Color string (hex, rgb, etc.).
 * @returns Formatted RGB string.
 */
export const toRGB = (color: string): string => {
  const [r, g, b] = getColorValues(color, 'rgb');
  return `RGB: ${r ?? 'N/A'} ${g ?? 'N/A'} ${b ?? 'N/A'}`;
};

/**
 * Converts a color string to an HSL string.
 * @param color Color string (hex, rgb, etc.).
 * @returns Formatted HSL string.
 */
export const toHSL = (color: string): string => {
  const [h, s, l] = getColorValues(color, 'hsl');
  return `HSL: ${h ?? 'N/A'}° ${s ?? 'N/A'}% ${l ?? 'N/A'}%`;
};

/**
 * Converts a color string to a CMYK string.
 * @param color Color string (hex, rgb, etc.).
 * @returns Formatted CMYK string.
 */
export const toCMYK = (color: string): string => {
  const [c, m, y, k] = getColorValues(color, 'cmyk');
  return `CMYK: ${c ?? 'N/A'} ${m ?? 'N/A'} ${y ?? 'N/A'} ${k ?? 'N/A'}`;
};

/**
 * Determines if white text has higher contrast than black text against a given background color.
 * @param color Background color string (hex, rgb, etc.).
 * @returns True if white text has higher contrast, false otherwise.
 */
export const whiteHasHighestContrast = (color: string): boolean => {
  try {
    // Using common hex values for white-ish and black-ish text
    const whiteTextContrast = WcagContrast('#FFFFFF', color); 
    const blackTextContrast = WcagContrast('#000000', color);
    return whiteTextContrast >= blackTextContrast; // Return true if white is better or equal
  } catch (error) {
    console.error('Error comparing contrasts:', error);
    return false; // Default to assuming black is better on error
  }
}; 
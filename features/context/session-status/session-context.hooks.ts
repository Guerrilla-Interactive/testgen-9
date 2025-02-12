"use client";

// session-status.hooks.ts
import { useState, useEffect } from 'react';
import { usePathname } from 'next/dist/client/components/navigation';

import type { SessionContext } from './session-context.states';

/**
 * Returns true if the given RGB(A) string represents a "dark" color.
 * Expects a string like "rgb(10, 20, 30)" or "rgba(10, 20, 30, 1)".
 */
const isColorDark = (colorString: string): boolean => {
  const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/;
  const match = colorString.match(regex);
  if (!match) return false;

  const r = Number.parseInt(match[1], 10);
  const g = Number.parseInt(match[2], 10);
  const b = Number.parseInt(match[3], 10);
  const alpha = match[4] !== undefined ? Number.parseFloat(match[4]) : 1;
  if (alpha === 0) return false;

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};

/**
 * Returns true if the given HEX color string represents a "dark" color.
 * Expects a string like "#053c8a".
 */
const isColorDarkHex = (hex: string): boolean => {
  const normalizedHex = hex.startsWith('#') ? hex.slice(1) : hex;
  if (normalizedHex.length !== 6) return false;
  const r = Number.parseInt(normalizedHex.substr(0, 2), 16);
  const g = Number.parseInt(normalizedHex.substr(2, 2), 16);
  const b = Number.parseInt(normalizedHex.substr(4, 2), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};

/**
 * Traverses the element stack at the given point (x, y) to find an effective
 * background color. Returns a CSS color string (like "rgb(255, 255, 255)") or
 * null if none is found.
 */
const getEffectiveBackgroundColor = (x: number, y: number): string | null => {
  const elements = document.elementsFromPoint(x, y);
  for (const element of elements) {
    const style = window.getComputedStyle(element);
    let bgColor = style.backgroundColor;

    if (
      bgColor === 'transparent' ||
      bgColor === 'rgba(0, 0, 0, 0)' ||
      bgColor === ''
    ) {
      continue;
    }

    return bgColor;
  }
  return 'rgb(255, 255, 255)';
};

/**
 * Checks for a cover element within the first <main> that has both
 * data-cover="true" and a data-palette attribute. Returns the palette color
 * (e.g., "#053c8a") or null if not found.
 */
const getCoverColorFromMain = (): string | null => {
  const mainEl = document.querySelector('main');
  if (mainEl) {
    const coverEl = mainEl.querySelector("[data-cover='true'][data-palette]");
    if (coverEl) {
      const palette = coverEl.getAttribute('data-palette');
      return palette ? palette : null;
    }
  }
  return null;
};

/**
 * Samples the top 50% of the viewport and returns true if more than 50%
 * of the sampled points are "dark."
 */
const checkTopAreaDark = (): boolean => {
  const width = window.innerWidth;
  const sampleHeight = window.innerHeight * 0.5;
  let darkCount = 0;
  let sampleCount = 0;
  const step = 50; // adjust this value to sample more or fewer points

  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < sampleHeight; y += step) {
      const effectiveBgColor = getEffectiveBackgroundColor(x, y);
      if (effectiveBgColor) {
        sampleCount++;
        if (isColorDark(effectiveBgColor)) {
          darkCount++;
        }
      }
    }
  }
  return sampleCount ? darkCount / sampleCount > 0.5 : false;
};

/**
 * Calculates and returns a brightness score (0.00 to 1.00) from a HEX color string.
 */
const calculateBrightnessFromHex = (hex: string): number => {
  const normalizedHex = hex.startsWith('#') ? hex.slice(1) : hex;
  if (normalizedHex.length !== 6) return 1;
  const r = Number.parseInt(normalizedHex.substr(0, 2), 16);
  const g = Number.parseInt(normalizedHex.substr(2, 2), 16);
  const b = Number.parseInt(normalizedHex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness / 255;
};

/**
 * Samples the top 50% of the viewport and returns an average brightness
 * score (0.00 to 1.00). Uses the same sampling method as checkTopAreaDark.
 */
const calculateTopImageBrightnessScore = (): number => {
  const width = window.innerWidth;
  const sampleHeight = window.innerHeight * 0.5;
  let brightnessSum = 0;
  let sampleCount = 0;
  const step = 50;

  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < sampleHeight; y += step) {
      const effectiveBgColor = getEffectiveBackgroundColor(x, y);
      if (effectiveBgColor) {
        const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/;
        const match = effectiveBgColor.match(regex);
        if (match) {
          const r = Number.parseInt(match[1], 10);
          const g = Number.parseInt(match[2], 10);
          const b = Number.parseInt(match[3], 10);
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          brightnessSum += brightness;
          sampleCount++;
        }
      }
    }
  }
  if (sampleCount === 0) return 1;
  const avgBrightness = brightnessSum / sampleCount;
  return avgBrightness / 255;
};

/**
 * Returns a [SessionContext, setSessionContext] tuple.
 */
export const useSessionContext = (): [SessionContext, (status: SessionContext) => void] => {
  const [activeScreen, setActiveScreen] = useState<string>('defaultScreen');
  const [isTopDark, setIsTopDark] = useState<boolean>(false);
  const [sessionStartDateTime] = useState<number>(() => Date.now());
  const [sessionLoaded, setSessionLoaded] = useState<boolean>(false);
  const [topImageBrightnessValueScore, setTopImageBrightnessValueScore] = useState<number>(1);

  // Make sessionLoaded true 1 second after sessionStartDateTime.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSessionLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [sessionStartDateTime]);

  // Determines if the top area is considered dark and computes a brightness score.
  const handleChange = () => {
    const coverColor = getCoverColorFromMain();
    let brightnessScore: number;
    let topDark: boolean;

    if (coverColor) {
      brightnessScore = calculateBrightnessFromHex(coverColor);
      topDark = brightnessScore < 0.5;
    } else {
      brightnessScore = calculateTopImageBrightnessScore();
      topDark = brightnessScore < 0.5;
    }

    setIsTopDark(topDark);
    setTopImageBrightnessValueScore(brightnessScore);
  };

  useEffect(() => {
    handleChange();
    window.addEventListener('resize', handleChange);
    window.addEventListener('scroll', handleChange);
    return () => {
      window.removeEventListener('resize', handleChange);
      window.removeEventListener('scroll', handleChange);
    };
  }, []);

  const pathname = usePathname();
  useEffect(() => {
    handleChange();
  }, [pathname]);

  const sessionContext: SessionContext = {
    activeScreen,
    sessionLoaded,  
    setActiveScreen,
    isTopDark,
    setIsTopDark,
    sessionStartDateTime,
    topImageBrightnessValueScore,
    setTopImageBrightnessValueScore,
  };

  const setSessionContext = (newStatus: SessionContext) => {
    setActiveScreen(newStatus.activeScreen);
    setIsTopDark(newStatus.isTopDark);
    setTopImageBrightnessValueScore(newStatus.topImageBrightnessValueScore);
  };

  return [sessionContext, setSessionContext];
};

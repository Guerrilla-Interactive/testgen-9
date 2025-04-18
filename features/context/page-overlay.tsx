"use client"; // Mark this as a Client Component

import { cn } from "@/features/unorganized-utils/utils";
import { useGlobalContext } from "./global-context"; // Import the hook

// This component can now safely use the context hook
export function PageOverlay() {
  const { isScoreboardEditing } = useGlobalContext();

  return (
    <div
      className={cn(
        // Styles for the full-screen overlay
        "fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-opacity duration-200",
        // Conditionally control visibility and interaction
        isScoreboardEditing ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      aria-hidden="true" // It's decorative
    />
  );
} 
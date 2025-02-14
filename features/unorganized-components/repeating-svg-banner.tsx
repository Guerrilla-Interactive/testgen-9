import React from "react";

export default function RepeatingSvgBanner() {
  return (
    <svg
      width="100%"
      height="30"
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Single orange background rectangle */}
      <rect width="100%" height="63" fill="#D76B01" />

      <defs>
        {/* Define the pattern with only the black path. */}
        <pattern
          id="bannerPattern"
          patternUnits="userSpaceOnUse"
          width="80"
          height="63"
        >
        <path d="M55.1959 0L0 63H6.83417H24.7829L80 0H55.1959Z" fill="black"/>
        </pattern>
      </defs>

      {/* Apply the repeating pattern on top of the orange background */}
      <rect width="100%" height="63" fill="url(#bannerPattern)" />
    </svg>
  );
}

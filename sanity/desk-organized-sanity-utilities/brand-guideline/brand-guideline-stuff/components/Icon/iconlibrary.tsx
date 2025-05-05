import React from "react";

// Define the type for the icon library entries
// Keys are strings (icon names), values are React elements (SVG fragments)
type IconLibraryType = { 
  [key: string]: React.ReactElement;
};

// Assign the icon data to a variable with the defined type
const iconLibraryData: IconLibraryType = {
  fontSize: (
    <>
      <rect
        x=".5"
        y=".5"
        width="23"
        height="23"
        rx="1.5"
        fill="#E9EFF2"
        stroke="#D9E3E8"
      />
      <path
        d="M14.653 18.483L10.302 5.741a.333.333 0 00-.63 0L5.332 18.483M6.922 13.817h6.138M4.333 18.483h2.014M13.653 18.483h2.014M19 18.483l-2.749-8.052a.333.333 0 00-.63 0l-1.259 3.696M15.28 15.15h2.583M18.344 18.483h1.323"
        stroke="#000"
        strokeWidth=".5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  lineHeight: (
    <>
      <rect
        x=".5"
        y=".5"
        width="23"
        height="23"
        rx="1.5"
        fill="#E9EFF2"
        stroke="#D9E3E8"
      />
      <path
        d="M17.234 9.333l-2.025-4.862a.227.227 0 00-.418 0l-2.025 4.862M13.46 7.665h3.08M7.667 10.332v9.333M5.667 12.332l2-2 2 2M5.667 17.665l2 2 2-2M18.333 10.999h-6.666M17.234 18.333l-2.025-4.86a.227.227 0 00-.334-.102.226.226 0 00-.084.102l-2.025 4.86M13.575 16.332H16.4M18.333 19.665h-6.666"
        stroke="#000"
        strokeWidth=".5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  case: (
    <>
      <rect
        x=".5"
        y=".5"
        width="23"
        height="23"
        rx="1.5"
        fill="#E9EFF2"
        stroke="#D9E3E8"
      />
      <path
        d="M4.333 9v-.667A.667.667 0 015 7.667h5.333a.667.667 0 01.667.666V9M7.667 7.665V17M6.667 16.999h2M13 9v-.667a.666.666 0 01.667-.666H19a.667.667 0 01.667.666V9M16.333 7.665V17M15.333 16.999h2"
        stroke="#000"
        strokeWidth=".5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  ligatures: (
    <>
      <rect
        x=".5"
        y="2.5"
        width="23"
        height="23"
        rx="1.5"
        fill="#E9EFF2"
        stroke="#D9E3E8"
      />
      <path
        d="M16.333 16.333l-4.027-9.295a.333.333 0 00-.612 0l-4.027 9.295M9.111 12.999h5.778M6.667 16.332h2M15.333 16.332h2M19 17.665H5a.667.667 0 00-.667.667v2.667c0 .368.299.666.667.666h14a.667.667 0 00.667-.666v-2.667a.667.667 0 00-.667-.667z"
        stroke="#000"
        strokeWidth=".5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.333 18.999l1.334 1.333L18 19"
        stroke="#000"
        strokeWidth=".5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  letterSpacing: (
    <>
      <rect
        x=".5"
        y=".5"
        width="23"
        height="23"
        rx="1.5"
        fill="#E9EFF2"
        stroke="#D9E3E8"
      />
      <path
        d="M8.667 16l3.025-7.806a.293.293 0 01.119-.14.356.356 0 01.378 0 .293.293 0 01.119.14L15.333 16M9.95 12.999h4.1M6.1 17.997L6 6.667M18.1 17.997L18 6.667"
        stroke="#000"
        strokeWidth=".5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  textStyle: (
    <>
      <rect
        x=".5"
        y=".5"
        width="23"
        height="23"
        rx="1.5"
        fill="#E9EFF2"
        stroke="#D9E3E8"
      />
      <path
        d="M6 6.333V5a.667.667 0 01.667-.667h10.666A.667.667 0 0118 5v1.333M12 4.332v15.333M9.667 19.665h4.666"
        stroke="#000"
        strokeWidth=".5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  download: (
    <>
      <g clipPath="url(#clip0)">
        <path
          d="M20 12.705L12 21l-8-8.295.765-.793 6.69 6.937V3h1.09v15.85l6.69-6.938.765.793z"
          fill="#fff" // Note: Fill is hardcoded white here
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" transform="translate(4 3)" d="M0 0h16v18H0z" />
        </clipPath>
      </defs>
    </>
  ),
};

// Define a type representing the keys of the icon library
export type IconName = keyof typeof iconLibraryData;

// Export the typed icon library data
export default iconLibraryData; 
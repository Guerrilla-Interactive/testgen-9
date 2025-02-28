import React from "react";

type ArrowSVGProps = {
  className?: string;
  color?: string;
};

export const ArrowSVG: React.FC<ArrowSVGProps> = ({
  className,
  color = "white",
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 119 218"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M119 99.8574L0 0V35.5L96 123.5L119 99.8574Z" fill={color} />
      <path d="M0 172V218L79 139.5L55.5 116L0 172Z" fill={color} />
    </svg>
  );
};

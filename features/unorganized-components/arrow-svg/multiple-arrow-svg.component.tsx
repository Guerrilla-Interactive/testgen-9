

import React from "react";
import { ArrowSVG } from "./arrow-svg.component";


type MultipleArrowSVGProps = {
  className?: string;
  amount?: number;
  color?: string;
};

export const MultipleArrowSVG: React.FC<MultipleArrowSVGProps> = ({
  className,
  color = "black",
  amount = 3,
}) => {
  const arrowWidth = 119;
  const arrowHeight = 218;
  const totalWidth = arrowWidth * amount;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${totalWidth} ${arrowHeight}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: amount }).map((_, i) => {
        const xPosition = i * arrowWidth - ((amount - 1) * arrowWidth) / 2;

        return (
          <g key={i} transform={`translate(${xPosition}, 0)`}>
            <ArrowSVG color={color} />
          </g>
        );
      })}
    </svg>
  );
};

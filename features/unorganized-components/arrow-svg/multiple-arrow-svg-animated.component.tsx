// MultipleArrowSVGAnimated.tsx

import React from "react";
import { ArrowSVG } from "./arrow-svg.component";

type MultipleArrowSVGProps = {
  className?: string;
  amount?: number;
  color?: string;
  direction?: "left" | "right"; // "right" is default
};

export const MultipleArrowSVGAnimated: React.FC<MultipleArrowSVGProps> = ({
  className,
  color = "black",
  amount = 3,
  direction = "right",
}) => {
  const arrowWidth = 119;
  const arrowHeight = 218;
  const totalWidth = arrowWidth * amount;

  // Delay increment (in seconds) for a staggered effect.
  const delayIncrement = 0.03;

  // Calculate the final x-translation for each arrow.
  const getXPosition = (i: number) =>
    i * arrowWidth - ((amount - 1) * arrowWidth) / 2;

  // For "right" direction, the rightmost arrow is anchored.
  // For "left" direction, the leftmost arrow is anchored.
  const anchorIndex = direction === "left" ? 0 : amount - 1;
  const anchorX = getXPosition(anchorIndex);

  return (
    <div className="group inline-block">
      <svg
        className={className}
        viewBox={`0 0 ${totalWidth} ${arrowHeight}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {Array.from({ length: amount }).map((_, i) => {
          const targetX = getXPosition(i);
          // Calculate delay based on the direction.
          // For "left": delays increase with index.
          // For "right": delays decrease with index.
          const delay =
            i === anchorIndex
              ? 0
              : direction === "left"
              ? i * delayIncrement
              : (amount - 1 - i) * delayIncrement;

          return (
            <g
              key={i}
              style={{
                "--target-x": `${targetX}px`,
                "--default-x": `${anchorX}px`,
                transitionDelay: `${delay}s`,
              } as React.CSSProperties}
              className={`transition-all group-hover:duration-500 duration-200 ease-out 
                ${i === anchorIndex
                  ? ""
                  : "opacity-0  group-hover:opacity-100 group-hover:translate-x-[var(--target-x)]"}
                translate-x-[var(--default-x)]`}
            >
              <ArrowSVG color={color} />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

"use client"

import { useState } from "react";
import { useGlobalContext } from "@/features/context/global-context";
import { Img, type ImageQuery } from "@/features/unorganized-components/image-component/image.component";

interface Hero3Props {
  backgroundImage?: ImageQuery;
  titleOrange?: string;
  titleWhite?: string;
  subtitle?: string;
}

export default function Hero3BlockComponent(props: Partial<Hero3Props>) {
  const { backgroundImage, titleOrange, titleWhite, subtitle } = props;
  const { sessionStatus } = useGlobalContext();
  const { sessionLoaded } = sessionStatus;
  
  // Capture the initial state of sessionLoaded. If it's false, we should animate.
  // This state won't update even if sessionLoaded becomes true later, ensuring the animations complete.
  const [shouldAnimate] = useState(!sessionLoaded);

  return (
    <div className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden">
      {backgroundImage && (
        <Img
          {...backgroundImage}
          cover
          eager
          className={`absolute inset-0 w-full h-full object-cover ${shouldAnimate ? 'animate-scale-in-bg' : ''}`}
          sizes={{ md: "full" }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      
      {/* Content Section: Title Bottom-Left, Subtitle Bottom-Right */}
      <div className="absolute container bottom-0 inset-x-0 flex flex-col md:flex-row justify-between md:items-end pb-4 md:pb-8">
        {/* Left: Title */}
        <div className="text-left">
          {(titleOrange || titleWhite) && (
            <h1 className={`text-white text-3xl uppercase font-title font-extrabold sm:text-4xl md:text-5xl lg:text-6xl leading-tight drop-shadow-lg ${shouldAnimate ? 'animate-fade-in-title' : ''}`}>
              {titleOrange && <span className="block text-orange-500">{titleOrange}</span>}
              {titleWhite && <span className="block">{titleWhite}</span>}
            </h1>
          )}
        </div>
        {/* Right: Subtitle */}
        <div>
          {subtitle && (
            <p className={`mt-2 md:mt-0 text-sm sm:text-base md:text-xl max-w-96 lg:text-2xl text-white drop-shadow-lg ${shouldAnimate ? 'animate-fade-in-subtitle' : ''}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

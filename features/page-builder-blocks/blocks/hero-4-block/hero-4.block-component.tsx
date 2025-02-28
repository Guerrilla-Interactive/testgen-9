"use client"

import { useState } from "react";
import { useGlobalContext } from "@/features/context/global-context";
import { Img, type ImageQuery } from "@/features/unorganized-components/image-component/image.component";
import { Container } from "@/features/unorganized-components/nextgen-core-ui";
import { Hero4Block } from "@/sanity.types";


export default function Hero4BlockComponent(props: Partial<Hero4Block>) {
  const {
    backgroundImage,
    pretitle,
    title,
    description,
    showOverlay = true,
    topOverlayStrength = 0.2,
    upperCenterOverlayStrength = 0.0,
    lowerCenterOverlayStrength = 0.2,
    bottomOverlayStrength = 0.3,
  } = props;
  
  const { sessionStatus } = useGlobalContext();
  const { sessionLoaded } = sessionStatus;
  
  // Capture the initial state of sessionLoaded for animations
  const [shouldAnimate] = useState(!sessionLoaded);

  return (
    <div className="relative w-full h-[30vh] md:h-[40vh] overflow-hidden">
      {backgroundImage && (
         <Img
         {...backgroundImage}
         cover
         eager
         className={`absolute inset-0 w-full h-full object-cover ${shouldAnimate ? 'animate-scale-in-bg' : ''}`}
         sizes={{ md: "full" }}
       />
     )}

  {showOverlay && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to top,
              rgba(0,0,0,${bottomOverlayStrength}) 0%,
              rgba(0,0,0,${lowerCenterOverlayStrength}) 33%,
              rgba(0,0,0,${upperCenterOverlayStrength}) 66%,
              rgba(0,0,0,${topOverlayStrength}) 100%
            )`,
          }}
        />
      )}
      
      {/* Content Section: Centered Content */}
      <div className="absolute inset-0 flex items-center">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            {pretitle && (
              <h3 className={`text-orange-500 text-sm md:text-base uppercase tracking-wider font-medium mb-2 ${shouldAnimate ? 'animate-fade-in-subtitle' : ''}`}>
                {pretitle}
              </h3>
            )}
            {title && (
              <h2 className={`text-white text-2xl md:text-4xl font-title font-bold mb-4 ${shouldAnimate ? 'animate-fade-in-title' : ''}`}>
                {title}
              </h2>
            )}
            {description && (
              <p className={`text-white/80 text-sm md:text-base max-w-2xl mx-auto ${shouldAnimate ? 'animate-fade-in-subtitle delay-150' : ''}`}>
                {description}
              </p>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "../logo";
import DesktopNav from "./desktop-nav";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../menu-toggle";
import MobileNav from "./mobile-nav";
import { useGlobalContext } from "@/features/context/global-context";
import { cn } from "@/features/unorganized-utils/utils";
import { useRouter } from "next/router";
import { FlexCol, FlexRow } from "@/features/unorganized-components/nextgen-core-ui";
import { Icon } from "@iconify/react";
import { SettingsQueryResult } from "@/sanity.types";
import VeitrygghetLogo from "@/features/unorganized-components/VeitrygghetLogo";

const navItems = [
  {
    label: "Tjenester",
    href: "/tjenester",
    target: false,
  },
  {
    label: "Kurs",
    href: "#kurs",
    target: false,
  },
  {
    label: "Karriere",
    href: "/karriere",
    target: false,
  },
  {
    label: "Om Veitrygghet",
    href: "/om-veitrygghet",
    target: false,
  },
  {
    label: "Kontakt",
    href: "/kontakt",
    target: false,
  },
];

export default function Header(props: Partial<SettingsQueryResult>) {
  const { sessionStatus } = useGlobalContext();
  const { sessionLoaded, setIsTopDark, isTopDark } = sessionStatus;
  const [iconLoaded, setIconLoaded] = useState(false);

  const logoRef = useRef<HTMLDivElement>(null);

  // isLogoHovered
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { headerSettings } = props;


  const pathname = usePathname();

  // make it update on route change
  useLayoutEffect(() => {
    // Locate the first <div> within <main> and then search for a <figure> with the "data-cover" attribute.
    // Check if "data-top-image" is true.
    const mainDiv = document.querySelector("main > div");
    const figureEl = mainDiv ? mainDiv.querySelector("figure[data-cover]") : null;

    if (
      figureEl &&
      figureEl.getAttribute("data-cover") === "true" &&
      figureEl.getAttribute("data-top-image") !== "false"
    ) {
      // Get the palette value and convert to a number.
      const paletteStr = figureEl.getAttribute("data-palette");
      const palette = paletteStr ? Number(paletteStr) : NaN;
      if (!Number.isNaN(palette)) {
        // For example, if the palette value is less than 0.5, we consider the top section dark.
        setIsTopDark(palette > 0.2);
      }
    }
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "absolute top-0 w-full border-border/40 z-50 transition-all   ",
          !isTopDark ? "text-black" : "text-white",
          iconLoaded && !sessionLoaded && "animate-fade-down-slow",
          iconLoaded ? "opacity-100" : "opacity-0"

        )}
      >
        <div className="container duration-700">
          <FlexRow notAuto  className={cn(`justify-between pt-1 border-b pb-1 font-light`, isTopDark ? "border-white/20" : "border-black/20")}>
            {/* Mail, availability, phone number */}
            
            <FlexCol className=" items-center hidden md:flex hover:underline">
            <Link href={`mailto:${headerSettings?.email?.email}`}>
              <FlexRow notAuto className=" items-center gap-2 ">
                <Icon icon={headerSettings?.email?.icon.name} onLoad={() => setIconLoaded(true)} />
                <p>{headerSettings?.email?.email}</p>
              </FlexRow>
            </Link>
            </FlexCol>
            
            <FlexCol className="">
              <FlexRow className="items-center gap-2">
                <FlexCol className="gap-2 hover:underline">
                  <Link href={`tel:${headerSettings?.phoneNumber?.phoneNumber}`}>
                    <FlexRow notAuto className="items-center gap-2">
                      <Icon icon={headerSettings?.phoneNumber?.icon.name} onLoad={() => setIconLoaded(true)} />
                      <p>{headerSettings?.phoneNumber?.phoneNumber}</p>
                      <FlexCol className="gap-2">
                        <p>{headerSettings?.phoneNumber?.additionalText}</p>
                      </FlexCol>
                    </FlexRow>
                  </Link>
                </FlexCol>
              </FlexRow>
            </FlexCol>
          </FlexRow>



          <div className="flex items-center justify-between h-14">
            <Link href="/" aria-label="Home page">
            <div ref={logoRef} onMouseEnter={() => setIsLogoHovered(true)} onMouseLeave={() => setIsLogoHovered(false)}  className="w-52 h-full">
              <VeitrygghetLogo duration={1000}  hoverFrame={isTopDark ? "first" : "last"}  activeKeyframe={isTopDark ? "last" : "first"} />
              </div>
            </Link>
            <div className="hidden xl:flex gap-7 items-center justify-between">
              <DesktopNav navItems={navItems} />
              {/* <ModeToggle /> */}
            </div>
            <div className="flex items-center xl:hidden">
              {/* <ModeToggle /> */}
              <MobileNav navItems={navItems} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

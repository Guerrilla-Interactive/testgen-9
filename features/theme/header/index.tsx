"use client"

import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import Logo from "../logo";
import DesktopNav from "./desktop-nav";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../menu-toggle";
import MobileNav from "./mobile-nav";
import { useGlobalContext } from "@/features/context/global-context";
import { cn } from "@/features/unorganized-utils/utils";
import { useRouter } from "next/router";

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

export default function Header(props: any) {
  const { sessionStatus } = useGlobalContext();
  const { sessionLoaded, setIsTopDark, isTopDark } = sessionStatus;

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
    <header
      className={cn(
        "absolute top-0 w-full border-border/40 z-50 transition-all duration-100  ",
        !isTopDark ? "text-black" : "text-white",
        !sessionLoaded && "animate-fade-down-slow"
      )}
    >
      

      
      <div className="container flex items-center justify-between h-14">
        <Link href="/" aria-label="Home page">
          <Logo nonOrangeColor={!isTopDark ? "black" : "white"} />
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
    </header>
  );
}

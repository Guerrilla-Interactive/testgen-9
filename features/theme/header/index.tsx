import Link from "next/link";
import Logo from "../logo";
import DesktopNav from "./desktop-nav";
import { ModeToggle } from "../menu-toggle";
import MobileNav from "./mobile-nav";


/*

Tjenester
Kurs
Karriere
Om Veitrygghet
Kontakt

*/





const navItems = [
  {
    label: "Tjenester",
    href: "/tjenester",
    target: false,
  },
  {
    label: "Kurs",
    href: "/kurs",
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

export default function Header() {
  return (
    <header className="absolute top-0 w-full border-border/40  z-50">
      <div className="container flex items-center justify-between h-14">
        <Link className="" href="/" aria-label="Home page">
          <Logo nonOrangeColor="white" />
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

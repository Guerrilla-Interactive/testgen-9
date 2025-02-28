import Link from "next/link";
import { NavItem } from "@/types";

export default function DesktopNav({ navItems }: { navItems: NavItem[] }) {
  return (
    <div className="hidden xl:flex font-supplement items-center gap-12  uppercase">
      {navItems.map((navItem) => (
        <Link
          key={navItem.label}
          href={navItem.href}
          target={navItem.target ? "_blank" : undefined}
          rel={navItem.target ? "noopener noreferrer" : undefined}
          className="transition-colors text-sm"
        >
          {navItem.label}
        </Link>
      ))}
    </div>
  );
}

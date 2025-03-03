import { cn } from "@/features/unorganized-utils/utils";

export const DEFAULT_PADDING = {
  top: true,
  bottom: true,
};

export interface ISectionPadding {
  top: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  bottom: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export interface ISectionContainer {
  color?:
    | "primary"
    | "secondary"
    | "card"
    | "accent"
    | "destructive"
    | "background"
    | "transparent";
  children: React.ReactNode;
  className?: string;
  padding?: ISectionPadding | null | undefined;
}

export default function SectionContainer({
  color = "background",
  padding,
  children,
  className,
}: ISectionContainer) {
  return (
    <div
      className={cn(
        `bg-${color} relative`,
        className
      )}

      style={{
        paddingTop: padding?.top ? `${padding.top * 4}px` : undefined,
        paddingBottom: padding?.bottom ? `${padding.bottom * 4}px` : undefined,
      }}
    >
      <div className="container">{children}</div>
    </div>
  );
}

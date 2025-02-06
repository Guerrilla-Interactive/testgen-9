import { cn } from "@/lib/utils";
import SplitContent from "../split-content/split-content.component";
import SplitCardsList from "../split-cards-list/split-cards-list.component";
import SplitImage from "../split-image/split-image.component";
import SplitInfoList from "../split-info-list/split-info-list.component";

import { stegaClean } from "next-sanity";
import SectionContainer, { type ISectionContainer, type ISectionPadding } from "@/features/ui/section-container";


const componentMap: { [key: string]: React.ComponentType<any> } = {
  "split-content": SplitContent,
  "split-cards-list": SplitCardsList,
  "split-image": SplitImage,
  "split-info-list": SplitInfoList,
};

export default function SplitRowBlockComponent({
  padding,
  colorVariant,
  noGap,
  splitColumns,
}: Partial<{
  padding: ISectionPadding;
  colorVariant: ISectionContainer["color"];
  noGap: boolean;
  splitColumns: Sanity.Block[];
}>) {
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      {splitColumns && splitColumns?.length > 0 && (
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2",
            noGap ? "gap-0" : "gap-12 lg:gap-20"
          )}
        >
          {splitColumns?.map((block: Sanity.Block) => {
            const Component = componentMap[block._type];
            if (!Component) {
              // Fallback for unknown block types to debug
              return <div data-type={block._type} key={block._key} />;
            }
            return (
              <Component
                {...block}
                color={color}
                noGap={noGap}
                key={block._key}
              />
            );
          })}
        </div>
      )}
    </SectionContainer>
  );
} 
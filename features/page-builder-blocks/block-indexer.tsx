import { groq } from "next-sanity";
import { AllPostsBlockComponent, allPostsBlockQuery, allPostsBlockSchema } from "./blocks/all-posts-block";
import { Carousel1BlockComponent, carousel1BlockQuery, carousel1BlockSchema } from "./blocks/carousel-block/carousel-1-block";
import { Carousel2BlockComponent, carousel2BlockQuery, carousel2BlockSchema } from "./blocks/carousel-block/carousel-2-block";
import { Cta1BlockComponent, cta1BlockQuery, cta1BlockSchema } from "./blocks/cta-blocks/cta-1-block";
import { FAQsBlockComponent, faqsBlockQuery, faqsBlockSchema } from "./blocks/faqs-block";
import { FormNewsletterBlockComponent, formNewsletterBlockQuery, formNewsletterBlockSchema } from "./blocks/form-blocks/newsletter-block";
import { GridCardBlockComponent, gridCardBlockQuery, gridCardBlockSchema } from "./blocks/grid-block/grid-card-block";
import { GridPostBlockComponent, gridPostBlockQuery, gridPostBlockSchema } from "./blocks/grid-block/grid-post-block";
import { GridRowBlockComponent, gridRowBlockQuery, gridRowBlockSchema } from "./blocks/grid-block/grid-row-block";
import { PricingCardBlockComponent, pricingCardBlockQuery, pricingCardBlockSchema } from "./blocks/grid-block/pricing-card-block";
import { Hero1BlockComponent, hero1BlockQuery, hero1BlockSchema } from "./blocks/hero-1-block";
import { Hero2BlockComponent, hero2BlockQuery, hero2BlockSchema } from "./blocks/hero-2-block";
import { LogoCloud1BlockComponent, logoCloud1BlockQuery, logoCloud1BlockSchema } from "./blocks/logo-cloud-blocks/logo-cloud-1-block";
import { SectionHeaderBlockComponent, sectionHeaderBlockQuery, sectionHeaderBlockSchema } from "./blocks/section-header-block";
import { SplitCardsItemBlockComponent, splitCardsItemBlockSchema } from "./blocks/split-blocks/split-cards-item-block";
import { SplitCardsListBlockComponent, splitCardsListBlockQuery, splitCardsListBlockSchema } from "./blocks/split-blocks/split-cards-list-block";
import { SplitContentBlockComponent, splitContentBlockQuery, splitContentBlockSchema } from "./blocks/split-blocks/split-content-block";
import { SplitImageBlockComponent, splitImageBlockQuery, splitImageBlockSchema } from "./blocks/split-blocks/split-image-block";
import { SplitInfoItemBlockComponent, splitInfoItemBlockSchema } from "./blocks/split-blocks/split-info-item-block";
import { SplitInfoListBlockComponent, splitInfoListBlockQuery, splitInfoListBlockSchema } from "./blocks/split-blocks/split-info-list-block";
import { SplitRowBlockComponent, splitRowBlockQuery, splitRowBlockSchema } from "./blocks/split-blocks/split-row-block";
import { Timeline1BlockComponent, timeline1BlockSchema } from "./blocks/timeline-blocks/timeline-1-block";
import { TimelineRowBlockComponent, timelineRowBlockQuery, timelineRowBlockSchema } from "./blocks/timeline-blocks/timeline-row-block";
import { Hero3BlockComponent, hero3BlockQuery, hero3BlockSchema } from "./blocks/hero-3-block";

<<<<<<< Updated upstream
=======
import { HeadingAndParagraphCenteredBlockComponent, headingAndParagraphCenteredBlockQuery, headingAndParagraphCenteredBlockSchema } from "./blocks/heading-and-paragraph-centered-block";
import { ServiceGridBlockComponent, serviceGridBlockQuery, serviceGridBlockSchema } from "./blocks/service-grid-block";
import { CoverMapBlockComponent, coverMapBlockQuery, coverMapBlockSchema } from "./blocks/cover-map-block";
>>>>>>> Stashed changes
// ADD VALUE 1 ABOVE

export const BlockDataMap: {
  [key: string]: {
    component?: React.ComponentType<any>;
    schema?: any;
    query?: string;
  };
} = {
  "hero-1-block": { component: Hero1BlockComponent, schema: hero1BlockSchema, query: hero1BlockQuery },
  "hero-2-block": { component: Hero2BlockComponent, schema: hero2BlockSchema, query: hero2BlockQuery },
  "hero-3-block": { component: Hero3BlockComponent, schema: hero3BlockSchema, query: hero3BlockQuery },
  "section-header-block": { component: SectionHeaderBlockComponent, schema: sectionHeaderBlockSchema, query: sectionHeaderBlockQuery },
  "split-row-block": { component: SplitRowBlockComponent, schema: splitRowBlockSchema, query: splitRowBlockQuery },
  "carousel-1-block":{ component: Carousel1BlockComponent, schema: carousel1BlockSchema, query: carousel1BlockQuery },
  "carousel-2-block": { component: Carousel2BlockComponent, schema: carousel2BlockSchema, query: carousel2BlockQuery },
  "timeline-row-block": { component: TimelineRowBlockComponent, schema: timelineRowBlockSchema, query: timelineRowBlockQuery },
  "cta-1-block": { component: Cta1BlockComponent, schema: cta1BlockSchema, query: cta1BlockQuery },
  "logo-cloud-1-block": { component: LogoCloud1BlockComponent, schema: logoCloud1BlockSchema, query: logoCloud1BlockQuery },
  "faqs-block": { component: FAQsBlockComponent, schema: faqsBlockSchema, query: faqsBlockQuery },
  "form-newsletter-block": { component: FormNewsletterBlockComponent, schema: formNewsletterBlockSchema, query: formNewsletterBlockQuery },
  "all-posts-block": { component: AllPostsBlockComponent, schema: allPostsBlockSchema, query: allPostsBlockQuery },
  "split-content-block": { component: SplitContentBlockComponent, schema: splitContentBlockSchema, query: splitContentBlockQuery },
  "split-cards-list-block": { component: SplitCardsListBlockComponent, schema: splitCardsListBlockSchema, query: splitCardsListBlockQuery },
  "split-image-block": { component: SplitImageBlockComponent, schema: splitImageBlockSchema, query: splitImageBlockQuery },
  "split-info-list-block": { component: SplitInfoListBlockComponent, schema: splitInfoListBlockSchema, query: splitInfoListBlockQuery },
  "split-cards-item-block": { component: SplitCardsItemBlockComponent, schema: splitCardsItemBlockSchema  },
  "split-info-item-block": { component: SplitInfoItemBlockComponent, schema: splitInfoItemBlockSchema },
  "grid-card-block": { component: GridCardBlockComponent, schema: gridCardBlockSchema, query: gridCardBlockQuery },
  "grid-post-block": { component: GridPostBlockComponent, schema: gridPostBlockSchema, query: gridPostBlockQuery },
  "grid-row-block":{ component: GridRowBlockComponent, schema: gridRowBlockSchema, query: gridRowBlockQuery },
  "pricing-card-block": { component: PricingCardBlockComponent, schema: pricingCardBlockSchema, query: pricingCardBlockQuery },
  "timeline-1-block": { component: Timeline1BlockComponent, schema: timeline1BlockSchema },
  

<<<<<<< Updated upstream
=======
"heading-and-paragraph-centered-block": { component: HeadingAndParagraphCenteredBlockComponent, schema: headingAndParagraphCenteredBlockSchema, query: headingAndParagraphCenteredBlockQuery },
"service-grid-block": { component: ServiceGridBlockComponent, schema: serviceGridBlockSchema, query: serviceGridBlockQuery },
"cover-map-block": { component: CoverMapBlockComponent, schema: coverMapBlockSchema, query: coverMapBlockQuery },
>>>>>>> Stashed changes
  // ADD VALUE 2 ABOVE
};

// Function to return allowed blocks for Sanity
export const getSanityPageBuilderBlocks = () =>
  Object.entries(BlockDataMap)
    .filter(([_, block]) => typeof block.query !== "undefined")
    .map(([blockType]) => ({ type: blockType }));

export const allBlockSchemas = Object.values(BlockDataMap)
  .filter((block) => block.schema !== undefined)
  .map((block) => block.schema);

export const allBlockQueries: string = Object.values(BlockDataMap)
  .filter((block) => block.query !== undefined)
  .map((block) => block.query as string)
  .join("\n");

  
export const pageBuilderQuery = groq`
blocks[]{
  ${allBlockQueries}
},
`;


export default function Blocks({ blocks }: { blocks?: Sanity.Block[] }) {
  if (!blocks) return null;
  return (
    <>
      {blocks.map((block, index) => {
        const key = block._key || index;
        const Component = BlockDataMap[block._type]?.component;
        if (!Component) return <div data-type={block._type} key={key} />;
        return <Component {...block} key={key} />;
      })}
    </>
  );
}
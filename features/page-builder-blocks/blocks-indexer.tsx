import { AllPostsBlockComponent, allPostsBlockQuery, allPostsBlockSchema } from "./blocks/all-posts-block";
import { Carousel1BlockComponent } from "./blocks/carousel-block/carousel-1-block";
import carousel1Query from "./blocks/carousel-block/carousel-1-block/carousel-1.query";
import carousel1Schema from "./blocks/carousel-block/carousel-1-block/carousel-1.schema";
import { Carousel2BlockComponent } from "./blocks/carousel-block/carousel-2-block";
import carousel2Query from "./blocks/carousel-block/carousel-2-block/carousel-2.query";
import carousel2Schema from "./blocks/carousel-block/carousel-2-block/carousel-2.schema";
import { Cta1BlockComponent, cta1BlockQuery, cta1BlockSchema } from "./blocks/cta-blocks/cta-1-block";
import { FAQsBlockComponent, faqsBlockQuery, faqsBlockSchema } from "./blocks/faqs-block";
import { FormNewsletterBlockComponent, formNewsletterBlockQuery, formNewsletterBlockSchema } from "./blocks/form-blocks/newsletter-block";
import { GridCardBlockComponent, gridCardBlockQuery, gridCardBlockSchema } from "./blocks/grid-block/grid-card-block";
import { GridPostBlockComponent, gridPostBlockQuery, gridPostBlockSchema } from "./blocks/grid-block/grid-post-block";
import { GridRowBlockComponent, gridRowBlockQuery, gridRowBlockSchema } from "./blocks/grid-block/grid-row-block";
import { PricingCardBlockComponent, pricingCardBlockQuery, pricingCardBlockSchema } from "./blocks/grid-block/pricing-card-block";
import { Hero1BlockComponent, hero1BlockQuery, hero1BlockSchema } from "./blocks/hero-block/hero-1-block";
import { Hero2BlockComponent, hero2BlockQuery, hero2BlockSchema } from "./blocks/hero-block/hero-2-block";
import { LogoCloud1BlockComponent, logoCloud1BlockQuery, logoCloud1BlockSchema } from "./blocks/logo-cloud-blocks/logo-cloud-1-block";
import { SectionHeaderBlockComponent, sectionHeaderBlockQuery, sectionHeaderBlockSchema } from "./blocks/section-header-block";
import { SplitCardsItemBlockComponent } from "./blocks/split-blocks/split-cards-item-block";
import { SplitCardsListBlockComponent, splitCardsListBlockQuery, splitCardsListBlockSchema } from "./blocks/split-blocks/split-cards-list-block";
import { SplitContentBlockComponent, splitContentBlockQuery, splitContentBlockSchema } from "./blocks/split-blocks/split-content-block";
import { SplitImageBlockComponent, splitImageBlockQuery, splitImageBlockSchema } from "./blocks/split-blocks/split-image-block";
import { SplitInfoItemBlockComponent, splitInfoItemBlockSchema } from "./blocks/split-blocks/split-info-item-block";
import { SplitInfoListBlockComponent, splitInfoListBlockQuery, splitInfoListBlockSchema } from "./blocks/split-blocks/split-info-list-block";
import { SplitRowBlockComponent, splitRowBlockQuery, splitRowBlockSchema } from "./blocks/split-blocks/split-row-block";
import { Timeline1BlockComponent, timeline1BlockSchema } from "./blocks/timeline-blocks/timeline-1-block";
import { TimelineRowBlockComponent, timelineRowBlockQuery, timelineRowBlockSchema } from "./blocks/timeline-blocks/timeline-row-block";

/**
 * A unified mapping that groups each block type with its component,
 * schema (for Sanity), and query (for data fetching).
 */
export const BlockDataMap: {
  [key: string]: {
    component?: React.ComponentType<any>;
    schema?: any;
    query?: string;
  };
} = {
  // Page-level blocks:
  "hero-1-block": { component: Hero1BlockComponent, schema: hero1BlockSchema, query: hero1BlockQuery },
  "hero-2-block": { component: Hero2BlockComponent, schema: hero2BlockSchema, query: hero2BlockQuery },
  "section-header-block": { component: SectionHeaderBlockComponent, schema: sectionHeaderBlockSchema, query: sectionHeaderBlockQuery },
  "split-row-block": { component: SplitRowBlockComponent, schema: splitRowBlockSchema, query: splitRowBlockQuery },
  "carousel-1-block":{ component: Carousel1BlockComponent, schema: carousel1Schema, query: carousel1Query },
  "carousel-2-block": { component: Carousel2BlockComponent, schema: carousel2Schema, query: carousel2Query },
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
  "grid-card-block": { component: GridCardBlockComponent, schema: gridCardBlockSchema, query: gridCardBlockQuery },
  "grid-post-block": { component: GridPostBlockComponent, schema: gridPostBlockSchema, query: gridPostBlockQuery },
  "grid-row-block":{ component: GridRowBlockComponent, schema: gridRowBlockSchema, query: gridRowBlockQuery },
  "pricing-card-block": { component: PricingCardBlockComponent, schema: pricingCardBlockSchema, query: pricingCardBlockQuery },
  "timeline-1-block": { component: Timeline1BlockComponent, schema: timeline1BlockSchema },
  "split-card-block": { component: SplitCardsItemBlockComponent, schema: splitCardsListBlockSchema },
  "split-info-item-block": { component: SplitInfoItemBlockComponent, schema: splitInfoItemBlockSchema },
};

/**
 * A helper function to generate the complete set of block schemas.
 * This output is equivalent to manually writing an object with keys
 * corresponding to each block type and its respective schema.
 */
export const allBlockSchemas = Object.values(BlockDataMap)
  .filter((block) => block.schema !== undefined)
  .map((block) => block.schema);

/**
 * Exporting a constant that contains the concatenated queries from all blocks.
 * Useful for composing GROQ queries in other parts of your code.
 */
export const allBlockQueries: string = Object.values(BlockDataMap)
  .filter((block) => block.query !== undefined)
  .map((block) => block.query as string)
  .join("\n");

/**
 * The Blocks component dynamically renders blocks based on their _type.
 */
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
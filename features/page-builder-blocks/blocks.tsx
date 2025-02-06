// COMPONENT IMPORTS
import AllPostsBlockComponent from "./blocks/all-posts/all-posts.component";
import Cta1BlockComponent from "./blocks/cta/cta-1/cta-1.component";
import FAQsBlockComponent from "./blocks/faqs/faqs.component";
import FormNewsletterBlockComponent from "./blocks/forms/newsletter/newsletter.component";
import GridRowBlockComponent from "./blocks/grid/grid-row/grid-row.component";
import Hero1BlockComponent from "./blocks/hero/hero-1/hero-1.component";
import Hero2BlockComponent from "./blocks/hero/hero-2/hero-2.component";
import LogoCloud1BlockComponent from "./blocks/logo-cloud/logo-cloud-1.component";
import SectionHeaderBlockComponent from "./blocks/section-header/section-header.component";
import SplitRowBlockComponent from "./blocks/split/split-row/split-row.component";
import TimelineRow from "./blocks/timeline/timeline-row/timeline-row.component";
import SplitContentBlockComponent from "./blocks/split/split-content/split-content.component";
import SplitCardsListBlockComponent from "./blocks/split/split-cards-list/split-cards-list.component";
import SplitImageBlockComponent from "./blocks/split/split-image/split-image.component";

import PricingCardBlockComponent from "./blocks/grid/pricing-card/pricing-card.component";
import Timeline1BlockComponent from "./blocks/timeline/timeline-1/timeline-1.component";
import SplitCardsItemBlockComponent from "./blocks/split/split-cards-item/split-cards-item.component";
import SplitInfoItemBlockComponent from "./blocks/split/split-info-item/split-info-item.component";

// ------------------------------
// SCHEMA IMPORTS (using a configured alias, e.g. "./blocks")
import allPostsBlockSchema from "./blocks/all-posts/all-posts.schema";
import carousel1Schema from "./blocks/carousel/carousel-1/carousel-1.schema";
import carousel2Schema from "./blocks/carousel/carousel-2/carousel-2.schema";
import cta1BlockSchema from "./blocks/cta/cta-1/cta-1.schema";
import faqsBlockSchema from "./blocks/faqs/faqs.schema";
import formNewsletterBlockSchema from "./blocks/forms/newsletter/newsletter.schema";
import gridRowBlockSchema from "./blocks/grid/grid-row/grid-row.schema";
import hero1BlockSchema from "./blocks/hero/hero-1/hero-1.schema";
import hero2BlockSchema from "./blocks/hero/hero-2/hero-2.schema";
import logoCloud1BlockSchema from "./blocks/logo-cloud/logo-cloud-1.schema";
import sectionHeaderBlockSchema from "./blocks/section-header/section-header.schema";
import splitRowBlockSchema from "./blocks/split/split-row/split-row.schema";
import timelineRowSchema from "./blocks/timeline/timeline-row/timeline-row.schema";
import splitContentBlockSchema from "./blocks/split/split-content/split-content.schema";
import splitCardsListBlockSchema from "./blocks/split/split-cards-list/split-cards-list.schema";

import splitImageBlockSchema from "./blocks/split/split-image/split-image.schema";
import splitInfoListBlockSchema from "./blocks/split/split-info-list/split-info-list.schema";
import gridCardBlockSchema from "./blocks/grid/grid-card/grid-card.schema";
import gridPostBlockSchema from "./blocks/grid/grid-post/grid-post.schema";
import pricingCardBlockSchema from "./blocks/grid/pricing-card/pricing-card.schema";

import timeline1BlockSchema from "./blocks/timeline/timeline-1/timeline-1.schema";
import splitCardBlockSchema from "./blocks/split/split-cards-item/split-card-item.schema";
import splitInfoItemBlockSchema from "./blocks/split/split-info-item/split-info-item.schema";

// ------------------------------
// QUERY IMPORTS (using a configured alias, e.g. "./blocks")
import allPostsBlockQuery from "./blocks/all-posts/all-posts.query";
import carousel1Query from "./blocks/carousel/carousel-1/carousel-1.query";
import carousel2Query from "./blocks/carousel/carousel-2/carousel-2.query";
import cta1BlockQuery from "./blocks/cta/cta-1/cta-1.query";
import faqsBlockQuery from "./blocks/faqs/faqs.query";
import formNewsletterBlockQuery from "./blocks/forms/newsletter/newsletter.query";
import gridRowBlockQuery from "./blocks/grid/grid-row/grid-row.query";
import hero1BlockQuery from "./blocks/hero/hero-1/hero-1.query";
import hero2BlockQuery from "./blocks/hero/hero-2/hero-2.query";
import logoCloud1BlockQuery from "./blocks/logo-cloud/logo-cloud-1.query";
import sectionHeaderBlockQuery from "./blocks/section-header/section-header.query";
import splitRowBlockQuery from "./blocks/split/split-row/split-row.query";
import splitContentBlockQuery from "./blocks/split/split-content/split-content.query";
import splitCardsListQuery from "./blocks/split/split-cards-list/split-cards-list.query";
import splitImageBlockQuery from "./blocks/split/split-image/split-image.query";
import gridCardQuery from "./blocks/grid/grid-card/grid-card.query";
import gridPostQuery from "./blocks/grid/grid-post/grid-post.query";
import pricingCardBlockQuery from "./blocks/grid/pricing-card/pricing-card.query";
import timelineRowQuery from "./blocks/timeline/timeline-row/timeline-row";
import GridCardBlockComponent from "./blocks/grid/grid-card/grid-card.component";
import GridPostBlockComponent from "./blocks/grid/grid-post/grid-post.component";
import Carousel1BlockComponent from "./blocks/carousel/carousel-1/carousel-1.component";
import Carousel2BlockComponent from "./blocks/carousel/carousel-2/carousel-2.component";
import SplitInfoListBlockComponent from "./blocks/split/split-info-list/split-info-list.component";
import splitInfoListBlockQuery from "./blocks/split/split-info-list/split-info-list.query";
import gridPostBlockQuery from "./blocks/grid/grid-post/grid-post.query";
import gridCardBlockQuery from "./blocks/grid/grid-card/grid-card.query";

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
  "timeline-row-block": { component: TimelineRow, schema: timelineRowSchema, query: timelineRowQuery },
  "cta-1-block": { component: Cta1BlockComponent, schema: cta1BlockSchema, query: cta1BlockQuery },
  "logo-cloud-1-block": { component: LogoCloud1BlockComponent, schema: logoCloud1BlockSchema, query: logoCloud1BlockQuery },
  "faqs-block": { component: FAQsBlockComponent, schema: faqsBlockSchema, query: faqsBlockQuery },
  "form-newsletter-block": { component: FormNewsletterBlockComponent, schema: formNewsletterBlockSchema, query: formNewsletterBlockQuery },
  "all-posts-block": { component: AllPostsBlockComponent, schema: allPostsBlockSchema, query: allPostsBlockQuery },
  "split-content-block": { component: SplitContentBlockComponent, schema: splitContentBlockSchema, query: splitContentBlockQuery },
  "split-cards-list-block": { component: SplitCardsListBlockComponent, schema: splitCardsListBlockSchema, query: splitCardsListQuery },
  "split-image-block": { component: SplitImageBlockComponent, schema: splitImageBlockSchema, query: splitImageBlockQuery },
  "split-info-list-block": { component: SplitInfoListBlockComponent, schema: splitInfoListBlockSchema, query: splitInfoListBlockQuery },
  "grid-card-block": { component: GridCardBlockComponent, schema: gridCardBlockSchema, query: gridCardBlockQuery },
  "grid-post-block": { component: GridPostBlockComponent, schema: gridPostBlockSchema, query: gridPostBlockQuery },
  "grid-row-block":{ component: GridRowBlockComponent, schema: gridRowBlockSchema, query: gridRowBlockQuery },
  "pricing-card-block": { component: PricingCardBlockComponent, schema: pricingCardBlockSchema, query: pricingCardBlockQuery },
  "timeline-1-block": { component: Timeline1BlockComponent, schema: timeline1BlockSchema },
  "split-card-block": { component: SplitCardsItemBlockComponent, schema: splitCardBlockSchema },
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
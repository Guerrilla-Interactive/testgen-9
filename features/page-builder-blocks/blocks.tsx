import { Fragment } from "react";

// COMPONENT IMPORTS
import AllPosts from "./blocks/all-posts/all-posts.component";
import Carousel1 from "./blocks/carousel/carousel-1/carousel-1.component";
import Carousel2 from "./blocks/carousel/carousel-2/carousel-2.component";
import Cta1 from "./blocks/cta/cta-1/cta-1.component";
import FAQs from "./blocks/faqs/faqs.component";
import FormNewsletter from "./blocks/forms/newsletter/newsletter.component";
import GridRow from "./blocks/grid/grid-row/grid-row.component";
import Hero1 from "./blocks/hero/hero-1/hero-1.component";
import Hero2 from "./blocks/hero/hero-2/hero-2.component";
import LogoCloud1 from "./blocks/logo-cloud/logo-cloud-1.component";
import SectionHeader from "./blocks/section-header/section-header.component";
import SplitRow from "./blocks/split/split-row/split-row.component";
import TimelineRow from "./blocks/timeline/timeline-row/timeline-row.component";
import SplitContent from "./blocks/split/split-content/split-content.component";
import SplitCardsList from "./blocks/split/split-cards-list/split-cards-list.component";
import SplitImage from "./blocks/split/split-image/split-image.component";
import SplitInfoList from "./blocks/split/split-info-list/split-info-list.component";
import GridCard from "./blocks/grid/grid-card/grid-card.component";
import GridPost from "./blocks/grid/grid-post/grid-post.component";
import PricingCard from "./blocks/grid/pricing-card/pricing-card.component";
import Timeline1 from "./blocks/timeline/timeline-1/timeline-1.component";
import SplitCard from "./blocks/split/split-cards-item/split-cards-item.component";
import SplitInfo from "./blocks/split/split-info-item/split-info-item.component";

// ------------------------------
// SCHEMA IMPORTS (using a configured alias, e.g. "./blocks")
import allPostsSchema from "./blocks/all-posts/all-posts.schema";
import carousel1Schema from "./blocks/carousel/carousel-1/carousel-1.schema";
import carousel2Schema from "./blocks/carousel/carousel-2/carousel-2.schema";
import cta1Schema from "./blocks/cta/cta-1/cta-1.schema";
import faqsSchema from "./blocks/faqs/faqs.schema";
import formNewsletterSchema from "./blocks/forms/newsletter/newsletter.schema";
import gridRowSchema from "./blocks/grid/grid-row/grid-row.schema";
import hero1Schema from "./blocks/hero/hero-1/hero-1.schema";
import hero2Schema from "./blocks/hero/hero-2/hero-2.schema";
import logoCloud1Schema from "./blocks/logo-cloud/logo-cloud-1.schema";
import sectionHeaderSchema from "./blocks/section-header/section-header.schema";
import splitRowSchema from "./blocks/split/split-row/split-row.schema";
import timelineRowSchema from "./blocks/timeline/timeline-row/timeline-row.schema";
import splitContent from "./blocks/split/split-content/split-content.schema";
import splitCardsList from "./blocks/split/split-cards-list/split-cards-list.schema";
import splitImage from "./blocks/split/split-image/split-image.schema";
import splitInfoList from "./blocks/split/split-info-list/split-info-list.schema";
import gridCard from "./blocks/grid/grid-card/grid-card.schema";
import gridPost from "./blocks/grid/grid-post/grid-post.schema";
import pricingCard from "./blocks/grid/pricing-card/pricing-card.schema";
import timeline1 from "./blocks/timeline/timeline-1/timeline-1.schema";
import splitCard from "./blocks/split/split-cards-item/split-card-item.schema";
import splitInfo from "./blocks/split/split-info-item/split-info-item.schema";

// ------------------------------
// QUERY IMPORTS (using a configured alias, e.g. "./blocks")
import allPostsQuery from "./blocks/all-posts/all-posts.query";
import carousel1Query from "./blocks/carousel/carousel-1/carousel-1.query";
import carousel2Query from "./blocks/carousel/carousel-2/carousel-2.query";
import cta1Query from "./blocks/cta/cta-1/cta-1.query";
import faqsQuery from "./blocks/faqs/faqs.query";
import formNewsletterQuery from "./blocks/forms/newsletter/newsletter.query";
import gridRowQuery from "./blocks/grid/grid-row/grid-row.query";
import hero1Query from "./blocks/hero/hero-1/hero-1.query";
import hero2Query from "./blocks/hero/hero-2/hero-2.query";
import logoCloud1Query from "./blocks/logo-cloud/logo-cloud-1.query";
import sectionHeaderQuery from "./blocks/section-header/section-header.query";
import splitRowQuery from "./blocks/split/split-row/split-row.query";
import splitContentQuery from "./blocks/split/split-content/split-content.query";
import splitCardsListQuery from "./blocks/split/split-cards-list/split-cards-list.query";
import splitImageQuery from "./blocks/split/split-image/split-image.query";
import splitInfoListQuery from "./blocks/split/split-info-list/split-info-list.query";
import gridCardQuery from "./blocks/grid/grid-card/grid-card.query";
import gridPostQuery from "./blocks/grid/grid-post/grid-post.query";
import pricingCardQuery from "./blocks/grid/pricing-card/pricing-card.query";
import timelineRowQuery from "./blocks/timeline/timeline-row/timeline-row";

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
  "hero-1": { component: Hero1, schema: hero1Schema, query: hero1Query },
  "hero-2": { component: Hero2, schema: hero2Schema, query: hero2Query },
  "section-header": { component: SectionHeader, schema: sectionHeaderSchema, query: sectionHeaderQuery },
  "split-row": { component: SplitRow, schema: splitRowSchema, query: splitRowQuery },
  "grid-row": { component: GridRow, schema: gridRowSchema, query: gridRowQuery },
  "carousel-1": { component: Carousel1, schema: carousel1Schema, query: carousel1Query },
  "carousel-2": { component: Carousel2, schema: carousel2Schema, query: carousel2Query },
  "timeline-row": { component: TimelineRow, schema: timelineRowSchema, query: timelineRowQuery },
  "cta-1": { component: Cta1, schema: cta1Schema, query: cta1Query },
  "logo-cloud-1": { component: LogoCloud1, schema: logoCloud1Schema, query: logoCloud1Query },
  "faqs": { component: FAQs, schema: faqsSchema, query: faqsQuery },
  "form-newsletter": { component: FormNewsletter, schema: formNewsletterSchema, query: formNewsletterQuery },
  "all-posts": { component: AllPosts, schema: allPostsSchema, query: allPostsQuery },
  "split-content": { component: SplitContent, schema: splitContent, query: splitContentQuery },
  "split-cards-list": { component: SplitCardsList, schema: splitCardsList, query: splitCardsListQuery },
  "split-image": { component: SplitImage, schema: splitImage, query: splitImageQuery },
  "split-info-list": { component: SplitInfoList, schema: splitInfoList, query: splitInfoListQuery },
  "grid-card": { component: GridCard, schema: gridCard, query: gridCardQuery },
  "grid-post": { component: GridPost, schema: gridPost, query: gridPostQuery },
  "pricing-card": { component: PricingCard, schema: pricingCard, query: pricingCardQuery },
  "timeline-1": { component: Timeline1, schema: timeline1 },
  "split-card": { component: SplitCard, schema: splitCard },
  "split-info": { component: SplitInfo, schema: splitInfo },
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
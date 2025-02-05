import type { SchemaTypeDefinition } from "sanity";
// documents
import page from "./schemas/documents/page";
import post from "./schemas/documents/post";
import author from "./schemas/documents/author";
import category from "./schemas/documents/category";
import faq from "./schemas/documents/faq";
import testimonial from "./schemas/documents/testimonial";

// Schema UI shared objects
import blockContent from "../features/page-builder-blocks/shared/shared-schemas/block-content";
import link from "../features/page-builder-blocks/shared/shared-schemas/link";
import { colorVariant } from "../features/page-builder-blocks/shared/shared-schemas/color-variant";
import { buttonVariant } from "../features/page-builder-blocks/shared/shared-schemas/button-variant";
import sectionPadding from "../features/page-builder-blocks/shared/shared-schemas/section-padding";

// Schema UI objects (imported from feature-based component folders)
import hero1 from "@/features/page-builder-blocks/blocks/hero/hero-1/hero-1.schema";
import hero2 from "@/features/page-builder-blocks/blocks/hero/hero-2/hero-2.schema";
import sectionHeader from "@/features/page-builder-blocks/blocks/section-header/section-header.schema";
import splitRow from "@/features/page-builder-blocks/blocks/split/split-row/split-row.schema";
import splitContent from "@/features/page-builder-blocks/blocks/split/split-content/split-content.schema";
import splitCardsList from "@/features/page-builder-blocks/blocks/split/split-cards-list/split-cards-list.schema";
import splitCard from "@/features/page-builder-blocks/blocks/split/split-cards-item/split-card-item.schema";
import splitImage from "@/features/page-builder-blocks/blocks/split/split-image/split-image.schema";
import splitInfoList from "@/features/page-builder-blocks/blocks/split/split-info-list/split-info-list.schema";
import splitInfo from "@/features/page-builder-blocks/blocks/split/split-info-item/split-info-item.schema";
import gridCard from "@/features/page-builder-blocks/blocks/grid/grid-card/grid-card.schema";
import pricingCard from "@/features/page-builder-blocks/blocks/grid/pricing-card/pricing-card.schema";
import gridPost from "@/features/page-builder-blocks/blocks/grid/grid-post/grid-post.schema";
import gridRow from "@/features/page-builder-blocks/blocks/grid/grid-row/grid-row.schema";
import carousel1 from "@/features/page-builder-blocks/blocks/carousel/carousel-1/carousel-1.schema";
import carousel2 from "@/features/page-builder-blocks/blocks/carousel/carousel-2/carousel-2.schema";
import timelineRow from "@/features/page-builder-blocks/blocks/timeline/timeline-row/timeline-row.schema";
import timeline1 from "@/features/page-builder-blocks/blocks/timeline/timeline-1/timeline-1.schema";
import cta1 from "@/features/page-builder-blocks/blocks/cta/cta-1/cta-1.schema";
import logoCloud1 from "@/features/page-builder-blocks/blocks/logo-cloud/logo-cloud-1.schema";
import faqs from "@/features/page-builder-blocks/blocks/faqs/faqs.schema";
import newsletter from "@/features/page-builder-blocks/blocks/forms/newsletter/newsletter.schema";
import allPosts from "@/features/page-builder-blocks/blocks/all-posts/all-posts.schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // documents
    page,
    post,
    author,
    category,
    faq,
    testimonial,
    // shared objects
    blockContent,
    link,
    colorVariant,
    buttonVariant,
    sectionPadding,
    // blocks
    hero1,
    hero2,
    sectionHeader,
    splitRow,
    splitContent,
    splitCardsList,
    splitCard,
    splitImage,
    splitInfoList,
    splitInfo,
    gridCard,
    pricingCard,
    gridPost,
    gridRow,
    carousel1,
    carousel2,
    timelineRow,
    timeline1,
    cta1,
    logoCloud1,
    faqs,
    newsletter,
    allPosts,
  ],
};

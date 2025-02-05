import { type SchemaTypeDefinition } from "sanity";
// documents
import page from "./schemas/documents/page";
import post from "./schemas/documents/post";
import author from "./schemas/documents/author";
import category from "./schemas/documents/category";
import faq from "./schemas/documents/faq";
import testimonial from "./schemas/documents/testimonial";

// Schema UI shared objects
import blockContent from "./schemas/blocks/shared/block-content";
import link from "./schemas/blocks/shared/link";
import { colorVariant } from "./schemas/blocks/shared/color-variant";
import { buttonVariant } from "./schemas/blocks/shared/button-variant";
import sectionPadding from "./schemas/blocks/shared/section-padding";

// Schema UI objects (imported from feature-based component folders)
// Hero components
import hero1 from "@/components/ui/hero/hero-1/hero-1.schema";
import hero2 from "@/components/ui/hero/hero-2/hero-2.schema";
// Section Header
import sectionHeader from "@/components/ui/section-header/section-header.schema";
// Split blocks
import splitRow from "@/components/ui/split/split-row/split-row.schema";
import splitContent from "@/components/ui/split/split-content/split-content.schema";
import splitCardsList from "@/components/ui/split/split-cards-list/split-cards-list.schema";
import splitCard from "@/components/ui/split/split-cards-item/split-card-item.schema";
import splitImage from "@/components/ui/split/split-image/split-image.schema";
import splitInfoList from "@/components/ui/split/split-info-list/split-info-list.schema";
import splitInfo from "@/components/ui/split/split-info-item/split-info-item.schema";
// Grid components
import gridCard from "@/components/ui/grid/grid-card/grid-card.schema";
import pricingCard from "@/components/ui/grid/pricing-card/pricing-card.schema";
import gridPost from "@/components/ui/grid/grid-post/grid-post.schema";
import gridRow from "@/components/ui/grid/grid-row/grid-row.schema";
// Carousel components
import carousel1 from "@/components/ui/carousel/carousel-1/carousel-1.schema";
import carousel2 from "@/components/ui/carousel/carousel-2/carousel-2.schema";
// Timeline components
import timelineRow from "@/components/ui/timeline/timeline-row/timeline-row.schema";
import timeline1 from "@/components/ui/timeline/timeline-1/timeline-1.schema";
// CTA
import cta1 from "@/components/ui/cta/cta-1/cta-1.schema";
// Logo Cloud
import logoCloud1 from "@/components/ui/logo-cloud/logo-cloud-1.schema";
// FAQs
import faqs from "@/components/ui/faqs/faqs.schema";
// Newsletter
import newsletter from "@/components/ui/forms/newsletter/newsletter.schema";
// All Posts
import allPosts from "@/components/ui/all-posts/all-posts.schema";

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

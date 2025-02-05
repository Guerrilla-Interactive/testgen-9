import { allPostsQuery } from "@/features/page-builder-blocks/blocks/all-posts/all-posts.query";
import { carousel1Query } from "@/features/page-builder-blocks/blocks/carousel/carousel-1/carousel-1.query";
import { carousel2Query } from "@/features/page-builder-blocks/blocks/carousel/carousel-2/carousel-2.query";
import { cta1Query } from "@/features/page-builder-blocks/blocks/cta/cta-1/cta-1.query";
import { faqsQuery } from "@/features/page-builder-blocks/blocks/faqs/faqs.query";
import { formNewsletterQuery } from "@/features/page-builder-blocks/blocks/forms/newsletter/newsletter.query";
import { gridRowQuery } from "@/features/page-builder-blocks/blocks/grid/grid-row/grid-row.query";
import { hero1Query } from "@/features/page-builder-blocks/blocks/hero/hero-1/hero-1.query";
import { hero2Query } from "@/features/page-builder-blocks/blocks/hero/hero-2/hero-2.query";
import { logoCloud1Query } from "@/features/page-builder-blocks/blocks/logo-cloud/logo-cloud-1.query";
import { sectionHeaderQuery } from "@/features/page-builder-blocks/blocks/section-header/section-header.query";
import { splitRowQuery } from "@/features/page-builder-blocks/blocks/split/split-row/split-row.query";
import { timelineQuery } from "@/features/page-builder-blocks/blocks/timeline/timeline";
import { groq } from "next-sanity";





export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    blocks[]{
      ${hero1Query}
      ${hero2Query}
      ${sectionHeaderQuery}
      ${splitRowQuery}
      ${gridRowQuery}
      ${carousel1Query}
      ${carousel2Query}
      ${timelineQuery}
      ${cta1Query}
      ${logoCloud1Query}
      ${faqsQuery}
      ${formNewsletterQuery}
      ${allPostsQuery}
    },
    meta_title,
    meta_description,
    noindex,
    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
    }
  }
`;

export const PAGES_SLUGS_QUERY = groq`*[_type == "page" && defined(slug)]{slug}`;

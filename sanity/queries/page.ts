import { groq } from "next-sanity";

import { carousel1Query } from "@/components/ui/carousel/carousel-1/carousel-1.query";
import { carousel2Query } from "@/components/ui/carousel/carousel-2/carousel-2.query";
import { hero1Query } from "@/components/ui/hero/hero-1/hero-1.query";
import { hero2Query } from "@/components/ui/hero/hero-2/hero-2.query";
import { sectionHeaderQuery } from "@/components/ui/section-header/section-header.query";
import { splitRowQuery } from "@/components/ui/split/split-row/split-row.query";
import { gridRowQuery } from "@/components/ui/grid/grid-row/grid-row.query";
import { timelineQuery } from "@/components/ui/timeline/timeline";
import { cta1Query } from "@/components/ui/cta/cta-1/cta-1.query";
import { logoCloud1Query } from "@/components/ui/logo-cloud/logo-cloud-1.query";
import { faqsQuery } from "@/components/ui/faqs/faqs.query";
import { formNewsletterQuery } from "@/components/ui/forms/newsletter/newsletter.query";
import { allPostsQuery } from "@/components/ui/all-posts/all-posts.query";



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

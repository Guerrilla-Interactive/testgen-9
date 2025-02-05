import { groq } from "next-sanity";
import { hero1Query } from "./hero/hero-1";
import { hero2Query } from "./hero/hero-2";
import { sectionHeaderQuery } from "./section-header";
import { splitRowQuery } from "./split/split-row";
import { gridRowQuery } from "./grid/grid-row";
import { timelineQuery } from "./timeline";
import { cta1Query } from "./cta/cta-1";
import { logoCloud1Query } from "./logo-cloud/logo-cloud-1";
import { faqsQuery } from "./faqs";
import { formNewsletterQuery } from "./forms/newsletter";
import { allPostsQuery } from "./all-posts";
import { carousel1Query } from "@/components/ui/carousel/carousel-1/carousel-1.query";
import { carousel2Query } from "@/components/ui/carousel/carousel-2/carousel-2.query";

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

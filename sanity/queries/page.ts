import { groq } from "next-sanity";
// Import the aggregated block queries (an object mapping block type keys to query strings)
import { allBlockQueries } from "@/features/page-builder-blocks/blocks";

// Import any additional query fragments not part of the mapping (e.g. timeline query)




export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    blocks[]{
      ${allBlockQueries}
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

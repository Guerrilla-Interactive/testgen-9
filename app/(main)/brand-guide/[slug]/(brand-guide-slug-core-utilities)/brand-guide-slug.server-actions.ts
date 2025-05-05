

import { sanityFetch } from "@/sanity/lib/live";
  

import { GET_ALL_BRAND_GUIDE_SLUGS_QUERY, GET_BRAND_GUIDE_BY_ROUTE_QUERY, GET_BRAND_GUIDE_BY_SLUG_QUERY } from "./brand-guide-slug.route-query";


// Fetch a full Course using its slug
export const fetchSanityBrandGuideBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<GET_BRAND_GUIDE_BY_ROUTE_QUERYResult> => {
  const { data } = await sanityFetch({
    query: GET_BRAND_GUIDE_BY_ROUTE_QUERY,
    params: { slug },
  });
  return data;
}

// Fetch all Course slugs for static params generation
export const fetchSanityBrandGuideStaticParams = async (): Promise<GET_ALL_BRAND_GUIDE_SLUGS_QUERYResult[]> => {
  const { data } = await sanityFetch({
    query: GET_ALL_BRAND_GUIDE_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

  export const fetchSanityBrandGuides = async (): Promise<GET_ALL_BRAND_GUIDE_SLUGS_QUERYResult[]> => {
  const { data } = await sanityFetch({
    query: GET_ALL_BRAND_GUIDE_SLUGS_QUERY,
  });
  return data;
}

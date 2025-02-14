"use server";

import { sanityFetch } from "@/sanity/lib/live";

import { GET_ALL_SERVICE_SLUGS_QUERY, GET_SERVICE_BY_SLUG_QUERY } from "./service-slug.route-query";

// Fetch a full Service using its slug
export async function fetchSanityServiceBySlug({
  slug,
}: {
  slug: string;
}): Promise<Sanity.Page> {
  const { data } = await sanityFetch({
    query: GET_SERVICE_BY_SLUG_QUERY,
    params: { slug },
  });
  return data;
}

// Fetch all Service slugs for static params generation
export async function fetchSanityServiceStaticParams(): Promise<Sanity.Page[]> {
  const { data } = await sanityFetch({
    query: GET_ALL_SERVICE_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function fetchSanityServices() {
  const { data } = await sanityFetch({
    query: GET_ALL_SERVICE_SLUGS_QUERY,
  });
  return data;
}

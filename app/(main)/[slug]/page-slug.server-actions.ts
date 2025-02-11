"use server";

import { sanityFetch } from "@/sanity/lib/live";
import { GET_ALL_PAGES_QUERY, GET_PAGES_BY_SLUG_QUERY } from "./page-slug.route-query";


// Fetch a full blog post using its slug
export async function fetchSanityPageBySlug({
    slug,
  }: {
    slug: string;
  }): Promise<Sanity.Page> {
    const { data } = await sanityFetch({
      query: GET_PAGES_BY_SLUG_QUERY,
      params: { slug },
    });
    return data;
  }
  
  // Fetch all blog slugs for static params generation
  export async function fetchSanityPagesStaticParams(): Promise<Sanity.Page[]> {
    const { data } = await sanityFetch({
      query: GET_ALL_PAGES_QUERY,
      perspective: "published",
      stega: false,
    });
    return data;
  }
  
  export async function fetchSanityPage() {
    const { data } = await sanityFetch({
      query: GET_ALL_PAGES_QUERY,
    });
    return data;
  }
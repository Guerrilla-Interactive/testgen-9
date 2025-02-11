"use server";

import { sanityFetch } from "@/sanity/lib/live";


import { GET_ALL_BLOG_SLUGS_QUERY, GET_BLOG_SLUG_QUERY } from "./blog-slug.route-query";

// Fetch a full blog post using its slug
export async function fetchSanityBlogSlugBySlug({
    slug,
  }: {
    slug: string;
  }): Promise<Sanity.Post> {
    const { data } = await sanityFetch({
      query: GET_BLOG_SLUG_QUERY,
      params: { slug },
    });
    return data;
  }
  
  // Fetch all blog slugs for static params generation
  export async function fetchSanityBlogSlugsStaticParams(): Promise<Sanity.Post[]> {
    const { data } = await sanityFetch({
      query: GET_ALL_BLOG_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });
    return data;
  }
  
  export async function fetchSanityBlogSlugs() {
    const { data } = await sanityFetch({
      query: GET_ALL_BLOG_SLUGS_QUERY,
    });
    return data;
  }
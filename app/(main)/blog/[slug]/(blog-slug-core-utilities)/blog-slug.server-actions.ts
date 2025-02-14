"use server";

import { sanityFetch } from "@/sanity/lib/live";

import { GET_ALL_BLOG_SLUGS_QUERY, GET_BLOG_POST_QUERY } from "./blog-slug.route-query";

// Fetch a full blog post using its slug
export async function fetchSanityBlogPostBySlug({
    slug,
  }: {
    slug: string;
  }): Promise<Sanity.Post> {
    const { data } = await sanityFetch({
      query: GET_BLOG_POST_QUERY,
      params: { slug },
    });
    return data;
  }
  
  // Fetch all blog slugs for static params generation
  export async function fetchSanityBlogPostsStaticParams(): Promise<Sanity.Post[]> {
    const { data } = await sanityFetch({
      query: GET_ALL_BLOG_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });
    return data;
  }
  
  export async function fetchSanityBlogPosts() {
    const { data } = await sanityFetch({
      query: GET_ALL_BLOG_SLUGS_QUERY,
    });
    return data;
  }
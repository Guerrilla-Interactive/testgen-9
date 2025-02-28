import { getAuthorReferenceQuery } from "@/sanity/desk-organized-sanity-utilities/author/author.document-queries";
import { groq } from "next-sanity";

export const GET_BLOG_PAGES_BY_DEFINED_SLUG_QUERY = groq`*[_type == "blog-slug" && defined(slug)] | order(_createdAt desc){
    title,
    slug,
    excerpt,
}`;

export const GET_ALL_BLOG_PAGES_QUERY = groq`*[_type == "blog-slug" && defined(slug)]{slug}`;

export const GET_BLOG_PAGE_BY_ROUTE_QUERY = groq`*[_type == "blog-slug" && slug.current == $slug][0]{
  title,
  slug,
  _createdAt,
  _updatedAt,
}`;

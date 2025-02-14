import { getAuthorReferenceQuery } from "@/sanity/desk-organized-sanity-utilities/author/author.document-queries";
import { groq } from "next-sanity";

export const GET_BLOG_POST_BY_SLUG_QUERY = groq`*[_type == "blog-slug" && defined(slug)] | order(_createdAt desc){
    title,
    slug,
    excerpt,
}`;

export const GET_ALL_BLOG_SLUGS_QUERY = groq`*[_type == "blog-slug" && defined(slug)]{slug}`;

export const GET_BLOG_POST_QUERY = groq`*[_type == "blog-slug" && slug.current == $slug][0]{
  title,
  slug,
  _createdAt,
  _updatedAt,
}`;

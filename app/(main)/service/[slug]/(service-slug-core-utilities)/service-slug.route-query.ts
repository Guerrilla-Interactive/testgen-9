import { groq } from "next-sanity";

export const GET_SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "service-slug" && defined(slug)] | order(_createdAt desc){
    title,
    slug,
    excerpt,
    featuredImage,
  }
`;

export const GET_ALL_SERVICE_SLUGS_QUERY = groq`
  *[_type == "service-slug" && defined(slug)]{
    slug
  }
`;

export const GET_SERVICE_POST_QUERY = groq`
  *[_type == "service-slug" && slug.current == $slug][0]{
    title,
    slug,
    _createdAt,
    _updatedAt,
    featuredImage,
  }
`;

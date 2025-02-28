import { groq } from "next-sanity";

export const GET_COURSE_PAGE_BY_DEFINED_SLUG_QUERY = groq`
  *[_type == "course-slug" && defined(slug)] | order(_createdAt desc){
    title,
    slug,
    excerpt,
  }
`;

export const GET_ALL_COURSE_PAGES_QUERY = groq`
  *[_type == "course-slug" && defined(slug)]{
    slug
  }
`;

export const GET_COURSE_PAGE_BY_ROUTE_QUERY = groq`
  *[_type == "course-slug" && slug.current == $slug][0]{
    title,
    slug,
    _createdAt,
    _updatedAt,
  }
`;

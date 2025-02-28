import { ImageQuery } from "@/features/unorganized-components/image-component/image.component";
import { imageQuery } from "@/features/unorganized-components/image-component/image.query";
import { groq } from "next-sanity";

export const GET_SERVICE_PAGE_BY_DEFINED_SLUG_QUERY = groq`*[_type == "service-slug" && defined(slug)] | order(_createdAt desc){
    title,
    slug,
    excerpt,
    featuredImage{
      ${imageQuery}
    },
  }
`;

export const GET_ALL_SERVICE_PAGES_QUERY = groq`
  *[_type == "service-slug" && defined(slug)]{
    slug
  }
`;

export const GET_SERVICE_PAGE_BY_ROUTE_QUERY = groq`
  *[_type == "service-slug" && slug.current == $slug][0]{
    title,
    slug,
    _createdAt,
    _updatedAt,
    featuredImage{
      ${imageQuery}
    },
  }
`;

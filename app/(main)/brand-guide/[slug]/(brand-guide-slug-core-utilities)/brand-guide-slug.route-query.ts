import { imageQuery } from "@/features/unorganized-components/image-component/image.query";
import { getAllFaqCategoriesQuery } from "@/sanity/desk-organized-sanity-utilities/faq-category/faq-category.document-queries";
import { getAllReferencedFaqsQuery } from "@/sanity/desk-organized-sanity-utilities/faq/faq.document-queries";
import { groq } from "next-sanity";

export const GET_BRAND_GUIDE_BY_SLUG_QUERY = groq`
  *[_type == "brand-guide-slug" && slug.current == $slug][0]{
    title,
    slug,
    excerpt,
    brandGuideline->{
      ...,
    }
  }
`;

export const GET_ALL_BRAND_GUIDE_SLUGS_QUERY = groq`
  *[_type == "brand-guide-slug" && defined(slug)]{
    slug
  }
`;

export const GET_BRAND_GUIDE_BY_ROUTE_QUERY = groq`
  *[_type == "brand-guide-slug" && slug.current == $slug][0]{
    title,
    slug,
    brandGuideline->{
      ...,
    }
  }
`;

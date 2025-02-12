import { getAuthorReferenceQuery } from "@/sanity/desk-organized-sanity-utilities/author/author.document-queries";
import { groq } from "next-sanity";

export const GET_BLOG_POST_BY_SLUG_QUERY = groq`*[_type == "blog-slug" && defined(slug)] | order(_createdAt desc){
    title,
    slug,
    excerpt,
    image{
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
}`;

export const GET_ALL_BLOG_SLUGS_QUERY = groq`*[_type == "blog-slug" && defined(slug)]{slug}`;

export const GET_BLOG_POST_QUERY = groq`*[_type == "blog-slug" && slug.current == $slug][0]{
  title,
  slug,
  image{
    asset->{
      _id,
      url,
      mimeType,
      metadata {
        lqip,
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      }
    }
  },
  ${getAuthorReferenceQuery}
  _createdAt,
  _updatedAt,
  meta_title,
  meta_description,
  noindex,
  ogImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
  }
}`;

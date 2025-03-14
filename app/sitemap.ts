import type { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

async function getPagesSitemap(): Promise<MetadataRoute.Sitemap[]> {
  const pageQuery = groq`
    *[_type == 'page-slug'] | order(slug.current) {
      'url': $baseUrl + select(slug.current == 'index' => '', '/' + slug.current),
      'lastModified': _updatedAt,
      'changeFrequency': 'daily',
      'priority': select(
        slug.current == 'index' => 1,
        0.5
      )
    }
  `;

  const { data } = await sanityFetch({
    query: pageQuery,
    params: {
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
    },
  });

  return data;
}

async function getPostsSitemap(): Promise<MetadataRoute.Sitemap[]> {
  const blogQuery = groq`
    *[_type == 'blog-slug'] | order(_updatedAt desc) {
      'url': $baseUrl + '/blog/' + slug.current,
      'lastModified': _updatedAt,
      'changeFrequency': 'weekly',
      'priority': 0.7
    }
  `;

  const { data } = await sanityFetch({
    query: blogQuery,
    params: {
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
    },
  });

  return data;
}








// services

async function getServicesSitemap(): Promise<MetadataRoute.Sitemap[]> {
  const servicesQuery = groq`
    *[_type == 'service-slug'] | order(_updatedAt desc) {
      'url': $baseUrl + '/tjenester/' + slug.current,
      'lastModified': _updatedAt, 
      'changeFrequency': 'weekly',
      'priority': 0.7
    }
  `;

  const { data } = await sanityFetch({
    query: servicesQuery, 
    params: {
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
    },
  });

  return data;
}


// courses

async function getCoursesSitemap(): Promise<MetadataRoute.Sitemap[]> {
  const coursesQuery = groq`
    *[_type == 'course-slug'] | order(_updatedAt desc) {
      'url': $baseUrl + '/kurs/' + slug.current,
      'lastModified': _updatedAt,
      'changeFrequency': 'weekly',
      'priority': 0.7
    }
  `;

  const { data } = await sanityFetch({
    query: coursesQuery,
    params: {
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
    },
  });

  return data;
}














export default async function sitemap(): Promise<MetadataRoute.Sitemap[]> {
  const [pages,  services, courses] = await Promise.all([
    getPagesSitemap(),
    
    getServicesSitemap(),
    getCoursesSitemap(),
  ]);

  return [...pages,  ...services, ...courses];
}

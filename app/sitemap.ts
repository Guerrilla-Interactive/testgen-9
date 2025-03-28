import type { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

async function getPagesSitemap(): Promise<MetadataRoute.Sitemap[]> {



  
  const pageQuery = groq`
    *[_type == 'page-slug'] | order(slug.current) {
      'url': $baseUrl + select('/' + slug.current),
      'lastModified': _updatedAt,
      'changeFrequency': 'daily',
      'priority': select(
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



async function getFrontPage(): Promise<MetadataRoute.Sitemap> {
  const frontPage = groq`*[_type == "siteSettings"][0].frontPage->{
    'url': $baseUrl + '',
    'lastModified': _updatedAt,
    'changeFrequency': 'daily',
    'priority': 1
  }`;

  const { data } = await sanityFetch({
    query: frontPage,
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
  const [ frontPage, pages,  services, courses,] = await Promise.all([
    getFrontPage(),
    getPagesSitemap(),
    getServicesSitemap(),
    getCoursesSitemap(),
    
  ]);

  return [ frontPage,  ...pages,   ...services, ...courses,];
}

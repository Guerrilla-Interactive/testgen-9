import {
  defineLocations,
  defineDocuments,
  PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    // Add more locations for other post types
    post: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          // top level
          {
            title: doc?.title || "Untitled",
            href: `/${doc?.slug}`,
          },
          {
            title: doc?.title || "Untitled",
            href: `/blog/${doc?.slug}`,
          },

        
        
          { title: "Blog", href: `/blog` },

          { title: "Service", href: `/tjenester/${doc?.slug}` },
          { title: "Services", href: `/tjenester` },
        ],
      }),
    }),
  },
  mainDocuments: defineDocuments([
    {
      route: "/:slug",
      filter: `_type == 'page-slug' && slug.current == $slug`,
    },  
    {
      route: "/blog/:slug",
      filter: `_type == 'blog-slug' && slug.current == $slug`,
    },
    {
      route: "/tjenester/:slug",
      filter: `_type == 'service-slug' && slug.current == $slug`,
    },
  ]),
};

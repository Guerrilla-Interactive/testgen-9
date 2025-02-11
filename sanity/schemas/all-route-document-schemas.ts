import pageSlugSchema from "@/app/(main)/[slug]/page-slug.route-schema";
import blogSlugSchema from "@/app/(main)/blog/[slug]/(blog-slug-core-utilities)/blog-slug.route-schema";

const routeDocumentSchemas = {
  pageSlugSchema,
  blogSlugSchema,
};

export const allRouteDocumentSchemas = Object.values(routeDocumentSchemas);

export const ROUTE_DOCUMENT_SCHEMA_TYPES = allRouteDocumentSchemas.map((schema) => schema.name);

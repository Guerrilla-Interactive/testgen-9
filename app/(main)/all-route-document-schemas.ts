import pageSlugSchema from "@/app/(main)/(root)/[slug]/page-slug.route-schema";
import blogSlugSchema from "@/app/(main)/blog/[slug]/(blog-slug-core-utilities)/blog-slug.route-schema";

import serviceSlugSchema from "@/app/(main)/service/[slug]/(service-slug-core-utilities)/service-slug.route-schema";
import courseSlugSchema from "@/app/(main)/course/[slug]/(course-slug-core-utilities)/course-slug.route-schema";
import brandGuideSlugSchema from "@/app/(main)/brand-guide/[slug]/(brand-guide-slug-core-utilities)/brand-guide-slug.route-schema";
// ADD VALUE 1 ABOVE

const routeDocumentSchemas = {
  pageSlugSchema, // dependent on allBlockSchemas
  blogSlugSchema,
  serviceSlugSchema,
  courseSlugSchema,
  brandGuideSlugSchema,
  // ADD VALUE 2 ABOVE
};

export const allRouteDocumentSchemas = Object.values(routeDocumentSchemas);

export const ROUTE_DOCUMENT_SCHEMA_TYPES = allRouteDocumentSchemas.map((schema) => schema.name);

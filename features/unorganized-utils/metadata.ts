import { GET_PAGE_BY_DEFINED_SLUG_QUERYResult, GET_BLOG_PAGE_BY_ROUTE_QUERYResult, GET_COURSE_PAGE_BY_ROUTE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export function generatePageMetadata({
  page,
  slug = "",                // ← default to empty string
}: {
  page: GET_PAGE_BY_DEFINED_SLUG_QUERYResult
      | GET_BLOG_PAGE_BY_ROUTE_QUERYResult
      | GET_COURSE_PAGE_BY_ROUTE_QUERYResult;
  slug?: string;            // ← make it optional
}) {
  return {
    title:  page.meta_title || page.title,
    description: page.meta_description,
    openGraph: {
      images: [
        {
          url: page.ogImage
            ? urlFor(page.ogImage).auto("format").fit("max").quality(100).url()
            : `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
          width:  page.ogImage?.asset?.metadata?.dimensions?.width  || 1200,
          height: page.ogImage?.asset?.metadata?.dimensions?.height || 630,
        },
      ],
      // norwegian
      locale: "nb_NO",
      type:   "website",
    },
    robots: !isProduction
      ? "noindex, nofollow"
      : page.noindex
        ? "noindex"
        : "index, follow",
  };
}

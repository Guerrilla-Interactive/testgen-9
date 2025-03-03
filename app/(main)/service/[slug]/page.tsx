import { notFound } from "next/navigation";

import { generatePageMetadata } from "@/features/unorganized-utils/metadata";
import { fetchSanityServiceBySlug, fetchSanityServiceStaticParams } from "./(service-slug-core-utilities)/service-slug.server-actions";
import ServiceSlugPageComponent from "./service-slug.page-component";

export async function generateStaticParams() {
  const pages = await fetchSanityServiceStaticParams();

  return pages.map((page) => ({
    slug: page
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = await fetchSanityServiceBySlug({ slug });

  if (!page) {
    notFound();
  }

  return generatePageMetadata({ page, slug: `/$service/${slug}` });
}

export default async function Service(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = await fetchSanityServiceBySlug({ slug });


  if (!page) {
    notFound();
  }
  return (
    <>
    <ServiceSlugPageComponent {...page} />
    </>
  );
}

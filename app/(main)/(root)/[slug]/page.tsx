import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/features/unorganized-utils/metadata";
import { fetchSanityPageBySlug, fetchSanityPagesStaticParams } from "./page-slug.server-actions";

import { Blocks } from "@/features/page-builder-blocks/block-component-exporter";

// Add ISR with revalidation every 30 seconds
export const revalidate = 30;

export async function generateStaticParams() {
  const pages = await fetchSanityPagesStaticParams();

  

  return pages.map((page) => ({
    slug: page.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return generatePageMetadata({ page, slug: params.slug });
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }
  //@ts-ignore
  return <Blocks blocks={page?.blocks ?? []} />;
}

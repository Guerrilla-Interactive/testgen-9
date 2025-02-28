import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/features/unorganized-utils/metadata";
import { Blocks } from "@/features/page-builder-blocks/block-indexer";
import { fetchSanityPageBySlug, fetchSanityPagesStaticParams } from "./page-slug.server-actions";




export async function generateStaticParams() {
  const pages = await fetchSanityPagesStaticParams();

  return pages.map((page: Sanity.Page) => ({
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

  return <Blocks blocks={page?.blocks ?? []} />;
}

import { notFound } from "next/navigation";

import { generatePageMetadata } from "@/features/unorganized-utils/metadata";
import { fetchSanityServiceBySlug, fetchSanityServiceStaticParams } from "./(service-slug-core-utilities)/service-slug.server-actions";
import { Hero4BlockComponent } from "@/features/page-builder-blocks/blocks/hero-4-block";

export async function generateStaticParams() {
  const pages = await fetchSanityServiceStaticParams();

  return pages.map((page) => ({
    slug: page.slug?.current,
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
    <Hero4BlockComponent 
      title={page.title}
      backgroundImage={page.featuredImage}
      pretitle="Title"
      description="Description"
      showOverlay={true}
      topOverlayStrength={0.2}
      upperCenterOverlayStrength={0.0}
      lowerCenterOverlayStrength={0.2}
      bottomOverlayStrength={0.3}
      
    />
    </>
  );
}

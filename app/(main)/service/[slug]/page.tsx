import { notFound } from "next/navigation";

import { generatePageMetadata } from "@/features/unorganized-utils/metadata";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { fetchSanityServiceBySlug, fetchSanityServiceStaticParams } from "./(service-slug-core-utilities)/service-slug.server-actions";

export async function generateStaticParams() {
  const posts = await fetchSanityServiceStaticParams();

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = await fetchSanityServiceBySlug({ slug });

  if (!post) {
    notFound();
  }

  return generatePageMetadata({ page: post, slug: `/$service/${slug}` });
}

export default async function Service(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = await fetchSanityServiceBySlug({ slug });

  if (!post) {
    notFound();
  }
  return (
    <section>
      <div className="container py-16 xl:py-20">
        
      </div>
    </section>
  );
}

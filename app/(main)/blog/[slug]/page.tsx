import { notFound } from "next/navigation";



import { generatePageMetadata } from "@/features/unorganized-utils/metadata";
import type { BreadcrumbLink } from "@/types";
import Breadcrumbs from "@/features/unorganized-components/ui/breadcrumbs";
import PostHero from "@/features/unorganized-components/post/hero";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { fetchSanityBlogPostBySlug, fetchSanityBlogPostsStaticParams } from "./(blog-slug-core-utilities)/blog-slug.server-actions";


export async function generateStaticParams() {
  const posts = await fetchSanityBlogPostsStaticParams();

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityBlogPostBySlug({ slug: params.slug });

  if (!post) {
    notFound();
  }

  return generatePageMetadata({ page: post, slug: `/blog/${params.slug}` });
}

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityBlogPostBySlug(params);

  if (!post) {
    notFound();
  }

  const links: BreadcrumbLink[] = post
    ? [
        {
          label: "Home",
          href: "/",
        },
        {
          label: "Blog",
          href: "/blog",
        },
        {
          label: post.title as string,
          href: "#",
        },
      ]
    : [];

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <article className="mx-auto max-w-3xl">
          <Breadcrumbs links={links} />
          <PostHero {...post} />
          {post.body && <PortableTextRenderer value={post.body} />}
        </article>
      </div>
    </section>
  );
}

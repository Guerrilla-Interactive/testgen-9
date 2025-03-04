import { notFound } from "next/navigation";

import { generatePageMetadata } from "@/features/unorganized-utils/metadata";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { fetchSanityCourseBySlug, fetchSanityCourseStaticParams } from "./(course-slug-core-utilities)/course-slug.server-actions";
import CourseSlugPageComponent from "./course-slug.page-component";

export async function generateStaticParams() {
  const pages = await fetchSanityCourseStaticParams();

  return pages.map((page) => ({
    slug: page.slug.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = await fetchSanityCourseBySlug({ slug });

  if (!page) {
    notFound();
  }

  return generatePageMetadata({ page, slug: `/$course/${slug}` });
}

export default async function Course(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = await fetchSanityCourseBySlug({ slug });

  if (!page) {
    notFound();
  }
  return (
    <CourseSlugPageComponent {...page} />
  );
}

import Link from "next/link";
import { stegaClean } from "next-sanity";
import PostCard from "@/features/unorganized-components/ui/post-card";
import SectionContainer from "@/features/unorganized-components/ui/section-container";
import { fetchSanityBlogPosts } from "@/app/(main)/blog/[slug]/(blog-slug-core-utilities)/blog-slug.server-actions";



interface AllPostsProps {
  padding: {
    top: boolean;
    bottom: boolean;
  };
  colorVariant:
  | "primary"
  | "secondary"
  | "card"
  | "accent"
  | "destructive"
  | "background"
  | "transparent";
}

export default async function AllPostsBlockComponent({
  padding,
  colorVariant,
}: Partial<AllPostsProps>) {
  const color = stegaClean(colorVariant);
  const posts = await fetchSanityBlogPosts();

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {posts.map((post: Sanity.Post) => (
          <Link
            key={post.slug.current}
            className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href={`/blog/${post.slug.current}`}
          >
            <PostCard
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
            />
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
} 
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { fetchSanityPosts } from "@/app/(main)/blog/actions";
import PostCard from "@/features/ui/post-card";
import SectionContainer from "@/features/ui/section-container";

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
  const posts = await fetchSanityPosts();

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
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
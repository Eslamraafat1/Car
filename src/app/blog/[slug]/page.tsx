import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/components/pages/BlogPostView";
import { C } from "@/lib/content";
import { BLOG_POSTS, getPost, relatedPosts } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: C.pages.notFound.title.en };

  return {
    title: `${post.title.ar} · ${post.title.en}`,
    description: `${post.excerpt.ar} — ${post.excerpt.en}`,
    openGraph: {
      type: "article",
      title: `EVAY · ${post.title.en}`,
      description: post.excerpt.en,
      publishedTime: post.date,
      images: [{ url: post.image, width: 2400, height: 1600 }],
    },
  };
}

/**
 * Same pattern as the car pages: every known slug is prerendered and unknown
 * ones throw `notFound()` before any content renders.
 */
export const instant = false;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return <BlogPostView post={post} related={relatedPosts(post)} />;
}

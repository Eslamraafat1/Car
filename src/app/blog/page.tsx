import type { Metadata } from "next";
import BlogView from "@/components/pages/BlogView";
import { C } from "@/lib/content";

export const metadata: Metadata = {
  title: "مدونة إيفاي · Evay Blog",
  description: `${C.pages.blog.body.ar} — ${C.pages.blog.body.en}`,
  openGraph: {
    title: "EVAY · Blog",
    description: C.pages.blog.body.en,
    images: [{ url: "/media/images/night-city.jpg", width: 2400, height: 1600 }],
  },
};

export default function BlogPage() {
  return <BlogView />;
}

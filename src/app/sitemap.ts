import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { VEHICLES } from "@/lib/vehicles";

import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/explore", "/about", "/blog", "/contact"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const vehicleRoutes = VEHICLES.map((vehicle) => ({
    url: `${SITE_URL}/cars/${vehicle.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...vehicleRoutes, ...blogRoutes];
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { PostCard } from "@/components/pages/BlogView";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import {
  BLOG_CATEGORY_LABELS,
  formatPostDate,
  type BlogPost,
} from "@/lib/blog";

interface BlogPostViewProps {
  post: BlogPost;
  related: BlogPost[];
}

export default function BlogPostView({ post, related }: BlogPostViewProps) {
  const { t, lang } = useLang();

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={post.image}
            alt={t(post.alt)}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(55% 60% at 80% 15%, ${post.accent}26, transparent 70%)`,
            }}
          />

          <div className="absolute inset-0 flex flex-col justify-between px-4 pb-8 pt-20 sm:px-6 lg:px-10 lg:pb-12">
            <div className="mx-auto w-full max-w-[1400px]">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/55 px-4 py-2 text-[0.8rem] text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
              >
                {lang === "ar" ? (
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={2.2} />
                ) : (
                  <ArrowLeft className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2} />
                )}
                {t(C.pages.blog.back)}
              </Link>
            </div>

            <div className="mx-auto w-full max-w-[1400px]">
              <p className="eyebrow" style={{ color: post.accent }}>
                {t(BLOG_CATEGORY_LABELS[post.category])}
              </p>
              <h1 className="display mt-4 max-w-4xl text-[clamp(1.9rem,5vw,4rem)] text-white">
                {t(post.title)}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <article className="bg-ink-2 py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[760px] px-4 sm:px-6">
          <p className="numeral flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line pb-6 text-[0.78rem] tracking-wider text-dim">
            <time dateTime={post.date}>{formatPostDate(post.date, lang)}</time>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
              {post.readMinutes} {t(C.pages.blog.minutes)}
            </span>
          </p>

          <p className="mt-8 text-[1.1rem] leading-[1.9] text-fog">{t(post.excerpt)}</p>

          <div className="mt-8 space-y-10">
            {post.sections.map((section, index) => (
              <section key={index}>
                {section.heading && (
                  <h2 className="font-display text-xl font-semibold tracking-tight text-fog sm:text-2xl">
                    {t(section.heading)}
                  </h2>
                )}
                <div className={`space-y-5 ${section.heading ? "mt-4" : ""}`}>
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i} className="text-[1rem] leading-[1.9] text-mist">
                      {t(paragraph)}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-[22px] border border-line bg-ink p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold tracking-tight text-fog">
              {t(C.pages.blog.ctaTitle)}
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-mist">{t(C.pages.blog.ctaBody)}</p>
            <Link
              href="/contact"
              className="shine group relative mt-6 inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full bg-volt px-6 text-[0.88rem] font-semibold text-white transition-transform duration-300 hover:scale-[1.04]"
            >
              {t(C.pages.blog.ctaButton)}
              <ArrowRight className="size-4 rtl:rotate-180" strokeWidth={2.4} />
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-ink py-16 lg:py-24" aria-labelledby="related-posts-title">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <h2
              id="related-posts-title"
              className="display h-section text-fog"
            >
              {t(C.pages.blog.more)}
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <PostCard post={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

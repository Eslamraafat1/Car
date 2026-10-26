"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import PageHeader from "@/components/automotive/PageHeader";
import WordBand from "@/components/ui/WordBand";
import KineticHeading from "@/components/ui/KineticHeading";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import {
  BLOG_CATEGORY_LABELS,
  BLOG_POSTS,
  formatPostDate,
  type BlogCategory,
  type BlogPost,
} from "@/lib/blog";

type FilterKey = "all" | BlogCategory;

const FILTER_KEYS: FilterKey[] = ["all", "guides", "electric", "care", "performance"];

function PostMeta({ post }: { post: BlogPost }) {
  const { t, lang } = useLang();
  return (
    <p className="numeral flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.74rem] tracking-wider text-dim">
      <time dateTime={post.date}>{formatPostDate(post.date, lang)}</time>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
        {post.readMinutes} {t(C.pages.blog.minutes)}
      </span>
    </p>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  const { t } = useLang();
  return (
    <article className="group relative grid overflow-hidden rounded-[24px] border border-line bg-ink transition-colors duration-500 hover:border-volt/60 lg:grid-cols-12">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[26rem]"
        aria-label={t(post.title)}
        tabIndex={-1}
      >
        <Image
          src={post.image}
          alt={t(post.alt)}
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute start-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[0.66rem] tracking-[0.16em] text-white/85 backdrop-blur-sm">
          {t(C.pages.blog.featured)}
        </span>
      </Link>

      <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 lg:col-span-5 lg:p-10">
        <p className="eyebrow" style={{ color: post.accent }}>
          {t(BLOG_CATEGORY_LABELS[post.category])}
        </p>
        <h2 className="font-display text-2xl font-semibold leading-snug tracking-tight text-fog sm:text-3xl">
          <Link href={`/blog/${post.slug}`} className="focus-visible:outline-none">
            {t(post.title)}
          </Link>
        </h2>
        <p className="text-[0.95rem] leading-relaxed text-mist">{t(post.excerpt)}</p>
        <PostMeta post={post} />
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-volt"
        >
          {t(C.pages.blog.read)}
          <ArrowRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            strokeWidth={2.4}
          />
        </Link>
      </div>
    </article>
  );
}

export function PostCard({ post }: { post: BlogPost }) {
  const { t } = useLang();
  return (
    <article className="group relative h-full overflow-hidden rounded-[22px] border border-line bg-ink transition-colors duration-500 hover:border-volt/60">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col focus-visible:outline-none">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.image}
            alt={t(post.alt)}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <span className="absolute start-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[0.66rem] tracking-[0.16em] text-white/85 backdrop-blur-sm">
            {t(BLOG_CATEGORY_LABELS[post.category])}
          </span>
          <span
            className="absolute bottom-0 start-0 h-0.5 w-0 transition-all duration-700 ease-out group-hover:w-full"
            style={{ backgroundColor: post.accent }}
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 lg:p-6">
          <PostMeta post={post} />
          <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-fog">
            {t(post.title)}
          </h3>
          <p className="text-[0.86rem] leading-relaxed text-mist">{t(post.excerpt)}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 border-t border-line pt-4 text-[0.78rem] font-medium text-volt">
            {t(C.pages.blog.read)}
            <ArrowRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              strokeWidth={2.4}
            />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function BlogView() {
  const { t } = useLang();
  const [filter, setFilter] = useState<FilterKey>("all");

  const [featured, ...rest] = BLOG_POSTS;
  const visible =
    filter === "all" ? rest : BLOG_POSTS.filter((post) => post.category === filter);

  return (
    <>
      <PageHeader
        eyebrow={C.pages.blog.eyebrow}
        title={C.pages.blog.title}
        body={C.pages.blog.body}
      />

      <section className="relative bg-ink-2 py-16 lg:py-24" aria-label={t(C.pages.blog.latest)}>
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          {filter === "all" && featured && <FeaturedPost post={featured} />}

          <div className="mt-12 flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="group"
              aria-label={t(C.pages.blog.latest)}
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
            >
              {FILTER_KEYS.map((key) => {
                const selected = filter === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    aria-pressed={selected}
                    className={`shrink-0 rounded-full border px-4 py-2 text-[0.8rem] font-medium transition-colors duration-300 ${
                      selected
                        ? "border-fog bg-fog text-ink"
                        : "border-line text-mist hover:text-fog"
                    }`}
                  >
                    {key === "all" ? t(C.pages.blog.all) : t(BLOG_CATEGORY_LABELS[key])}
                  </button>
                );
              })}
            </div>
            <p className="numeral shrink-0 text-[0.78rem] tracking-wider text-dim">
              {filter === "all" ? BLOG_POSTS.length : visible.length} {t(C.pages.blog.count)}
            </p>
          </div>

          <p className="mt-4 text-[0.75rem] text-dim">{t(C.pages.blog.note)}</p>

          {visible.length > 0 ? (
            <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 rounded-2xl border border-dashed border-line p-8 text-center text-sm text-mist">
              {t(C.pages.blog.empty)}
            </p>
          )}
        </div>
      </section>

      <section className="border-t border-line bg-ink py-16 lg:py-24">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div className="max-w-3xl">
            <KineticHeading
              text={C.pages.blog.ctaTitle}
              className="display h-section text-fog"
            />
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-mist">
              {t(C.pages.blog.ctaBody)}
            </p>
          </div>
          <Link
            href="/contact"
            className="shine group relative inline-flex h-12 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-volt px-7 text-[0.9rem] font-semibold text-white transition-transform duration-300 hover:scale-[1.04]"
          >
            {t(C.pages.blog.ctaButton)}
            <ArrowRight className="size-4 rtl:rotate-180" strokeWidth={2.4} />
          </Link>
        </div>
      </section>

      <WordBand reverse />
    </>
  );
}

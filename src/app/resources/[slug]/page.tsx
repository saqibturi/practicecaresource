import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ArticleReadingProgress } from "@/components/resources/article-reading-progress";
import { ResourceCard, type ResourceCardData } from "@/components/resources/resource-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getReadingMinutes, getResourceArticle, resourceArticles, type ResourceArticle } from "@/data/resources/articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return resourceArticles.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getResourceArticle(slug);
  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      images: [{ url: article.coverImage, alt: article.coverAlt }],
      ...(isIsoDate(article.publishedAt) ? { publishedTime: article.publishedAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.coverImage],
    },
  };
}

function createArticleSchema(article: ResourceArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [article.coverImage],
    author: {
      "@type": "Person",
      name: "Irtiza Hassan",
    },
    publisher: {
      "@type": "Organization",
      name: "CareSource",
    },
    ...(isIsoDate(article.publishedAt) ? { datePublished: article.publishedAt } : {}),
  };
}

function toCard(article: ResourceArticle): ResourceCardData {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    publishedAt: article.publishedAt,
    coverImage: article.coverImage,
    coverAlt: article.coverAlt,
    readingMinutes: getReadingMinutes(article),
  };
}

function TableOfContents({ article }: { article: ResourceArticle }) {
  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-brand-border bg-brand-background-wash/25 p-5 sm:p-6">
      <h2 className="font-display text-xl font-semibold text-brand-dark">In this article</h2>
      <ol className="mt-4 space-y-2.5">
        {article.sections.map((section, index) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="group flex items-start gap-3 rounded-md text-sm leading-snug text-brand-slate transition-colors hover:text-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink">
              <span className="mt-0.5 font-bold text-brand-accent-ink/75">{String(index + 1).padStart(2, "0")}</span>
              <span className="underline decoration-transparent underline-offset-4 group-hover:decoration-brand-accent/70">{section.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ArticleContent({ article }: { article: ResourceArticle }) {
  return (
    <div className="max-w-[70ch]">
      <section aria-labelledby="key-takeaways">
        <h2 id="key-takeaways" className="font-display text-2xl font-semibold text-brand-dark sm:text-3xl">Key takeaways</h2>
        <ul className="mt-5 space-y-3">
          {article.takeaways.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-brand-slate">
              <span className="mt-2 size-2 shrink-0 rounded-full bg-brand-accent" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
        {article.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-32">
            <h2 className="font-display text-3xl font-semibold leading-tight text-brand-dark sm:text-4xl">{section.title}</h2>
            <div className="mt-5 space-y-5 text-base leading-[1.85] text-brand-slate sm:text-[1.0625rem]">
              {section.paragraphs.map((paragraph, index) => <p key={`${section.id}-p-${index}`}>{paragraph}</p>)}
            </div>
            {section.bullets ? (
              <ul className="mt-5 space-y-3 rounded-2xl border border-brand-border bg-brand-background-wash/20 p-5 sm:p-6">
                {section.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-brand-dark sm:text-base">
                    <ArrowRight size={17} className="mt-1 shrink-0 text-brand-accent-ink" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {section.callout ? (
              <aside className="mt-6 rounded-r-2xl border-l-4 border-brand-accent bg-brand-background-wash/35 px-5 py-5 sm:px-6">
                <h3 className="font-display text-xl font-semibold text-brand-dark">{section.callout.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-slate sm:text-base">{section.callout.body}</p>
              </aside>
            ) : null}
          </section>
        ))}
      </div>

      <p className="mt-8 border-t border-brand-border pt-5 text-sm font-semibold leading-relaxed text-brand-accent-ink">
        {article.closingNote}
      </p>
    </div>
  );
}

function AuthorBox() {
  return (
    <aside className="mt-8 flex flex-col gap-4 rounded-2xl border border-brand-border bg-brand-background-wash/25 p-5 sm:flex-row sm:items-center sm:p-6">
      <div className="grid size-14 shrink-0 place-items-center rounded-full bg-brand-lapis font-display text-xl font-semibold text-brand-accent" aria-hidden="true">IH</div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.13em] text-brand-accent-ink">About the author</p>
        <h2 className="mt-1 font-display text-2xl font-semibold text-brand-dark">Irtiza Hassan</h2>
        <p className="mt-1 text-sm leading-relaxed text-brand-slate">Founder and owner of CareSource. This general resource is for informational purposes and does not replace advice from a qualified professional.</p>
      </div>
    </aside>
  );
}

export default async function ResourceArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getResourceArticle(slug);
  if (!article) notFound();

  const relatedArticles = resourceArticles
    .filter((item) => item.slug !== article.slug)
    .sort((first, second) => Number(second.category === article.category) - Number(first.category === article.category))
    .slice(0, 2);
  const schema = createArticleSchema(article);

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <section className="border-b border-brand-border/70 bg-brand-background-wash/25 py-8 sm:py-10 lg:py-12">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-slate">
              <li><Link href="/" className="rounded-sm hover:text-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/resources" className="rounded-sm hover:text-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink">Resources</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="max-w-[14rem] truncate text-brand-dark sm:max-w-none">{article.category}</li>
            </ol>
          </nav>
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <ScrollReveal>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-accent-ink">{article.category}</p>
              <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">{article.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg">{article.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold text-brand-slate">
                <span className="inline-flex items-center gap-2"><CalendarDays size={16} aria-hidden="true" />{article.publishedAt}</span>
                <span className="inline-flex items-center gap-2"><Clock3 size={16} aria-hidden="true" />{getReadingMinutes(article)} min read</span>
                <span>By Irtiza Hassan</span>
              </div>
            </ScrollReveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-brand-border bg-brand-background-wash shadow-card">
              <Image
                src={article.coverImage}
                alt={article.coverAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <ArticleReadingProgress />

      <section className="py-8 sm:py-10 lg:py-12">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <article>
            <p className="mb-8 max-w-[70ch] text-lg leading-[1.8] text-brand-dark sm:text-xl">{article.introduction}</p>
            <ArticleContent article={article} />
            <AuthorBox />
          </article>
          <aside className="self-start lg:sticky lg:top-28">
            <div className="lg:hidden">
              <details className="group rounded-2xl border border-brand-border bg-brand-background-wash/25 p-5">
                <summary className="cursor-pointer list-none font-display text-xl font-semibold text-brand-dark marker:hidden [&::-webkit-details-marker]:hidden">In this article</summary>
                <ol className="mt-4 space-y-3">
                  {article.sections.map((section, index) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="flex gap-3 text-sm leading-snug text-brand-slate hover:text-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink">
                        <span className="font-bold text-brand-accent-ink">{String(index + 1).padStart(2, "0")}</span>{section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            </div>
            <div className="hidden lg:block"><TableOfContents article={article} /></div>
          </aside>
        </Container>
      </section>

      <section className="border-y border-brand-border/75 bg-brand-background-wash/25 py-8 sm:py-10 lg:py-12" aria-label="Related articles">
        <Container>
          <ScrollReveal>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-5 sm:mb-8">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-brand-accent-ink">Keep exploring</p>
                <h2 className="font-display text-3xl font-semibold text-brand-dark sm:text-4xl">Related resources</h2>
              </div>
              <Link href="/resources" className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-brand-accent-ink underline decoration-brand-accent/70 underline-offset-4 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink">
                All resources <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid gap-5 md:grid-cols-2">
            {relatedArticles.map((related, index) => (
              <ScrollReveal key={related.slug} delay={index * 0.05} className="h-full">
                <ResourceCard article={toCard(related)} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-8 sm:py-10 lg:py-12">
        <Container>
          <ScrollReveal>
            <div className="relative isolate overflow-hidden rounded-3xl bg-brand-lapis px-6 py-10 text-brand-background sm:px-10 sm:py-14 lg:px-16">
              <div className="pointer-events-none absolute -right-12 -top-20 -z-10 size-64 rounded-full border-[2.5rem] border-brand-accent/15" aria-hidden="true" />
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-accent">The source of care for your practice</p>
              <h2 className="mt-3 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.02] text-brand-background sm:text-5xl">Want to talk through your practice workflow?</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-background/75 sm:text-lg">Share the general kind of support you are looking for and we can discuss a practical next step.</p>
              <Button href="/contact" size="lg" showArrow className="mt-7">Book a Free Audit</Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}


import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";

export type ResourceCardData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  coverImage: string;
  coverAlt: string;
  readingMinutes: number;
};

type ResourceCardProps = {
  article: ResourceCardData;
  featured?: boolean;
};

export function ResourceCard({ article, featured = false }: ResourceCardProps) {
  if (featured) {
    return (
      <article className="group overflow-hidden rounded-3xl border border-brand-border bg-brand-lapis text-brand-background shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover">
        <Link
          href={`/resources/${article.slug}`}
          className="grid h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-accent"
          aria-label={`Read featured article: ${article.title}`}
        >
          <div className="relative min-h-56 overflow-hidden bg-brand-lapis-hover sm:min-h-72 lg:min-h-[28rem]">
            <Image
              src={article.coverImage}
              alt={article.coverAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
            />
            <span className="absolute left-5 top-5 rounded-pill bg-brand-lapis/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-brand-accent backdrop-blur-sm">
              Featured article
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-brand-background/65">
              <span className="text-brand-accent">{article.category}</span>
              <span>{article.publishedAt}</span>
              <span className="inline-flex items-center gap-1.5"><Clock3 size={14} aria-hidden="true" />{article.readingMinutes} min read</span>
            </div>
            <h3 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-[1.05] text-brand-background sm:text-4xl lg:text-5xl">
              {article.title}
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-background/70 sm:text-lg">
              {article.excerpt}
            </p>
            <span className="mt-7 inline-flex items-center gap-2 self-start text-sm font-bold text-brand-accent">
              Read the article <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-brand-border bg-brand-background shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-accent/45 hover:shadow-card-hover">
      <Link
        href={`/resources/${article.slug}`}
        className="flex h-full flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-accent-ink"
        aria-label={`Read article: ${article.title}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-brand-background-wash">
          <Image
            src={article.coverImage}
            alt={article.coverAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-brand-slate">
            <span className="text-brand-accent-ink">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-brand-dark sm:text-3xl">
            {article.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-slate sm:text-base">
            {article.excerpt}
          </p>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-brand-border pt-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-slate">
              <Clock3 size={14} aria-hidden="true" /> {article.readingMinutes} min read
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-accent-ink">
              Read article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}


"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ResourceCard, type ResourceCardData } from "@/components/resources/resource-card";

type ResourcesExplorerProps = {
  articles: ResourceCardData[];
  categories: string[];
  featuredSlug: string;
};

export function ResourcesExplorer({ articles, categories, featuredSlug }: ResourcesExplorerProps) {
  const [activeCategory, setActiveCategory] = useState("All topics");
  const [query, setQuery] = useState("");
  const isDefaultView = activeCategory === "All topics" && query.trim() === "";

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return articles.filter((article) => {
      const matchesCategory = activeCategory === "All topics" || article.category === activeCategory;
      const searchable = `${article.title} ${article.excerpt} ${article.category}`.toLocaleLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeCategory, articles, query]);

  const featuredArticle = articles.find((article) => article.slug === featuredSlug);
  const gridArticles = isDefaultView
    ? filteredArticles.filter((article) => article.slug !== featuredSlug)
    : filteredArticles;

  return (
    <div>
      <div className="grid gap-5 rounded-2xl border border-brand-border bg-brand-background-wash/25 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-8">
        <div>
          <label htmlFor="resource-search" className="mb-2 block text-sm font-bold text-brand-dark">Search resources</label>
          <div className="relative">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-slate" aria-hidden="true" />
            <input
              id="resource-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search billing, denials, credentialing..."
              className="min-h-12 w-full rounded-xl border border-brand-border bg-brand-background py-3 pl-11 pr-4 text-sm text-brand-dark placeholder:text-brand-slate/75 focus:border-brand-accent-ink focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
            />
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-bold text-brand-dark" id="resource-category-label">Browse by topic</p>
          <div className="flex flex-wrap gap-2" role="group" aria-labelledby="resource-category-label">
            {["All topics", ...categories].map((category) => {
              const selected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveCategory(category)}
                  className={[
                    "min-h-10 rounded-pill border px-4 text-xs font-bold transition-colors sm:text-sm",
                    selected
                      ? "border-brand-lapis bg-brand-lapis text-brand-background"
                      : "border-brand-border bg-brand-background text-brand-dark hover:border-brand-accent-ink hover:bg-brand-background-wash/50",
                  ].join(" ")}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {isDefaultView && featuredArticle ? (
        <ScrollReveal className="mt-7 sm:mt-9">
          <ResourceCard article={featuredArticle} featured />
        </ScrollReveal>
      ) : null}

      <div className="mb-4 mt-7 flex flex-wrap items-center justify-between gap-3 sm:mt-9">
        <p className="text-sm font-semibold text-brand-slate" aria-live="polite">
          {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"} found
        </p>
        {!isDefaultView ? (
          <button
            type="button"
            onClick={() => { setQuery(""); setActiveCategory("All topics"); }}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-bold text-brand-accent-ink underline decoration-brand-accent/60 underline-offset-4 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink"
          >
            <X size={15} aria-hidden="true" /> Clear filters
          </button>
        ) : null}
      </div>

      {gridArticles.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gridArticles.map((article, index) => (
            <ScrollReveal key={article.slug} delay={index * 0.035} className="h-full">
              <ResourceCard article={article} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-brand-border bg-brand-background-wash/20 px-6 py-12 text-center">
          <p className="font-display text-2xl font-semibold text-brand-dark">No articles match that search yet.</p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-brand-slate">Try another phrase or choose a different topic. New resources can be added through the typed article collection.</p>
        </div>
      )}
    </div>
  );
}


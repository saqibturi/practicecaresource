"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { serviceCatalog } from "@/data/services";

export function ServiceExplorer() {
  const [activeSlug, setActiveSlug] = useState(serviceCatalog[0].slug);
  const [openMobileSlug, setOpenMobileSlug] = useState(serviceCatalog[0].slug);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reactId = useId();
  const baseId = "service-explorer-" + reactId.replace(/:/g, "");
  const reducedMotion = useReducedMotion();
  const activeService = serviceCatalog.find((service) => service.slug === activeSlug) ?? serviceCatalog[0];
  const ActiveIcon = activeService.icon;

  const selectTab = (index: number) => {
    const service = serviceCatalog[index];
    if (!service) return;
    setActiveSlug(service.slug);
    tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % serviceCatalog.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (index - 1 + serviceCatalog.length) % serviceCatalog.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = serviceCatalog.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    selectTab(nextIndex);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-border bg-brand-background shadow-card">
      <div className="hidden min-h-[25rem] lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]">
        <div
          role="tablist"
          aria-label="Explore CareSource services"
          aria-orientation="vertical"
          className="border-r border-brand-border bg-brand-background-wash/35 p-4"
        >
          {serviceCatalog.map((service, index) => {
            const Icon = service.icon;
            const selected = activeSlug === service.slug;
            return (
              <button
                key={service.slug}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                id={`${baseId}-tab-${service.slug}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveSlug(service.slug)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={[
                  "group flex min-h-14 w-full items-center gap-3 rounded-2xl px-3 text-left text-sm font-bold transition-[background-color,color,transform] duration-200 hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink",
                  selected
                    ? "bg-brand-lapis text-brand-background shadow-sm"
                    : "text-brand-slate hover:bg-brand-background hover:text-brand-dark",
                ].join(" ")}
              >
                <span
                  className={[
                    "grid size-9 shrink-0 place-items-center rounded-xl transition-colors",
                    selected
                      ? "bg-brand-accent text-brand-background"
                      : "bg-brand-background text-brand-accent-ink group-hover:bg-brand-accent/15",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  <Icon size={18} strokeWidth={1.9} />
                </span>
                {service.shortTitle}
              </button>
            );
          })}
        </div>

        <div className="flex items-center p-7 sm:p-10 xl:p-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeService.slug}
              id={`${baseId}-panel`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${activeService.slug}`}
              tabIndex={0}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reducedMotion ? 0 : 0.22 }}
              className="w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-accent-ink">
                    {activeService.shortTitle}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-brand-dark sm:text-4xl">
                    {activeService.title}
                  </h3>
                </div>
                <span
                  className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-accent/15 text-brand-accent-ink"
                  aria-hidden="true"
                >
                  <ActiveIcon size={26} strokeWidth={1.8} />
                </span>
              </div>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg">
                {activeService.overview}
              </p>
              <div className="mt-7">
                <h4 className="text-sm font-bold text-brand-dark">What’s included</h4>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {activeService.whatsIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-slate">
                      <Check size={17} className="mt-0.5 shrink-0 text-brand-accent-ink" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-brand-slate">
                <span className="font-bold text-brand-dark">Who it’s for: </span>
                {activeService.whoItsFor}
              </p>
              <Link
                href={`/services/${activeService.slug}`}
                className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-pill border border-brand-slate/35 px-5 text-sm font-bold text-brand-dark transition-[background-color,border-color,transform] hover:-translate-y-0.5 hover:border-brand-accent-ink hover:bg-brand-background-wash/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink"
              >
                Explore {activeService.shortTitle}
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="divide-y divide-brand-border lg:hidden">
        {serviceCatalog.map((service) => {
          const Icon = service.icon;
          const expanded = openMobileSlug === service.slug;
          const panelId = `${baseId}-mobile-panel-${service.slug}`;
          return (
            <div key={service.slug}>
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => {
                    setOpenMobileSlug(expanded ? "" : service.slug);
                    setActiveSlug(service.slug);
                  }}
                  className="group flex min-h-[4.5rem] w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-brand-background-wash/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-accent-ink sm:px-7"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-accent/15 text-brand-accent-ink" aria-hidden="true">
                      <Icon size={19} strokeWidth={1.9} />
                    </span>
                    <span className="font-bold text-brand-dark">{service.shortTitle}</span>
                  </span>
                  <ChevronDown
                    size={19}
                    className={["shrink-0 text-brand-slate transition-transform duration-200", expanded ? "rotate-180" : ""].join(" ")}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-label={`${service.shortTitle} overview`}
                    initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 pt-1 sm:px-7">
                      <p className="text-sm leading-relaxed text-brand-slate">{service.overview}</p>
                      <h4 className="mt-5 text-sm font-bold text-brand-dark">What’s included</h4>
                      <ul className="mt-3 grid gap-2.5">
                        {service.whatsIncluded.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-slate">
                            <Check size={16} className="mt-0.5 shrink-0 text-brand-accent-ink" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-sm leading-relaxed text-brand-slate">
                        <span className="font-bold text-brand-dark">Who it’s for: </span>{service.whoItsFor}
                      </p>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink"
                      >
                        Explore {service.shortTitle}
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}


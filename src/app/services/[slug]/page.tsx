import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { PageHeroImage } from "@/components/page-hero-image";
import { getServiceBySlug, serviceCatalog, type ServiceContent } from "@/data/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceCatalog.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} | CareSource`,
      description: service.description,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedServices = service.relatedServices
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter((related): related is ServiceContent => Boolean(related));

  return (
    <main id="main-content">
      <section className="relative isolate overflow-hidden border-b border-brand-border/70 bg-brand-background py-8 sm:py-10 lg:py-12 lg:pb-6">
        <Container className="relative grid items-start gap-10 lg:min-h-[25rem] lg:grid-cols-[1.15fr_0.85fr]">
          <ScrollReveal className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-slate">
                <li>
                  <Link href="/" className="rounded-sm transition-colors hover:text-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink">Home</Link>
                </li>
                <li aria-hidden="true"><ChevronRight size={15} /></li>
                <li>
                  <Link href="/services" className="rounded-sm transition-colors hover:text-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink">Services</Link>
                </li>
                <li aria-hidden="true"><ChevronRight size={15} /></li>
                <li aria-current="page" className="text-brand-dark">{service.shortTitle}</li>
              </ol>
            </nav>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-accent-ink">
              CareSource practice support
            </p>
            <h1 className="text-balance font-display text-5xl font-semibold leading-[0.98] tracking-tight text-brand-dark sm:text-6xl lg:min-h-[2em] lg:text-7xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg lg:min-h-[5.5rem]">
              {service.overview}
            </p>
            <div className="mt-6 flex min-h-14 flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg" showArrow>Book a Free Audit</Button>
              <Link href="/services" className="inline-flex min-h-12 items-center gap-2 px-3 text-sm font-bold text-brand-dark transition-colors hover:text-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink">
                View all services <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
          <PageHeroImage src={service.imageSrc} alt={service.imageAlt} />
        </Container>
      </section>

      <section className="py-10 sm:py-12 lg:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <ScrollReveal>
            <SectionHeading
              eyebrow="What's included"
              title="A clear scope, built around your workflow"
              description="The exact tasks are agreed with your practice. Common areas of support may include:"
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-brand-border bg-brand-background/70 p-4 text-sm leading-relaxed text-brand-slate transition-colors hover:border-brand-accent/45 hover:bg-brand-background">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-accent/15 text-brand-accent-ink" aria-hidden="true">
                    <Check size={15} strokeWidth={2.3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <aside className="h-full rounded-3xl border border-brand-border bg-brand-background-wash/40 p-5 sm:p-6">
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand-accent-ink">Who it's for</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-brand-dark sm:text-4xl">
                Built for real practice workflows
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-slate">{service.whoItsFor}</p>
              <div className="mt-8 border-t border-brand-border pt-6">
                <h3 className="font-display text-2xl font-semibold text-brand-dark">Why it matters</h3>
                <ul className="mt-4 space-y-3">
                  {service.whyItMatters.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-slate">
                      <Check size={16} className="mt-1 shrink-0 text-brand-accent-ink" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </ScrollReveal>
        </Container>
      </section>

      <section className="border-y border-brand-border/75 bg-brand-background-wash/30 py-10 sm:py-12 lg:py-16">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="How we do it"
              title="A practical process, with clear handoffs"
              description="We agree on responsibilities and review points with your practice before the work moves forward."
              align="center"
            />
          </ScrollReveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.howWeWork.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 0.04}>
                <article className="h-full rounded-2xl border border-brand-border bg-brand-background p-5 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-brand-accent/50 hover:shadow-card sm:p-6">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-lapis text-sm font-bold text-brand-background" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-brand-dark">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-slate">{step.description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12 lg:py-16">
        <Container size="narrow">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Common questions"
              title={`A few things to know about ${service.shortTitle.toLowerCase()}`}
              align="center"
            />
            <div className="mt-6 divide-y divide-brand-border border-y border-brand-border">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group py-1">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 font-bold text-brand-dark transition-colors hover:text-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink">
                    {faq.question}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-background-wash/50 text-brand-accent-ink transition-transform group-open:rotate-180" aria-hidden="true">
                      <ChevronRight size={17} className="rotate-90" />
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-5 pr-10 text-sm leading-relaxed text-brand-slate sm:text-base">{faq.answer}</p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="border-y border-brand-border/75 bg-brand-background-wash/30 py-10 sm:py-12 lg:py-16">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Connected support"
              title="Related services"
              description="Explore other areas that may fit alongside this work."
            />
          </ScrollReveal>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {relatedServices.map((related, index) => (
              <ScrollReveal key={related.slug} delay={index * 0.05}>
                <ServiceCard
                  title={related.title}
                  description={related.description}
                  imageSrc={related.imageSrc}
                  imageAlt={related.imageAlt}
                  icon={related.icon}
                  href={`/services/${related.slug}`}
                />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12 lg:py-16">
        <Container>
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-brand-lapis px-7 py-8 text-brand-background sm:px-10 sm:py-10 lg:px-16 lg:py-12">
              <div className="pointer-events-none absolute -right-10 -top-20 size-64 rounded-full border border-brand-accent/35" aria-hidden="true" />
              <div className="relative max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-accent">The source of care for your practice</p>
                <h2 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.02] text-brand-background sm:text-5xl">
                  Let's talk about what your team needs.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-background/75 sm:text-lg">
                  Share what you would like to improve, and we can discuss a practical next step for your practice.
                </p>
                <Button href="/contact" size="lg" className="mt-7" showArrow>Book a Free Audit</Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}


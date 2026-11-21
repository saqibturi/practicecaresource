import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Eye,
  Handshake,
  ListChecks,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { PageHeroImage } from "@/components/page-hero-image";
import { serviceCatalog } from "@/data/services";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About CareSource",
  description:
    "Learn how CareSource brings medical billing and practice support together for US healthcare providers.",
};

const values = [
  {
    title: "Accuracy",
    description:
      "We work from the information and workflows your practice provides, and flag questions for your team to review.",
    icon: ClipboardCheck,
  },
  {
    title: "Transparency",
    description:
      "Responsibilities, communication, and review points are agreed with your practice before work begins.",
    icon: Eye,
  },
  {
    title: "Partnership",
    description:
      "Support is planned around your team's existing processes, preferences, and priorities.",
    icon: Handshake,
  },
];

const onboardingSteps = [
  {
    title: "Listen",
    description:
      "We learn what your practice wants to improve and how your current workflow operates.",
  },
  {
    title: "Define the scope",
    description:
      "Together, we clarify the tasks, responsibilities, and decisions that stay with your team.",
  },
  {
    title: "Agree on handoffs",
    description:
      "We set expectations for communication, questions, approvals, and the information needed to begin.",
  },
  {
    title: "Start with the agreed work",
    description:
      "Support begins within the scope and process your practice has reviewed.",
  },
  {
    title: "Review together",
    description:
      "We check in on open items and discuss any adjustments with the appropriate practice contact.",
  },
];

const vendorChallenges = [
  "Repeat background and instructions across different contacts",
  "Coordinate handoffs between separate service providers",
  "Track who owns the next step for each open item",
];

const connectedSupport = [
  "Choose the service mix that fits your practice",
  "Keep agreed responsibilities and handoffs visible",
  "Coordinate related support through one CareSource relationship",
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="relative isolate overflow-hidden border-b border-brand-border/70 bg-brand-background py-8 sm:py-10 lg:py-12 lg:pb-6">
        <Container className="relative grid items-start gap-10 lg:min-h-[25rem] lg:grid-cols-[1.15fr_0.85fr]">
          <ScrollReveal className="max-w-3xl lg:max-w-none">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-sm font-semibold text-brand-slate">
                <li>
                  <Link
                    href="/"
                    className="rounded-sm transition-colors hover:text-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-brand-dark">
                  About
                </li>
              </ol>
            </nav>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-accent-ink">
              About CareSource
            </p>
            <h1 className="text-balance font-display text-5xl font-semibold leading-[0.98] tracking-tight text-brand-dark sm:text-6xl lg:min-h-[2em] lg:text-7xl">
              The source of care for providers.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg lg:min-h-[5.5rem]">
              CareSource brings medical billing and practice support together
              for US healthcare providers, with clear responsibilities and
              thoughtful coordination around your team's way of working.
            </p>
            <div className="mt-6 flex min-h-14 flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg" showArrow>
                Book a Free Audit
              </Button>
              <Button href="#our-story" variant="ghost" size="lg">
                Meet the founder
              </Button>
            </div>
          </ScrollReveal>
          <PageHeroImage src={serviceCatalog[0].imageSrc} alt="Healthcare professional reviewing information at a clinic" />
        </Container>
      </section>

      <section id="our-story" className="py-10 sm:py-12 lg:py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <ScrollReveal className="mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-brand-lapis p-6 text-brand-background shadow-card sm:p-8">
              <div className="absolute -right-12 -top-12 size-48 rounded-full border border-brand-accent/35" aria-hidden="true" />
              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-accent">Practice support</p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight">Services shaped around your workflow</h2>
                <ul className="mt-6 space-y-3 text-sm font-semibold text-brand-background/85">
                  {["Medical billing", "Credentialing & enrollment", "AR and denial follow-up", "Administrative and digital support"].map((service) => (
                    <li key={service} className="flex items-center gap-3">
                      <Check size={17} className="shrink-0 text-brand-accent" aria-hidden="true" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <SectionHeading
              eyebrow="Our story"
              title="Practice support, shaped around people."
              description="CareSource brings medical billing and related practice support under one roof for US healthcare providers."
            />
            <p className="mt-6 text-base leading-relaxed text-brand-slate sm:text-lg">
              Irtiza Hassan is the owner of CareSource. The business supports
              practices with medical billing, credentialing, administrative
              coordination, and digital services, with the scope agreed
              directly with each practice.
            </p>
            <p className="mt-5 text-sm font-semibold text-brand-dark">
              Irtiza Hassan{" "}
              <span className="font-normal text-brand-slate">· Founder &amp; Owner</span>
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="border-y border-brand-border/75 bg-brand-background-wash/30 py-10 sm:py-12 lg:py-16">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="What guides us"
              title="A steady approach to practice support"
              description="Our working principles keep the scope clear and make it easier for your team to stay involved where its input is needed."
            />
          </ScrollReveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {values.map(({ title, description, icon: Icon }, index) => (
              <ScrollReveal key={title} delay={index * 0.06} className="h-full">
                <article className="group h-full rounded-2xl border border-brand-border bg-brand-background p-6 shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-accent/50 hover:shadow-card-hover motion-reduce:transition-none sm:p-7">
                  <span className="grid size-12 place-items-center rounded-xl border border-brand-accent/15 bg-brand-peach/65 text-brand-accent-ink shadow-sm transition-transform duration-300 group-hover:rotate-3 motion-reduce:transition-none">
                    <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h2 className="mt-6 font-display text-2xl font-semibold text-brand-dark sm:text-3xl">
                    {title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-brand-slate">
                    {description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-lapis py-10 text-brand-background sm:py-12 lg:py-16">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-accent">
                Connected practice support
              </p>
              <h2 className="text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight text-brand-background sm:text-5xl lg:text-6xl">
                Why bring it under one roof?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-background/75 sm:text-lg">
                Practices can choose support across billing, enrollment,
                and administrative coordination. A connected relationship can
                make responsibilities and handoffs easier to discuss.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <ScrollReveal className="h-full">
              <article className="h-full rounded-2xl border border-brand-accent/45 bg-brand-background/10 p-6 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-brand-accent/75 hover:bg-brand-background/[0.13] motion-reduce:transition-none sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-accent text-brand-background">
                    <ListChecks size={21} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-brand-background sm:text-3xl">
                    Juggling separate vendors
                  </h3>
                </div>
                <ul className="mt-6 space-y-4">
                  {vendorChallenges.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-brand-background/75">
                      <ArrowRight size={18} className="mt-1 shrink-0 text-brand-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>

            <ScrollReveal delay={0.08} className="h-full">
              <article className="h-full rounded-2xl border border-brand-accent/45 bg-brand-background/10 p-6 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-brand-accent/75 hover:bg-brand-background/[0.13] motion-reduce:transition-none sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-accent text-brand-background">
                    <Workflow size={21} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-brand-background sm:text-3xl">
                    One connected team
                  </h3>
                </div>
                <ul className="mt-6 space-y-4">
                  {connectedSupport.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-brand-background/85">
                      <Check size={18} className="mt-1 shrink-0 text-brand-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12 lg:py-16">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="How we work with you"
              title="A clear path from first conversation to ongoing work"
              description="We agree on scope and communication with your practice before support begins. Each step leaves room for your team's review and decisions."
            />
          </ScrollReveal>
          <ol className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {onboardingSteps.map(({ title, description }, index) => (
              <li key={title} className="h-full">
                <ScrollReveal delay={index * 0.045} className="flex h-full">
                  <article className="group h-full rounded-2xl border border-brand-border bg-brand-background p-5 shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-accent/50 hover:shadow-card-hover motion-reduce:transition-none sm:p-6">
                    <span className="grid size-11 place-items-center rounded-full border border-brand-accent/15 bg-brand-peach/65 text-sm font-bold text-brand-accent-ink shadow-sm transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none">
                      0{index + 1}
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold leading-tight text-brand-dark sm:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-brand-slate">
                      {description}
                    </p>
                  </article>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-y border-brand-border/75 bg-brand-background-wash/30 py-10 sm:py-12 lg:py-16">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="A clear working arrangement"
              title="Know what happens at each step"
              description="Before work begins, your practice and CareSource can agree on scope, information access, review points, and how open questions are handed off."
            />
          </ScrollReveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { title: "Scope", description: "List the tasks included, what is outside the scope, and which systems or workflows they involve." },
              { title: "Practice review", description: "Identify which details need your team's confirmation, approval, or decision before moving forward." },
              { title: "Handoffs", description: "Agree how questions, updates, and next steps should be shared with the right practice contact." },
            ].map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.05} className="h-full">
                <article className="h-full rounded-2xl border border-brand-border bg-brand-background p-6 shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-accent/50 hover:shadow-card-hover motion-reduce:transition-none">
                  <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand-accent-ink">0{index + 1}</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-brand-dark">{item.title}</h2>
                  <p className="mt-3 text-base leading-relaxed text-brand-slate">{item.description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-lapis py-10 text-brand-background sm:py-12 lg:py-16">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-accent">
                  The source of care for your practice
                </p>
                <h2 className="text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight text-brand-background sm:text-5xl lg:text-6xl">
                  Let's talk about the support your team needs.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-background/75 sm:text-lg">
                  Share what your practice would like to improve, and we can
                  discuss a practical next step together.
                </p>
              </div>
              <Button
                href="/contact"
                size="lg"
                showArrow
                className="shrink-0 self-start"
              >
                Book a Free Audit
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}


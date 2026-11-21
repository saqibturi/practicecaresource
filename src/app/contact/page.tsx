import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { PageHeroImage } from "@/components/page-hero-image";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "./contact-form";
import { footerContact } from "@/lib/site";
import { serviceCatalog } from "@/data/services";

export const metadata: Metadata = {
  title: "Contact CareSource",
  description:
    "Contact CareSource to discuss medical billing and practice support for your team.",
};

const faqs = [
  {
    question: "What happens after I send a message?",
    answer:
      "CareSource reviews your request and follows up using the contact details you provide.",
  },
  {
    question: "Can I ask about more than one service?",
    answer:
      "Yes. Choose the service that is closest to your main question and mention any other areas in your message.",
  },
  {
    question: "Should I include patient information?",
    answer:
      "No. Please leave out patient names and any protected health information. Use the form only for general practice or business questions.",
  },
  {
    question: "What should I write in the message?",
    answer:
      "Share your practice goals, the service you are exploring, or a general description of the workflow you would like to discuss.",
  },
];

export default function ContactPage() {
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
                  Contact
                </li>
              </ol>
            </nav>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-accent-ink">
              Contact CareSource
            </p>
            <h1 className="text-balance font-display text-5xl font-semibold leading-[0.98] tracking-tight text-brand-dark sm:text-6xl lg:min-h-[2em] lg:text-7xl">
              Let’s talk about your practice.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg lg:min-h-[5.5rem]">
              Tell us what kind of support you are exploring. We can learn more
              about your practice and discuss a practical next step together.
            </p>
            <div className="mt-6 flex min-h-14 flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#contact-form" size="lg" showArrow>
                Send a message
              </Button>
              <a
                href={`mailto:${footerContact.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-5 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-background-wash/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink"
              >
                <Mail size={17} aria-hidden="true" />
                Email CareSource
              </a>
            </div>
          </ScrollReveal>
          <PageHeroImage src={serviceCatalog[2].imageSrc} alt="A team member coordinating work in a professional office" />
        </Container>
      </section>

      <section id="contact-form" className="scroll-mt-24 py-10 sm:py-12 lg:py-16">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <ScrollReveal className="space-y-4">
            <div className="mb-5">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-brand-accent-ink">
                Contact details
              </p>
              <h2 className="font-display text-3xl font-semibold leading-tight text-brand-dark sm:text-4xl">
                Reach our team.
              </h2>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-brand-border bg-brand-background p-5 shadow-card">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-peach/55 text-brand-accent-ink">
                <MapPin size={21} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-bold text-brand-dark">US Office</span>
                <span className="mt-1 block text-sm leading-relaxed text-brand-slate">1770 Crystal Drive, Arlington, VA 22202, USA</span>
              </span>
            </div>

            <a
              href={`tel:${footerContact.phoneHref}`}
              className="group flex items-start gap-4 rounded-2xl border border-brand-border bg-brand-background p-5 shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-accent/50 hover:shadow-card-hover motion-reduce:transition-none"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-peach/55 text-brand-accent-ink">
                <Phone size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-brand-dark">Phone</span>
                <span className="mt-1 block text-sm leading-relaxed text-brand-slate">{footerContact.phoneDisplay}</span>
              </span>
              <ArrowRight size={17} className="mt-1 ml-auto shrink-0 text-brand-accent-ink transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>

            <a
              href={`mailto:${footerContact.email}`}
              className="group flex items-start gap-4 rounded-2xl border border-brand-border bg-brand-background p-5 shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-accent/50 hover:shadow-card-hover motion-reduce:transition-none"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-peach/55 text-brand-accent-ink">
                <Mail size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-brand-dark">Email</span>
                <span className="mt-1 block break-all text-sm leading-relaxed text-brand-slate">{footerContact.email}</span>
              </span>
              <ArrowRight size={17} className="mt-1 ml-auto shrink-0 text-brand-accent-ink transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-brand-border bg-brand-background p-5 shadow-card">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-peach/55 text-brand-accent-ink">
                <Clock3 size={20} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-bold text-brand-dark">Hours</span>
                <span className="mt-1 block text-sm leading-relaxed text-brand-slate">Mon–Fri · 8:00 AM–7:00 PM PT</span>
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="rounded-3xl border border-brand-border bg-brand-background p-5 shadow-card sm:p-8 lg:p-9">
              <h2 className="mb-6 font-display text-3xl font-semibold leading-tight text-brand-dark sm:text-4xl">
                Send us a message
              </h2>
              <ContactForm simple />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="border-y border-brand-border/75 bg-brand-background-wash/30 py-10 sm:py-12 lg:py-16">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="A few helpful details"
              title="Before you send your message"
              description="Here are quick answers to common questions about getting in touch with CareSource."
            />
          </ScrollReveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map(({ question, answer }, index) => (
              <ScrollReveal key={question} delay={index * 0.05} className="h-full">
                <article className="h-full rounded-2xl border border-brand-border bg-brand-background p-6 shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-accent/50 hover:shadow-card-hover motion-reduce:transition-none sm:p-7">
                  <h3 className="font-display text-xl font-semibold leading-tight text-brand-dark sm:text-2xl">
                    {question}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-brand-slate">
                    {answer}
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
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-accent">
                  CareSource
                </p>
                <h2 className="text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight text-brand-background sm:text-5xl lg:text-6xl">
                  Start with a conversation about your practice.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-background/75 sm:text-lg">
                  Use the form above or reach out by email when you’re ready to
                  talk through your next step.
                </p>
              </div>
              <Button href={`mailto:${footerContact.email}`} size="lg" showArrow className="shrink-0 self-start">
                Email CareSource
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Container } from "@/components/container";
import { footerContact, footerQuickLinks, services } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-brand-lapis-hover text-brand-background">
      <Container className="pb-5 pt-5 sm:pb-6 sm:pt-6 lg:pb-7 lg:pt-7">
        <div className="grid gap-8 border-b border-brand-background/15 pb-6 md:grid-cols-[1.3fr_0.7fr_0.9fr_1fr] md:gap-8 lg:pb-8">
          <div className="max-w-sm">
            <Link href="/" aria-label="CareSource home" className="inline-block rounded-md">
              <Image
                src="/logo.png"
                alt="Practice Care Source"
                width={219}
                height={60}
                className="h-auto w-[194px]"
              />
            </Link>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-brand-background/75">
              {footerContact.tagline}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-brand-background">
              Quick links
            </h2>
            <ul className="mt-4 space-y-2.5">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-background/75 transition-colors hover:text-brand-accent focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-brand-background">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={"/services/" + service.slug}
                    className="text-sm text-brand-background/75 transition-colors hover:text-brand-accent focus-visible:outline-none"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-brand-background">
              Contact
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={"mailto:" + footerContact.email}
                  className="inline-flex items-start gap-2.5 text-sm text-brand-background/75 transition-colors hover:text-brand-accent focus-visible:outline-none"
                >
                  <Mail size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{footerContact.email}</span>
                  <ArrowUpRight size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={"tel:" + footerContact.phoneHref}
                  className="inline-flex items-center gap-2.5 text-sm text-brand-background/75 transition-colors hover:text-brand-accent focus-visible:outline-none"
                >
                  <Phone size={17} aria-hidden="true" />
                  <span>{footerContact.phoneDisplay}</span>
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-pill bg-brand-accent px-5 text-sm font-bold text-brand-background transition-transform hover:-translate-y-0.5 focus-visible:outline-none"
            >
              Book a Free Audit
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-4 text-sm text-brand-background/75 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CareSource. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}


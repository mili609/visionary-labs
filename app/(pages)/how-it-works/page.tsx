'use client';

import { Footer } from "@/components/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { PremiumButton } from "@/components/PremiumButton";
import Link from "next/link";
import { ArrowRight, Users, Stethoscope, FlaskConical, BookMarked, CheckCircle2, type LucideIcon } from "lucide-react";

function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="relative isolate overflow-hidden pt-40 pb-20">
      <div className="absolute inset-0 -z-10 bg-hero-glow" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-50">
        <div className="h-[500px] w-[500px] rounded-full border border-primary/10 animate-spin-slow" />
      </div>
      <div className="container-premium text-center max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-5 animate-fade-in">{eyebrow}</p>
        <h1 className="text-4xl md:text-6xl font-bold font-display text-gradient leading-[1.08] animate-fade-up">{title}</h1>
        <p className="mt-6 text-base md:text-lg text-muted-foreground animate-fade-up [animation-delay:120ms]">{subtitle}</p>
      </div>
    </section>
  );
}

function Block({
  side, icon: Icon, eyebrow, title, points,
}: { side: "left" | "right"; icon: LucideIcon; eyebrow: string; title: string; points: string[] }) {
  return (
    <section className="py-20">
      <div className="container-premium">
        <div className={`grid items-center gap-12 lg:grid-cols-2 ${side === "right" ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">{eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient leading-tight mb-6">{title}</h2>
            <ul className="space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin-slow" />
              <div className="absolute inset-8 rounded-full border border-primary/15 animate-spin-slower" />
              <div className="absolute inset-16 rounded-full border border-primary/10 animate-spin-slow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-primary/30 blur-3xl" />
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-primary shadow-glow">
                    <Icon className="h-12 w-12 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HowItWorks() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <main>
        <PageHero eyebrow="How It Works" title="How MyoPREVA™ works." subtitle="A scientific approach to slowing myopia progression — engineered with precision optics and clinical research." />

        <Block side="left" icon={Users} eyebrow="For Parents" title="Protecting your child's vision, today." points={[
          "Specially designed lenses your child wears like normal glasses.",
          "Clinically engineered to slow the progression of myopia.",
          "Comfortable, lightweight and built for everyday use.",
        ]} />

        <Block side="right" icon={CheckCircle2} eyebrow="Why Choose MyoPREVA™" title="Premium care, made accessible." points={[
          "Patented optical defocus technology.",
          "Designed for global accessibility and affordability.",
          "Trusted by eye care professionals worldwide.",
        ]} />

        <Block side="left" icon={Stethoscope} eyebrow="For Eye Care Professionals" title="A clinical partner you can trust." points={[
          "Comprehensive fitting and prescribing protocols.",
          "Clinical resources and ongoing practitioner support.",
          "Built on peer-reviewed research and real-world outcomes.",
        ]} />

        <Block side="right" icon={FlaskConical} eyebrow="Scientific Foundation" title="Built on rigorous research." points={[
          "Decades of myopia control research distilled into one product.",
          "Continuous R&D in collaboration with global experts.",
          "Evidence-based design at every step.",
        ]} />

        <section className="py-24">
          <div className="container-premium">
            <div className="reveal max-w-2xl mb-10">
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">References</p>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-gradient">Supporting research</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="reveal glass-card rounded-2xl p-6 flex items-start gap-4">
                  <BookMarked className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">Reference Study {n}</p>
                    <p className="text-xs text-muted-foreground mt-1">Peer-reviewed research supporting the clinical efficacy of MyoPREVA™ optical defocus technology.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-premium text-center">
            <Link href="/get-started"><PremiumButton>Order MyoPREVA™ <ArrowRight className="h-4 w-4" /></PremiumButton></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

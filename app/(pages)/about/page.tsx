'use client';

import { Footer } from "@/components/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { PremiumButton } from "@/components/PremiumButton";
import Link from "next/link";
import { ArrowRight, Target, Lightbulb, Heart, Globe } from "lucide-react";

const pillars = [
  { icon: Target, title: "Mission", desc: "To make effective myopia control accessible to every child, in every community, around the world." },
  { icon: Lightbulb, title: "Focus", desc: "Solving one of the fastest-growing children's health challenges of our generation through optical innovation." },
  { icon: Heart, title: "Innovation", desc: "Patented lens technology engineered with leading scientists, optometrists and ophthalmologists." },
  { icon: Globe, title: "For Everyone", desc: "Designed to be affordable, comfortable and clinically trusted — built for global scale." },
];

const partners = ["Vision Health", "Global Eye Foundation", "International Optics", "Pediatric Vision Network", "ClearSight Labs", "OptiCare Alliance"];

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

export default function About() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <main>
        <PageHero eyebrow="About Us" title="A company built to protect children's vision." subtitle="MyoPREVA™ is a healthcare technology company dedicated to slowing myopia progression — combining patented optics with global accessibility." />

        <section className="py-24">
          <div className="container-premium grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <article key={p.title} className="reveal glass-card rounded-3xl p-8" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary/20 ring-1 ring-primary/30 text-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-24">
          <div className="container-premium">
            <div className="reveal max-w-2xl mb-14">
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Partners</p>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-gradient leading-tight">Trusted by organizations worldwide</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {partners.map((p, i) => (
                <div key={p} className="reveal group flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] text-muted-foreground/70 transition-all duration-500 hover:border-primary/30 hover:text-white hover:-translate-y-1" style={{ transitionDelay: `${i * 60}ms` }}>
                  <span className="text-sm font-display font-semibold tracking-wide grayscale group-hover:grayscale-0 transition">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container-premium">
            <div className="reveal relative overflow-hidden rounded-[2rem] border border-primary/20 bg-surface/60 px-8 py-20 text-center">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,hsl(197_100%_50%/0.18),transparent_70%)]" />
              <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient max-w-2xl mx-auto">Partner with us to protect the next generation.</h2>
              <div className="mt-8 flex justify-center">
                <Link href="/get-started"><PremiumButton>Get in Touch <ArrowRight className="h-4 w-4" /></PremiumButton></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

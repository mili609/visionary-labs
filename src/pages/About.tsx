import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { PremiumButton } from "@/components/PremiumButton";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Lightbulb, Heart, Globe } from "lucide-react";

const pillars = [
  { icon: Target, title: "Mission", desc: "To make effective myopia control accessible to every child, in every community, around the world." },
  { icon: Lightbulb, title: "Focus", desc: "Solving one of the fastest-growing children's health challenges of our generation through optical innovation." },
  { icon: Heart, title: "Innovation", desc: "Patented lens technology engineered with leading scientists, optometrists and ophthalmologists." },
  { icon: Globe, title: "For Everyone", desc: "Designed to be affordable, comfortable and clinically trusted — built for global scale." },
];

const partners = ["Vision Health", "Global Eye Foundation", "International Optics", "Pediatric Vision Network", "ClearSight Labs", "OptiCare Alliance"];

const About = () => {
  useReveal();
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <PageHero eyebrow="About Us" title="Protecting children's vision globally." subtitle="MyoPREVA™ is a healthcare technology company dedicated to advancing myopia control — combining patented optics with accessibility." />

        {/* Mission & Values - Light Premium Section */}
        <section className="relative py-24 md:py-32 bg-slate-50 light-section">
          <div className="container-premium">
            <div className="grid gap-8 lg:grid-cols-2 items-center mb-16">
              <div className="reveal">
                <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">Our Foundation</p>
                <h2 className="text-4xl md:text-5xl font-bold font-display text-gradient-blue leading-tight mb-6">
                  Four pillars of excellence
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Built on mission-driven innovation, clinical rigor, global accessibility, and unwavering commitment to protecting children's vision worldwide.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((p, i) => (
                <article 
                  key={p.title} 
                  className="reveal card-premium rounded-3xl p-8 group hover:shadow-xl hover:-translate-y-2 transition-all duration-300" 
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 ring-1 ring-primary/20 text-primary group-hover:scale-110 transition-transform duration-300">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Partners - Navy Premium Section */}
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden dark-section">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="container-premium relative z-10">
            <div className="reveal max-w-2xl mb-16">
              <p className="text-xs uppercase tracking-[0.25em] text-primary/90 font-semibold mb-4">Global Partners</p>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-gradient leading-tight">
                Trusted by organizations worldwide
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {partners.map((p, i) => (
                <div 
                  key={p} 
                  className="reveal group flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm text-white/80 transition-all duration-500 hover:border-primary/50 hover:bg-white/10 hover:-translate-y-1 hover:text-white hover:shadow-lg" 
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="text-sm font-display font-semibold tracking-wide text-center px-2">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Premium White Section */}
        <section className="relative py-24 md:py-32 bg-slate-50 light-section">
          <div className="container-premium max-w-5xl mx-auto">
            <div className="reveal card-premium rounded-3xl px-8 md:px-16 py-20 md:py-32 overflow-hidden relative">
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-primary/8 blur-3xl" />
              
              <div className="relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-gradient-blue leading-tight mb-8">
                  Ready to make a global impact?
                </h2>
                <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-12 font-medium">
                  Join us in our mission to protect millions of children's vision. Partner with the world's leading myopia control innovators.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                  <Link to="/get-started"><PremiumButton size="lg">Get Started <ArrowRight className="h-4 w-4" /></PremiumButton></Link>
                  <Link to="/how-it-works"><PremiumButton variant="ghost" size="lg">Learn More</PremiumButton></Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="relative isolate overflow-hidden pt-40 md:pt-48 pb-20 md:pb-28 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 dark-section">
      {/* Premium background animations */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float-delayed" />
      </div>

      {/* Animated rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-30">
        <div className="relative h-[500px] w-[500px] md:h-[600px] md:w-[600px] animate-spin-slow">
          <div className="absolute inset-0 rounded-full border border-primary/15 shadow-[0_0_30px_hsl(197_100%_50%/0.15)]" />
          <div className="absolute inset-12 rounded-full border border-primary/10" />
          <div className="absolute inset-24 rounded-full border border-primary/8" />
        </div>
      </div>

      <div className="container-premium text-center max-w-3xl mx-auto relative z-10">
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-6 animate-fade-in">
          {eyebrow}
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-gradient leading-[1.08] animate-fade-up text-white">
          {title}
        </h1>
        <p className="mt-8 text-base md:text-lg text-slate-300 font-medium animate-fade-up [animation-delay:120ms]">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

export default About;

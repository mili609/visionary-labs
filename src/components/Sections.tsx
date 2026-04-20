import { BookOpen, Microscope, ShieldCheck, Sparkles, Eye, Activity, GraduationCap, Globe2 } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { PremiumButton } from "./PremiumButton";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const educational = [
  { icon: BookOpen, title: "Understanding Myopia", desc: "Clear, science-backed education for parents and patients on how myopia develops." },
  { icon: Microscope, title: "The Research Behind MyoPREVA™", desc: "Built on years of peer-reviewed clinical research in optical defocus technology." },
  { icon: GraduationCap, title: "Resources for Practitioners", desc: "Training, fitting guides and clinical materials for eye care professionals." },
  { icon: Globe2, title: "A Global Mission", desc: "Bringing accessible myopia control to children worldwide — regardless of geography." },
];

const stats = [
  { value: "50%", label: "of the world's population is projected to be myopic by 2050" },
  { value: "5x", label: "higher risk of retinal detachment with high myopia" },
  { value: "1B+", label: "people projected to suffer from high myopia globally" },
  { value: "Early", label: "intervention is the most effective protection" },
];

const features = [
  { icon: Eye, title: "Patented Optics", desc: "A proprietary lens design engineered specifically to slow eye elongation in children." },
  { icon: ShieldCheck, title: "Clinically Trusted", desc: "Backed by rigorous clinical research and trusted by eye care professionals." },
  { icon: Sparkles, title: "Built for Everyone", desc: "Comfortable, affordable, and designed to be accessible to children everywhere." },
];

export function Sections() {
  useReveal();
  return (
    <>
      {/* Educational - Premium Light Section */}
      <Section 
        eyebrow="Educational Resources" 
        title="Knowledge that protects vision" 
        subtitle="Premium resources, designed to help families and clinicians understand and act on myopia."
        variant="light"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {educational.map((c, i) => (
            <article 
              key={c.title} 
              className="reveal card-premium rounded-3xl p-8 group transition-all duration-300 hover:shadow-xl" 
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 ring-1 ring-primary/20 text-primary group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3 font-display">{c.title}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{c.desc}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Danger of Myopia - Navy Premium Section */}
      <Section 
        eyebrow="The Challenge" 
        title="Why myopia matters" 
        subtitle="Myopia isn't just blurry vision — it's a critical health challenge affecting millions of children globally."
        variant="navy"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div 
              key={s.label} 
              className="reveal relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-sm p-8 hover:border-white/25 hover:bg-white/20 transition-all duration-300 group" 
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-primary/15 blur-3xl group-hover:bg-primary/20 transition-colors" />
              <Activity className="h-6 w-6 text-primary/90 mb-5 relative z-10" />
              <div className="text-4xl md:text-5xl font-bold font-display text-white mb-4 relative z-10">{s.value}</div>
              <p className="text-sm text-white/95 leading-relaxed font-medium relative z-10">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose MyoPREVA - Light Premium Section */}
      <Section 
        eyebrow="Why MyoPREVA™" 
        title="Engineered for the next generation" 
        subtitle="Three scientific reasons leading families and clinicians choose MyoPREVA™."
        variant="light"
      >
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <div 
              key={f.title} 
              className="reveal group relative overflow-hidden rounded-3xl card-premium p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2" 
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute -inset-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top,hsl(197_100%_50%/0.08),transparent_60%)] blur-2xl" />
              <div className="relative">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 mb-4">{f.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA - Dark Navy Premium Section */}
      <section className="relative py-32 md:py-40 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden dark-section">
        {/* Premium background elements */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-float" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-primary/15 blur-3xl animate-float-delayed" />
        </div>

        <div className="container-premium relative z-10">
          <div className="reveal max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 mb-10 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-subtle" />
              <span className="text-xs uppercase tracking-widest text-primary font-bold">Ready to make a difference</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-tight mb-8">
              The future of children's eye care starts today.
            </h2>
            <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-12 font-medium">
              Join thousands of families and practitioners protecting children's vision with MyoPREVA™ — backed by science, trusted by professionals worldwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link to="/get-started">
                <PremiumButton size="lg">Get Started <ArrowRight className="h-4 w-4" /></PremiumButton>
              </Link>
              <Link to="/how-it-works">
                <PremiumButton variant="ghost" size="lg">Learn More</PremiumButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({
  eyebrow, title, subtitle, children, variant = "dark",
}: { eyebrow: string; title: string; subtitle: string; children: React.ReactNode; variant?: "light" | "blue-gray" | "dark" | "navy" }) {
  const bgClass = {
    light: "bg-slate-50",
    "blue-gray": "bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50",
    dark: "bg-slate-950",
    navy: "bg-gradient-to-b from-slate-950 to-slate-900"
  }[variant];

  const textClass = {
    light: "text-slate-900",
    "blue-gray": "text-slate-900",
    dark: "text-white",
    navy: "text-white"
  }[variant];

  const subtitleTextClass = {
    light: "text-slate-700",
    "blue-gray": "text-slate-700",
    dark: "text-slate-300",
    navy: "text-slate-300"
  }[variant];

  const eyebrowColorClass = {
    light: "text-primary",
    "blue-gray": "text-primary",
    dark: "text-primary/90",
    navy: "text-primary/95"
  }[variant];

  return (
    <section className={`relative py-24 md:py-32 ${bgClass} ${variant === "light" || variant === "blue-gray" ? "light-section" : "dark-section"}`}>
      <div className="container-premium">
        <div className={`reveal max-w-3xl mb-16`}>
          <p className={`text-xs uppercase tracking-[0.3em] ${eyebrowColorClass} mb-5 font-bold`}>{eyebrow}</p>
          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold font-display leading-tight ${variant === "dark" || variant === "navy" ? "text-gradient" : "text-gradient-blue"}`}>{title}</h2>
          <p className={`mt-6 text-base md:text-lg ${subtitleTextClass} max-w-2xl font-medium`}>{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

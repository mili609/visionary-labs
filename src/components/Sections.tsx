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
      {/* Educational */}
      <Section eyebrow="Educational" title="Knowledge that protects vision" subtitle="Premium resources, designed to help families and clinicians understand and act on myopia.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {educational.map((c, i) => (
            <article key={c.title} className="reveal glass-card group rounded-3xl p-7" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary/20 ring-1 ring-primary/30 text-primary group-hover:shadow-glow transition-all duration-500">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 font-display">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Danger of Myopia */}
      <Section eyebrow="Why It Matters" title="The growing danger of myopia" subtitle="Myopia isn't just blurry vision — it's a global health crisis with serious long-term risks.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="reveal relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
              <Activity className="h-5 w-5 text-primary mb-4" />
              <div className="text-4xl md:text-5xl font-bold font-display text-gradient mb-3">{s.value}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose MyoPREVA */}
      <Section eyebrow="Why MyoPREVA™" title="Engineered for the next generation" subtitle="Three reasons leading families and clinicians choose MyoPREVA™.">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <div key={f.title} className="reveal group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/40 p-8 transition-all duration-500 hover:border-primary/40 hover:-translate-y-1" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top,hsl(197_100%_50%/0.18),transparent_60%)]" />
              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold font-display text-white mb-3">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="relative py-32">
        <div className="container-premium">
          <div className="reveal relative overflow-hidden rounded-[2rem] border border-primary/20 bg-surface/60 px-8 py-20 md:px-20 md:py-28 text-center">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,hsl(197_100%_50%/0.18),transparent_70%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <h2 className="text-3xl md:text-5xl font-bold font-display text-gradient max-w-3xl mx-auto leading-tight">
              The future of children's eye care starts here.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base md:text-lg text-muted-foreground">
              Join the families and practitioners already trusting MyoPREVA™ to slow myopia progression.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/get-started">
                <PremiumButton>Order Now <ArrowRight className="h-4 w-4" /></PremiumButton>
              </Link>
              <Link to="/how-it-works">
                <PremiumButton variant="ghost">Learn More</PremiumButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({
  eyebrow, title, subtitle, children,
}: { eyebrow: string; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-premium">
        <div className="reveal max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">{eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-gradient leading-tight">{title}</h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

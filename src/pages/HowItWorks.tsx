import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { PageHero } from "./About";
import { PremiumButton } from "@/components/PremiumButton";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Stethoscope, FlaskConical, BookMarked, CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
  useReveal();
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <PageHero eyebrow="How It Works" title="How MyoPREVA™ works." subtitle="A scientific approach to slowing myopia progression — engineered with precision optics and clinical research." />

        {/* For Parents Section */}
        <Block side="left" icon={Users} eyebrow="For Parents" title="Protecting your child's vision, today." points={[
          "Specially designed lenses your child wears like normal glasses.",
          "Clinically engineered to slow the progression of myopia.",
          "Comfortable, lightweight and built for everyday use.",
        ]} />

        {/* Why Choose Section */}
        <Block side="right" icon={CheckCircle2} eyebrow="Why Choose MyoPREVA™" title="Premium care, made accessible." points={[
          "Patented optical defocus technology.",
          "Designed for global accessibility and affordability.",
          "Trusted by eye care professionals worldwide.",
        ]} />

        {/* For Eye Care Professionals */}
        <Block side="left" icon={Stethoscope} eyebrow="For Eye Care Professionals" title="A clinical partner you can trust." points={[
          "Comprehensive fitting and prescribing protocols.",
          "Clinical resources and ongoing practitioner support.",
          "Built on peer-reviewed research and real-world outcomes.",
        ]} />

        {/* Scientific Foundation */}
        <Block side="right" icon={FlaskConical} eyebrow="Scientific Foundation" title="Built on rigorous research." points={[
          "Decades of myopia control research distilled into one product.",
          "Continuous R&D in collaboration with global experts.",
          "Evidence-based design at every step.",
        ]} />

        {/* Supporting Research - Premium Navy Section */}
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden dark-section">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="container-premium relative z-10">
            <div className="reveal max-w-2xl mb-16">
              <p className="text-xs uppercase tracking-[0.25em] text-primary/90 font-semibold mb-4">References</p>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-gradient leading-tight">
                Supporting research
              </h2>
              <p className="text-lg text-slate-300 mt-6">
                Our work is built on decades of peer-reviewed research in myopia control optics and clinical outcomes.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((n, i) => (
                <div 
                  key={n} 
                  className="reveal relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 hover:border-primary/30 hover:bg-white/15 transition-all duration-300 group" 
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-colors duration-300" />
                  <BookMarked className="h-6 w-6 text-primary/80 mb-4 relative z-10" />
                  <p className="text-sm font-semibold text-white mb-2 relative z-10">Reference Study {n}</p>
                  <p className="text-xs text-white/80 leading-relaxed relative z-10">Peer-reviewed research supporting the clinical efficacy of MyoPREVA™ optical defocus technology and myopia control mechanisms.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Light Premium Section */}
        <section className="relative py-24 md:py-32 bg-slate-50 light-section">
          <div className="container-premium max-w-5xl mx-auto">
            <div className="reveal card-premium rounded-3xl px-8 md:px-16 py-20 md:py-32 overflow-hidden relative">
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-primary/8 blur-3xl" />
              
              <div className="relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-gradient-blue leading-tight mb-8">
                  Ready to protect your child's vision?
                </h2>
                <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-12 font-medium">
                  Order MyoPREVA™ today and join thousands of families already safeguarding the next generation's eyesight.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                  <Link to="/get-started"><PremiumButton size="lg">Order MyoPREVA™ <ArrowRight className="h-4 w-4" /></PremiumButton></Link>
                  <Link to="/about"><PremiumButton variant="ghost" size="lg">Learn About Us</PremiumButton></Link>
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

function Block({
  side, icon: Icon, eyebrow, title, points,
}: { side: "left" | "right"; icon: any; eyebrow: string; title: string; points: string[] }) {
  return (
    <section className="relative py-24 md:py-32 bg-slate-50 light-section">
      <div className="container-premium">
        <div className={`grid items-center gap-12 lg:gap-16 lg:grid-cols-2 ${side === "right" ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">{eyebrow}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-gradient-blue leading-tight mb-8">{title}</h2>
            <ul className="space-y-5">
              {points.map((p, i) => (
                <li key={p} className="flex items-start gap-4 group" style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="flex-shrink-0 mt-1.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 ring-1 ring-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <span className="text-base md:text-lg text-slate-700 leading-relaxed font-medium">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="reveal relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Animated rings with enhanced visibility */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/35 shadow-[0_0_40px_hsl(197_100%_50%/0.3)] animate-spin-slow" />
              <div className="absolute inset-8 rounded-full border border-primary/25 shadow-[0_0_25px_hsl(197_100%_50%/0.2)]" />
              <div className="absolute inset-16 rounded-full border border-primary/20 shadow-[0_0_20px_hsl(197_100%_50%/0.15)]" />
              <div className="absolute inset-28 rounded-full border border-primary/15" />
              
              {/* Center icon card */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-primary/15 blur-2xl group-hover:blur-3xl transition-all duration-500 shadow-[0_0_50px_hsl(197_100%_50%/0.25)]" />
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl card-premium shadow-lg group-hover:shadow-2xl group-hover:-translate-y-3 transition-all duration-500 border border-primary/20">
                    <Icon className="h-14 w-14 text-primary" />
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

export default HowItWorks;

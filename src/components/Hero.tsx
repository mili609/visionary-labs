import heroImg from "@/assets/hero-lens.jpg";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { PremiumButton } from "./PremiumButton";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-24 md:pt-44 md:pb-36">
      {/* Background lens image with motion */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60 animate-[pulse-glow_8s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 bg-hero-glow" />
      </div>

      {/* Animated rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-[600px] w-[600px] md:h-[820px] md:w-[820px]">
          <div className="absolute inset-0 rounded-full border border-primary/10 animate-spin-slow" />
          <div className="absolute inset-12 rounded-full border border-primary/15 animate-spin-slower" />
          <div className="absolute inset-24 rounded-full border border-primary/20 animate-spin-slow" />
          <div className="absolute inset-40 rounded-full border border-primary/10 animate-spin-slower" />
        </div>
      </div>

      {/* Light beam */}
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-40 overflow-hidden">
        <div className="absolute inset-y-0 -left-1/4 w-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-2xl animate-beam" />
      </div>

      <div className="container-premium relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md animate-fade-in">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Patented Myopia Control Technology
          </div>

          <h1 className="mt-8 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-gradient animate-fade-up">
            Make myopia control<br />accessible to <span className="italic font-display">all children.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-up [animation-delay:120ms]">
            Discover the science behind MyoPREVA™ — patented technology designed to slow myopia progression in children.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:240ms]">
            <Link to="/how-it-works">
              <PremiumButton>
                Explore Now <ArrowRight className="h-4 w-4" />
              </PremiumButton>
            </Link>
            <Link to="/get-started">
              <PremiumButton variant="ghost">
                <Play className="h-3.5 w-3.5 fill-white" /> Order Now
              </PremiumButton>
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 animate-fade-up [animation-delay:360ms]">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70">Trusted by leaders in eye care</p>
            <div className="flex items-center gap-8 opacity-60">
              {["AAO", "WHO", "ICEE", "IMI", "WCO"].map((n) => (
                <span key={n} className="text-sm font-display font-semibold tracking-widest text-muted-foreground/80">
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

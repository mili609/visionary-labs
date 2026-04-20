import heroImg from "@/assets/hero-lens.jpg";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { PremiumButton } from "./PremiumButton";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 md:pt-48 md:pb-40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      {/* Ambient gradient shift background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-slate-900 via-[#06203d] to-slate-950 animate-ambient-gradient" />

      {/* Premium background elements - animated */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Parallax depth layers - slower moving circles */}
        <div className="absolute -top-20 left-1/4 w-96 h-96 rounded-full bg-blue-600/6 blur-3xl opacity-30 animate-parallax-slower" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-cyan-500/8 blur-3xl opacity-25 animate-parallax-slow" />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-950/50 to-slate-950/70" />
        
        {/* Floating particle lights - tiny glowing dots */}
        <div className="absolute top-1/3 left-1/4 w-1 h-1 rounded-full bg-cyan-400 opacity-60 blur-[1px] animate-float-particle" />
        <div className="absolute top-2/3 right-1/3 w-0.5 h-0.5 rounded-full bg-blue-400 opacity-40 blur-[0.5px] animate-float-particle [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/3 w-1 h-1 rounded-full bg-cyan-300 opacity-50 blur-[1px] animate-float-particle [animation-delay:4s]" />
        <div className="absolute top-1/4 right-1/4 w-0.5 h-0.5 rounded-full bg-blue-300 opacity-35 blur-[0.5px] animate-float-particle [animation-delay:1s]" />
        <div className="absolute top-2/3 left-1/2 w-1 h-1 rounded-full bg-cyan-400 opacity-45 blur-[1px] animate-float-particle [animation-delay:3s]" />
        
        {/* Animated gradient orbs with cinematic zoom */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl opacity-40 animate-float" />
        <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl opacity-30 animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full bg-blue-600/8 blur-3xl opacity-40 animate-pulse-subtle" />
        
        {/* Lens image overlay with zoom */}
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20 animate-[zoom_14s_ease-in-out_infinite]"
          style={{ transformOrigin: 'center center', willChange: 'transform' }}
        />

        {/* Outer edge vignette - subtle corner darkening */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-900/30 animate-vignette-pulse" />
      </div>

      {/* Animated rings - rotating premium style */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-[600px] w-[600px] md:h-[820px] md:w-[820px] animate-spin-slow">
          <div className="absolute inset-0 rounded-full border border-cyan-400/25 shadow-[0_0_40px_hsl(185_100%_50%/0.3)]" />
          <div className="absolute inset-12 rounded-full border border-cyan-400/15" />
          <div className="absolute inset-24 rounded-full border border-cyan-400/10" />
          <div className="absolute inset-40 rounded-full border border-cyan-400/12 shadow-[0_0_20px_hsl(185_100%_50%/0.15)]" />
        </div>

        {/* Shimmer ring strokes - elegant futuristic overlay */}
        <div className="absolute -inset-16 md:-inset-24 rounded-full border border-cyan-300/8 animate-shimmer-flicker" />
        <div className="absolute -inset-32 md:-inset-44 rounded-full border border-blue-300/6 animate-shimmer-flicker [animation-delay:0.5s]" />

        {/* Pulse glow from center */}
        <div className="absolute inset-1/3 md:inset-[40%] rounded-full bg-gradient-to-b from-cyan-400/20 via-cyan-400/10 to-transparent blur-2xl animate-pulse-glow-center" />
      </div>

      {/* Enhanced light sweep - occasional soft horizontal beam */}
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-40 overflow-hidden">
        <div className="absolute inset-y-0 -left-1/4 w-1/2 bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent blur-3xl animate-light-sweep [animation-delay:2s]" />
        <div className="absolute inset-y-0 -left-1/4 w-1/2 bg-gradient-to-r from-transparent via-blue-300/10 to-transparent blur-3xl animate-light-sweep [animation-delay:8s]" />
      </div>

      <div className="container-premium relative z-10">
        <div className="mx-auto max-w-4xl text-center hero-content-overlay">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-bold text-cyan-300 backdrop-blur-sm mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Patented Myopia Control Technology
          </div>

          {/* Main heading - pure white for max readability */}
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] font-display text-white animate-fade-up drop-shadow-2xl">
            Make myopia control <br className="hidden sm:block" />
            <span className="text-gradient-cyan">accessible to all children.</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-slate-100 leading-relaxed animate-fade-up [animation-delay:100ms] font-medium drop-shadow-lg">
            Discover the science behind MyoPREVA™ — patented optical defocus technology designed to slow myopia progression and protect children's vision worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up [animation-delay:200ms]">
            <Link to="/how-it-works">
              <PremiumButton size="lg">
                Explore Now <ArrowRight className="h-4 w-4" />
              </PremiumButton>
            </Link>
            <Link to="/get-started">
              <PremiumButton variant="outline" size="lg">
                <Play className="h-3.5 w-3.5 fill-slate-900" /> Order Now
              </PremiumButton>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-20 pt-8 border-t border-slate-400/30 animate-fade-up [animation-delay:300ms]">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-200 font-bold mb-8">Trusted by leading organizations worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {["AAO", "WHO", "ICEE", "IMI", "WCO"].map((n) => (
                <span key={n} className="text-lg md:text-xl font-display font-bold tracking-widest text-slate-100 hover:text-cyan-300 hover:scale-110 transition-all duration-300">
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

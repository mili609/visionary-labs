import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/myopreva-logo.png";
import { PremiumButton } from "./PremiumButton";
import { cn } from "@/lib/utils";

const links = [
  { to: "/about", label: "About Us" },
  { to: "/how-it-works", label: "How It Works" },
];

// Pages with light backgrounds that need dark navbar styling from first render
const LIGHT_BACKGROUND_PAGES = ["/get-started"];

export function Navbar() {
  const location = useLocation();
  const isLightPage = LIGHT_BACKGROUND_PAGES.includes(location.pathname);
  
  const [scrolled, setScrolled] = useState(isLightPage);
  const [open, setOpen] = useState(false);

  // Determine if navbar should be dark based on light page or scroll position
  const isDarkNavbar = isLightPage || scrolled;

  useEffect(() => {
    const onScroll = () => {
      // Force dark mode on light background pages, otherwise use scroll position
      setScrolled(isLightPage ? true : window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLightPage]);

  // Update scroll state when route changes to ensure correct initial state
  useEffect(() => {
    setScrolled(isLightPage);
  }, [isLightPage]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled ? "py-3" : "py-4"
      )}
    >
      <div className="container-premium">
        <nav
          className={cn(
            "glass flex items-center justify-between rounded-full pl-3 pr-2 py-2.5 transition-all duration-500",
            isDarkNavbar
              ? "bg-slate-950/90 shadow-[0_8px_30px_-12px_hsl(0_0%_0%/0.8)] backdrop-blur-xl"
              : "bg-white/[0.08] backdrop-blur-md border border-white/15"
          )}
        >
          <Link 
            to="/" 
            className={cn(
              "flex items-center gap-2 pl-2 group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full px-2 py-1.5 transition-all duration-300",
              isDarkNavbar ? "" : "logo-glow"
            )}
            aria-label="Go to homepage"
            title="Back to Home"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {/* Logo image - always show colorful */}
            <img
              src={logo}
              alt="MyoPREVA Logo"
              className="h-7 md:h-8 w-auto transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 opacity-100"
              style={{
                filter: "none",
                mixBlendMode: "normal",
              }}
            />
            
            {/* Decorative line on hover */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent group-hover:w-8 transition-all duration-300" />
          </Link>

          <ul className="hidden md:flex items-center gap-2">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    cn(
                      "relative px-5 py-2.5 text-sm font-bold transition-all duration-300 group text-slate-100 hover:text-white",
                      isActive && "text-white"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      <span
                        className={cn(
                          "absolute left-5 right-5 -bottom-0.5 h-1 bg-cyan-400 rounded-full transition-all duration-300",
                          isActive ? "opacity-100 scale-x-100" : "opacity-0 group-hover:opacity-70 scale-x-0 group-hover:scale-x-75"
                        )}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center">
            <Link to="/get-started">
              <PremiumButton size="sm">
                Get Started <ArrowRight className="h-3.5 w-3.5" />
              </PremiumButton>
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 font-semibold",
              isDarkNavbar
                ? "border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                : "border-slate-400/50 text-slate-700 hover:bg-slate-200/50 hover:border-slate-500"
            )}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-[76px] z-40 transition-all duration-500",
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="container-premium">
          <div className={cn(
            "glass rounded-3xl p-6 transition-colors duration-300",
            isDarkNavbar ? "bg-slate-950/95" : "bg-slate-100/95"
          )}>
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        isDarkNavbar
                          ? isActive ? "bg-white/5 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
                          : isActive ? "bg-slate-200/60 text-slate-900" : "text-slate-700 hover:bg-slate-200/40 hover:text-slate-900"
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link to="/get-started" onClick={() => setOpen(false)}>
                <PremiumButton variant={isDarkNavbar ? "primary" : "outline"} className="w-full">
                  Get Started <ArrowRight className="h-4 w-4" />
                </PremiumButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

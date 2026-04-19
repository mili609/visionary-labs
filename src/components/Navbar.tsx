import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/myopreva-logo.png";
import { PremiumButton } from "./PremiumButton";
import { cn } from "@/lib/utils";

const links = [
  { to: "/about", label: "About Us" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/get-started", label: "Get Started" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="container-premium">
        <nav
          className={cn(
            "glass flex items-center justify-between rounded-full pl-3 pr-3 py-2.5 transition-all duration-500",
            scrolled
              ? "bg-background/80 shadow-[0_8px_30px_-12px_hsl(0_0%_0%/0.6)]"
              : "bg-white/[0.02]"
          )}
        >
          <Link to="/" className="flex items-center gap-2 pl-2">
            <img
              src={logo}
              alt="MyoPREVA"
              className="h-7 md:h-8 w-auto invert brightness-0 contrast-100"
              style={{ filter: "invert(1) brightness(2)" }}
            />
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    cn(
                      "relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-300 group",
                      isActive && "text-white"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      <span
                        className={cn(
                          "absolute left-4 right-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-300",
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Link to="/get-started">
              <PremiumButton className="px-5 py-2.5 text-xs">
                Order Now <ArrowRight className="h-3.5 w-3.5" />
              </PremiumButton>
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white"
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
          <div className="glass rounded-3xl p-6 bg-background/95">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        isActive ? "bg-white/5 text-white" : "text-muted-foreground hover:bg-white/5 hover:text-white"
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
                <PremiumButton className="w-full">
                  Order Now <ArrowRight className="h-4 w-4" />
                </PremiumButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

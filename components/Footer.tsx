import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5 bg-surface/40">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="container-premium py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="h-8 font-bold text-white mb-6">MyoPREVA</div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Patented technology designed to slow myopia progression and make eye care accessible to all children.
            </p>
          </div>

          <FooterCol title="Explore" links={[
            { label: "About Us", href: "/about" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "Get Started", href: "/get-started" },
          ]} />

          <FooterCol title="Support" links={[
            { label: "FAQs", href: "#" },
            { label: "Eye Care Professionals", href: "/get-started" },
            { label: "Patient Resources", href: "#" },
            { label: "Research", href: "/how-it-works" },
          ]} />

          <div>
            <h4 className="mb-5 text-sm font-semibold text-white tracking-wide uppercase">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3"><Mail className="h-4 w-4 text-primary mt-0.5" /> hello@myopreva.com</li>
              <li className="flex items-start gap-3"><Phone className="h-4 w-4 text-primary mt-0.5" /> +1 (555) 010-2024</li>
              <li className="flex items-start gap-3"><MapPin className="h-4 w-4 text-primary mt-0.5" /> Global · Healthcare Innovation</li>
            </ul>
          </div>
        </div>

        <div className="glow-line my-12 opacity-50" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} MyoPREVA™. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-5 text-sm font-semibold text-white tracking-wide uppercase">{title}</h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

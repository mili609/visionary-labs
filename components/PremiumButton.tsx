import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  asChild?: boolean;
}

export const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const base =
      "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none overflow-hidden";

    if (variant === "ghost") {
      return (
        <button
          ref={ref}
          className={cn(
            base,
            "border border-white/20 bg-white/[0.02] text-white hover:bg-white/[0.06] hover:border-white/40 hover:-translate-y-0.5",
            className
          )}
          {...props}
        >
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          base,
          "bg-gradient-primary text-primary-foreground shadow-[0_8px_30px_-8px_hsl(197_100%_50%/0.6)] hover:shadow-[0_14px_44px_-10px_hsl(197_100%_50%/0.8)] hover:-translate-y-0.5 active:translate-y-0",
          className
        )}
        {...props}
      >
        {/* shimmer */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/30" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
PremiumButton.displayName = "PremiumButton";

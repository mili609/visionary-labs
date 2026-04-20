import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none overflow-hidden";

    const sizeStyles = {
      sm: "px-5 py-2.5 text-xs",
      md: "px-7 py-3.5 text-sm",
      lg: "px-10 py-4 text-base",
    };

    if (variant === "outline") {
      return (
        <button
          ref={ref}
          className={cn(
            baseStyles,
            sizeStyles[size],
            "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5 hover:shadow-md",
            className
          )}
          {...props}
        >
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </button>
      );
    }

    if (variant === "ghost") {
      return (
        <button
          ref={ref}
          className={cn(
            baseStyles,
            sizeStyles[size],
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
          baseStyles,
          sizeStyles[size],
          "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-bold shadow-[0_8px_30px_-8px_rgba(0,178,255,0.6)] hover:shadow-[0_14px_44px_-10px_rgba(0,178,255,0.8)] hover:-translate-y-0.5 active:translate-y-0",
          className
        )}
        {...props}
      >
        {/* shimmer */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/40" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
PremiumButton.displayName = "PremiumButton";

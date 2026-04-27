'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTop - Global scroll reset component
 * Resets the page scroll position to top whenever the route changes
 * Ensures every new page opens from the top
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top instantly on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

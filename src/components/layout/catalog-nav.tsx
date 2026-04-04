import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Horizontal nav that stays on one row: on narrow viewports it scrolls instead of wrapping.
 */
export function CatalogNav({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <nav
      aria-label="Site sections"
      className={cn(
        "min-w-0 flex-1 overflow-x-auto overscroll-x-contain rounded-full border border-border/80 bg-card/85 shadow-sm backdrop-blur-md",
        "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "touch-pan-x",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max flex-nowrap items-center gap-1.5 p-1",
          "[&>*]:shrink-0",
          "sm:ml-auto",
        )}
      >
        {children}
      </div>
    </nav>
  );
}

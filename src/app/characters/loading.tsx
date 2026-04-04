import { cn } from "@/lib/utils";

export default function CharactersLoading() {
  return (
    <div
      className={cn(
        "surface-story relative min-h-[calc(100dvh-theme(spacing.14))] overflow-x-clip bg-background text-foreground",
        "[--font-heading:var(--font-display)]",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 grain-overlay opacity-60 mix-blend-multiply"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <div className="mb-10 max-w-md space-y-3">
          <div className="h-3 w-32 animate-pulse rounded-full bg-muted" />
          <div className="h-9 w-48 animate-pulse rounded-lg bg-muted md:h-11 md:w-56" />
          <div className="h-4 w-full max-w-lg animate-pulse rounded bg-muted" />
          <div className="h-4 max-w-md w-[85%] animate-pulse rounded bg-muted" />
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {(["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"] as const).map(
            (id) => (
              <li key={id}>
                <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/80 shadow-sm">
                  <div className="aspect-[4/5] animate-pulse bg-gradient-to-br from-muted to-muted/40" />
                  <div className="space-y-3 p-5">
                    <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="flex gap-2">
                      <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
                      <div className="h-5 w-12 animate-pulse rounded-full bg-muted" />
                    </div>
                    <div className="h-px bg-border/60" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-4 animate-pulse rounded bg-muted" />
                      <div className="h-4 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
}

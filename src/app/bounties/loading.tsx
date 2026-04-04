import { cn } from "@/lib/utils";

export default function BountiesLoading() {
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
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md space-y-3">
            <div className="h-3 w-36 animate-pulse rounded-full bg-muted" />
            <div className="h-9 w-40 animate-pulse rounded-lg bg-muted md:h-11" />
            <div className="h-4 w-full max-w-lg animate-pulse rounded bg-muted" />
          </div>
          <div className="h-9 w-56 animate-pulse rounded-full bg-muted" />
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {(["bk-1", "bk-2", "bk-3", "bk-4", "bk-5", "bk-6"] as const).map(
            (id) => (
              <li key={id}>
                <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/80 shadow-sm">
                  <div className="h-32 animate-pulse bg-gradient-to-br from-amber-500/15 to-muted" />
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="h-px bg-border/60" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
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

import { Coins, Fingerprint } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ApiBountyRow = {
  id: string;
  amount: number | null;
  is_active: boolean;
  character_id: string | null;
  created_at: string;
};

function formatBerry(n: number | null): string {
  if (n === null || Number.isNaN(n)) return "—";
  return n.toLocaleString("en-US");
}

function shortId(id: string): string {
  return id.length > 8 ? `${id.slice(0, 8)}…` : id;
}

export function BountyCard({
  bounty,
  className,
}: {
  bounty: ApiBountyRow;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-sm backdrop-blur-md transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/10",
        className,
      )}
    >
      <div className="relative border-b border-amber-500/15 bg-gradient-to-br from-amber-500/12 via-card to-primary/10 px-5 py-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grain-overlay opacity-40 mix-blend-multiply"
        />
        <div className="relative flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-amber-900/90 dark:text-amber-100/90">
            <Coins aria-hidden className="size-5 shrink-0 opacity-80" />
            <span className="font-display text-[0.65rem] font-medium tracking-[0.2em] uppercase">
              Bounty
            </span>
          </div>
          <Badge
            className={cn(
              "rounded-full px-2.5 py-0.5 font-medium",
              bounty.is_active
                ? "border-emerald-500/35 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100"
                : "border-border/60 bg-muted/80 text-muted-foreground",
            )}
            variant="outline"
          >
            {bounty.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
        <p className="relative mt-4 font-display text-3xl font-medium tracking-tight text-balance text-foreground tabular-nums md:text-[2rem]">
          <span className="text-amber-700/90 dark:text-amber-200/90">฿</span>{" "}
          {formatBerry(bounty.amount)}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-1.5 text-[0.8125rem] text-muted-foreground">
          <div className="flex items-center gap-2 font-mono text-[0.6875rem] text-foreground/80">
            <Fingerprint aria-hidden className="size-3.5 shrink-0 opacity-60" />
            <span className="truncate" title={bounty.id}>
              {shortId(bounty.id)}
            </span>
          </div>
          <p>
            <span className="text-[0.65rem] font-medium tracking-wide uppercase">
              Character
            </span>
            <br />
            {bounty.character_id ? (
              <span
                className="font-mono text-foreground/90"
                title={bounty.character_id}
              >
                {shortId(bounty.character_id)}
              </span>
            ) : (
              <span className="italic">Not linked</span>
            )}
          </p>
        </div>
        <div className="mt-auto border-t border-border/50 pt-3">
          <p className="text-[0.65rem] text-muted-foreground">
            Added{" "}
            <time dateTime={bounty.created_at}>
              {new Date(bounty.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </p>
          <Link
            className="mt-2 inline-flex text-[0.8125rem] font-medium text-primary underline-offset-4 hover:underline"
            href="/characters"
          >
            Browse characters
          </Link>
        </div>
      </div>
    </article>
  );
}

import { Coins, Droplets, Ruler, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ApiBounty = {
  id: string;
  amount: number | null;
  is_active: boolean;
  character_id: string | null;
  created_at: string;
};

export type ApiCharacter = {
  id: string;
  name: unknown;
  status: string;
  age: number | null;
  blood_type: string;
  height: number | null;
  birthday: unknown;
  created_at: string;
  bounties?: ApiBounty[] | null;
};

function parseName(name: unknown): { title: string; lineJp?: string } {
  if (!name || typeof name !== "object") {
    return { title: "Unknown" };
  }
  const o = name as Record<string, unknown>;
  const en = typeof o.en === "string" ? o.en : "";
  const romaji = typeof o.romaji === "string" ? o.romaji : "";
  const jp = typeof o.jp === "string" ? o.jp : "";
  const title = en.trim() || romaji.trim() || jp.trim() || "Unknown";
  const lineJp =
    jp && jp !== title
      ? jp
      : romaji && romaji !== title && !en
        ? romaji
        : undefined;
  return { title, lineJp };
}

function formatBerry(n: number | null): string {
  if (n === null || Number.isNaN(n)) return "—";
  return `฿ ${n.toLocaleString("en-US")}`;
}

export function CharacterCard({
  character,
  className,
}: {
  character: ApiCharacter;
  className?: string;
}) {
  const { title, lineJp } = parseName(character.name);
  const bounties = character.bounties ?? [];
  const shownBounties = bounties.filter((b) => b.is_active && b.amount != null);
  const fallbackBounties = shownBounties.length
    ? shownBounties
    : bounties.slice(0, 2);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-sm backdrop-blur-md transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/10",
        className,
      )}
    >
      {/* When the API exposes an image URL, swap this block for next/image here. */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary/15 via-card to-accent/25">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grain-overlay opacity-50 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,color-mix(in_oklch,var(--color-primary)_25%,transparent),transparent_55%)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="flex size-[4.5rem] items-center justify-center rounded-full border border-primary/25 bg-background/50 shadow-inner backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
            <UserRound
              aria-hidden
              className="size-9 text-primary/45"
              strokeWidth={1.35}
            />
          </div>
          <p className="max-w-[12rem] text-[0.65rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Portrait coming soon
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-border/60 p-4 md:p-5">
        <div className="space-y-1">
          <h2 className="font-display text-xl leading-tight font-medium tracking-tight text-balance text-foreground md:text-[1.35rem]">
            {title}
          </h2>
          {lineJp ? (
            <p className="text-sm text-muted-foreground">{lineJp}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Badge
            className="rounded-full border-primary/20 bg-primary/10 px-2.5 py-0.5 font-medium text-primary"
            variant="outline"
          >
            {character.status || "—"}
          </Badge>
          {character.blood_type ? (
            <Badge className="rounded-full px-2.5 py-0.5" variant="secondary">
              <Droplets
                aria-hidden
                className="size-3 opacity-70"
                data-icon="inline-start"
              />
              {character.blood_type}
            </Badge>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-border/50 pt-3 text-[0.8125rem]">
          <div className="flex flex-col gap-0.5">
            <span className="text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
              Age
            </span>
            <span className="font-medium tabular-nums text-foreground">
              {character.age != null ? character.age : "—"}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="flex items-center gap-1 text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
              <Ruler aria-hidden className="size-3 opacity-60" />
              Height
            </span>
            <span className="font-medium tabular-nums text-foreground">
              {character.height != null ? `${character.height} cm` : "—"}
            </span>
          </div>
        </div>

        {fallbackBounties.length > 0 ? (
          <div className="mt-auto space-y-2 border-t border-border/50 pt-3">
            <p className="text-[0.65rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Bounties
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {fallbackBounties.map((b) => (
                <li key={b.id}>
                  <Badge
                    className={cn(
                      "rounded-full px-2.5 py-0.5 font-mono text-[0.6875rem]",
                      b.is_active
                        ? "border-amber-500/35 bg-amber-500/10 text-amber-950 dark:text-amber-100"
                        : "opacity-70",
                    )}
                    variant="outline"
                  >
                    <Coins
                      aria-hidden
                      className="size-3"
                      data-icon="inline-start"
                    />
                    {formatBerry(b.amount)}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}

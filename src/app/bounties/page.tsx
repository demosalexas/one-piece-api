import { ArrowLeft, BookOpen, Coins, Users } from "lucide-react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

import {
  BountiesPagination,
  type BountyFilter,
  BountyFilterTabs,
} from "@/components/bounties/bounties-pagination";
import {
  type ApiBountyRow,
  BountyCard,
} from "@/components/bounties/bounty-card";
import { LogoMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bounties",
  description: "Browse bounties from the One Piece API.",
};

const LIMIT_OPTIONS = new Set([12, 24, 36]);

function parseFilter(raw: string | string[] | undefined): BountyFilter {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (v === "true") return "active";
  if (v === "false") return "inactive";
  return "all";
}

async function fetchBounties(
  page: number,
  limit: number,
  filter: BountyFilter,
): Promise<{ ok: true; data: ApiBountyRow[] } | { ok: false }> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  const q = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (filter === "active") q.set("isActive", "true");
  if (filter === "inactive") q.set("isActive", "false");
  const url = `${proto}://${host}/api/bounties?${q.toString()}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return { ok: false };
  const data = (await res.json()) as unknown;
  if (!Array.isArray(data)) return { ok: false };
  return { ok: true, data: data as ApiBountyRow[] };
}

export default async function BountiesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    isActive?: string;
  }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Math.floor(Number(sp.page) || 1));
  const rawLimit = Number(sp.limit);
  const limit = LIMIT_OPTIONS.has(rawLimit) ? rawLimit : 12;
  const filter = parseFilter(sp.isActive);

  const result = await fetchBounties(page, limit, filter);

  const queryRetry = new URLSearchParams({
    page: "1",
    limit: String(limit),
  });
  if (filter === "active") queryRetry.set("isActive", "true");
  if (filter === "inactive") queryRetry.set("isActive", "false");

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
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-1/2 size-[min(100vw,640px)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--color-primary)_20%,transparent),transparent_72%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 size-[min(80vw,420px)] translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,oklch(0.72_0.12_85)_22%,transparent),transparent_70%)] blur-3xl"
      />

      <header className="relative z-10 border-b border-border/50 bg-card/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-8">
          <Link
            className="flex items-center gap-3 rounded-full border border-border/80 bg-card/85 py-2 pr-2 pl-3 shadow-sm backdrop-blur-md transition-opacity hover:opacity-90"
            href="/"
          >
            <LogoMark />
            <span className="hidden font-display text-[0.65rem] font-medium tracking-[0.2em] text-muted-foreground uppercase sm:inline">
              API
            </span>
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-1.5 rounded-full border border-border/80 bg-card/85 p-1 shadow-sm backdrop-blur-md">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft data-icon="inline-start" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/characters">
                <Users data-icon="inline-start" />
                Characters
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="/bounties">
                <Coins data-icon="inline-start" />
                Bounties
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documentation">
                <BookOpen data-icon="inline-start" />
                Docs
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="font-display text-[0.7rem] font-medium tracking-[0.28em] text-primary uppercase">
              Grand Line · Rewards
            </p>
            <h1 className="font-display text-3xl font-medium tracking-tight text-balance text-foreground md:text-4xl">
              Bounties
            </h1>
            <p className="text-pretty text-sm/relaxed text-muted-foreground md:text-base/relaxed">
              Marine-issued rewards from the dataset. Filter by active status
              and paginate like the characters catalog.
            </p>
          </div>
          <BountyFilterTabs filter={filter} limit={limit} />
        </div>

        {!result.ok ? (
          <Card className="border-destructive/30 bg-card/90">
            <CardHeader>
              <CardTitle>Could not load bounties</CardTitle>
              <CardDescription>
                The API did not return data. Try again in a moment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="rounded-full" variant="outline">
                <Link href={`/bounties?${queryRetry.toString()}`}>Retry</Link>
              </Button>
            </CardContent>
          </Card>
        ) : result.data.length === 0 ? (
          <Card className="bg-card/90">
            <CardHeader>
              <CardTitle>No bounties here</CardTitle>
              <CardDescription>
                Try another filter or go back to the first page.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button asChild className="rounded-full">
                <Link href="/bounties?page=1&limit=12">First page</Link>
              </Button>
              {page > 1 ? (
                <Button asChild className="rounded-full" variant="outline">
                  <Link
                    href={
                      filter === "all"
                        ? `/bounties?page=${page - 1}&limit=${limit}`
                        : `/bounties?page=${page - 1}&limit=${limit}&isActive=${filter === "active" ? "true" : "false"}`
                    }
                  >
                    Previous page
                  </Link>
                </Button>
              ) : null}
            </CardContent>
          </Card>
        ) : (
          <>
            <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {result.data.map((bounty) => (
                <li key={bounty.id}>
                  <BountyCard bounty={bounty} />
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <BountiesPagination
                filter={filter}
                limit={limit}
                page={page}
                resultCount={result.data.length}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

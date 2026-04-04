import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const LIMIT_OPTIONS = [12, 24, 36] as const;

export type BountyFilter = "all" | "active" | "inactive";

function buildQuery(page: number, limit: number, filter: BountyFilter): string {
  const q = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (filter === "active") q.set("isActive", "true");
  if (filter === "inactive") q.set("isActive", "false");
  return `/bounties?${q.toString()}`;
}

export function BountiesPagination({
  page,
  limit,
  resultCount,
  filter,
}: {
  page: number;
  limit: number;
  resultCount: number;
  filter: BountyFilter;
}) {
  const hasPrev = page > 1;
  const hasNext = resultCount >= limit;
  const href = (p: number, l = limit, f = filter) => buildQuery(p, l, f);

  return (
    <nav
      aria-label="Bounty list pagination"
      className="flex flex-col gap-6 rounded-2xl border border-border/70 bg-card/60 p-4 backdrop-blur-md md:flex-row md:items-center md:justify-between md:p-5"
    >
      <p className="text-center text-sm text-muted-foreground md:text-left">
        <span className="font-medium text-foreground">Page {page}</span>
        {resultCount > 0 ? (
          <>
            {" "}
            · showing{" "}
            <span className="font-medium text-foreground">{resultCount}</span>{" "}
            {resultCount === 1 ? "bounty" : "bounties"}
          </>
        ) : (
          <> · no results</>
        )}
      </p>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <span className="sr-only">Results per page</span>
          {LIMIT_OPTIONS.map((l) => (
            <Button
              key={l}
              asChild
              className="rounded-full"
              size="sm"
              variant={l === limit ? "default" : "outline"}
            >
              <Link href={href(1, l)}>{l} per page</Link>
            </Button>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          {hasPrev ? (
            <Button
              asChild
              className="rounded-full"
              size="sm"
              variant="outline"
            >
              <Link href={href(page - 1)}>
                <ChevronLeft data-icon="inline-start" />
                Previous
              </Link>
            </Button>
          ) : (
            <Button
              className="rounded-full"
              disabled
              size="sm"
              variant="outline"
            >
              <ChevronLeft data-icon="inline-start" />
              Previous
            </Button>
          )}
          {hasNext ? (
            <Button
              asChild
              className="rounded-full"
              size="sm"
              variant="outline"
            >
              <Link href={href(page + 1)}>
                Next
                <ChevronRight data-icon="inline-end" />
              </Link>
            </Button>
          ) : (
            <Button
              className="rounded-full"
              disabled
              size="sm"
              variant="outline"
            >
              Next
              <ChevronRight data-icon="inline-end" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export function BountyFilterTabs({
  filter,
  limit,
}: {
  filter: BountyFilter;
  limit: number;
}) {
  const tabs: { key: BountyFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
  ];

  return (
    <div
      aria-label="Filter bounties by status"
      className="flex flex-wrap gap-1.5 rounded-full border border-border/80 bg-card/85 p-1 shadow-sm backdrop-blur-md"
      role="tablist"
    >
      {tabs.map(({ key, label }) => (
        <Button
          key={key}
          asChild
          className="rounded-full"
          size="sm"
          variant={filter === key ? "default" : "ghost"}
        >
          <Link href={buildQuery(1, limit, key)} role="tab">
            {label}
          </Link>
        </Button>
      ))}
    </div>
  );
}

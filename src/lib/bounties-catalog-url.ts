export type BountyFilter = "all" | "active" | "inactive";

/** `newest` = default API order (created_at desc). */
export type BountySort = "newest" | "high" | "low";

export function parseBountyFilter(
  raw: string | string[] | undefined,
): BountyFilter {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (v === "true") return "active";
  if (v === "false") return "inactive";
  return "all";
}

export function parseBountySort(
  raw: string | string[] | undefined,
): BountySort {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (v === "high") return "high";
  if (v === "low") return "low";
  return "newest";
}

export function buildBountiesListHref(opts: {
  page: number;
  limit: number;
  filter: BountyFilter;
  sort: BountySort;
}): string {
  const q = new URLSearchParams({
    page: String(opts.page),
    limit: String(opts.limit),
  });
  if (opts.filter === "active") q.set("isActive", "true");
  if (opts.filter === "inactive") q.set("isActive", "false");
  if (opts.sort === "high") q.set("sort", "high");
  if (opts.sort === "low") q.set("sort", "low");
  return `/bounties?${q.toString()}`;
}

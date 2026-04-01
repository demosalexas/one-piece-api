/** Split an array into fixed-size chunks keyed as `page1`, `page2`, … */
export function createPages<T>(
  items: T[],
  pageSize: number,
): Record<string, T[]> {
  const pages: Record<string, T[]> = {};
  if (pageSize < 1) {
    return pages;
  }
  for (let i = 0; i < items.length; i += pageSize) {
    const n = Math.floor(i / pageSize) + 1;
    pages[`page${n}`] = items.slice(i, i + pageSize);
  }
  return pages;
}

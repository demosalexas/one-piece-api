/** Human-readable line from `characters.birthday` JSON (shape varies in the wild). */
export function formatBirthday(birthday: unknown): string | null {
  if (birthday == null) return null;
  if (typeof birthday === "string") {
    const t = birthday.trim();
    return t || null;
  }
  if (typeof birthday !== "object" || Array.isArray(birthday)) return null;

  const o = birthday as Record<string, unknown>;
  for (const k of ["display", "label", "en", "text"] as const) {
    if (typeof o[k] === "string" && o[k].trim()) return o[k].trim();
  }

  const month = o.month ?? o.m;
  const day = o.day ?? o.d;
  const year = o.year ?? o.y;
  const parts: string[] = [];
  if (typeof month === "number" || typeof month === "string")
    parts.push(String(month));
  if (typeof day === "number" || typeof day === "string")
    parts.push(String(day));
  if (typeof year === "number" || typeof year === "string")
    parts.push(String(year));
  if (parts.length > 0) return parts.join(" · ");

  return null;
}

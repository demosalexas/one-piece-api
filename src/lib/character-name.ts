/** Readable label from `characters.name` JSON (en → romaji → jp). */
export function displayCharacterName(name: unknown): string {
  if (!name || typeof name !== "object") return "Unknown";
  const o = name as Record<string, unknown>;
  const en = typeof o.en === "string" ? o.en : "";
  const romaji = typeof o.romaji === "string" ? o.romaji : "";
  const jp = typeof o.jp === "string" ? o.jp : "";
  const s = en.trim() || romaji.trim() || jp.trim();
  return s || "Unknown";
}

/** Secondary line: Japanese if different from primary; else romaji only when there is no English name. */
export function subtitleCharacterName(
  name: unknown,
  primary: string,
): string | undefined {
  if (!name || typeof name !== "object") return undefined;
  const o = name as Record<string, unknown>;
  const en = typeof o.en === "string" ? o.en : "";
  const jp = typeof o.jp === "string" ? o.jp : "";
  const romaji = typeof o.romaji === "string" ? o.romaji : "";
  if (jp && jp !== primary) return jp;
  if (romaji && romaji !== primary && !en) return romaji;
  return undefined;
}

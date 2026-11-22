const ACRONYMS: Record<string, string> = { d2c: 'D2C', b2b: 'B2B', ceo: 'CEO', 'a/b': 'A/B' };

/** Convert an ALL-CAPS data string to simple sentence case, keeping known acronyms. */
export function sentenceCase(input: string): string {
  const lower = input.toLowerCase();
  const withAcronyms = lower.replace(/\b(d2c|b2b|ceo|a\/b)\b/g, (m) => ACRONYMS[m]);
  return withAcronyms.charAt(0).toUpperCase() + withAcronyms.slice(1);
}

/** 'DEC 2025' -> 'Dec 2025', 'AUG–SEP 2025' -> 'Aug–Sep 2025' */
export function formatDateLabel(input: string): string {
  return input.toLowerCase().replace(/(^|[^a-z])([a-z])/g, (_, p, c) => p + c.toUpperCase());
}

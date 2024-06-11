export function getInitials(seed: string, discardAtSymbol = true): string {
  const input = discardAtSymbol ? seed.replace(/@.*/, '') : seed;
  const matches = Array.from(input.matchAll(/(?:^|\P{L})([^\P{L}]+)/gu));

  if (matches.length === 0) {
    // Re-run without discarding `@`-symbol, if no matches
    return discardAtSymbol ? getInitials(seed, false) : '';
  }

  if (matches.length === 1) {
    // Array destructuring allows unicode characters to be split correctly.
    // @see https://stackoverflow.com/a/62341816
    return [...matches[0][1]].slice(0, 2).join('').toUpperCase();
  }

  const firstWord = matches[0][1];
  const lastWord = matches[matches.length - 1][1];

  // Array destructuring allows unicode characters to be split correctly.
  // @see https://stackoverflow.com/a/62341816
  return ([...firstWord][0] + [...lastWord][0]).toUpperCase();
}

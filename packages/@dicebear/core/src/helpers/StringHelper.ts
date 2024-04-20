export class StringHelper {
  static getInitials(str: string): string {
    const matches = str
      .trim()
      .replace(/\s+/, ' ')
      .replace(/[^\p{L}\s]+/gu, '')
      .match(/([^\s]+)/g);

    if (!matches) {
      return '';
    }

    if (matches.length === 1) {
      // Array destructuring allows unicode characters to be split correctly.
      // @see https://stackoverflow.com/a/62341816
      return [...matches[0]].slice(0, 2).join('').toUpperCase();
    }

    const firstWord = matches[0];
    const lastWord = matches[matches.length - 1];

    // Array destructuring allows unicode characters to be split correctly.
    // @see https://stackoverflow.com/a/62341816
    return ([...firstWord][0] + [...lastWord][0]).toUpperCase();
  }
}

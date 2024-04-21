export class Prng {
  private readonly seed: string;
  private value: number;

  private MIN = -2147483648;
  private MAX = 2147483647;

  constructor(seed: string) {
    this.seed = seed;
    this.value = this.hashSeed(seed) || 1;
  }

  static fromSeed(seed: string): Prng {
    return new Prng(seed);
  }

  static fromRandom(): Prng {
    const seed = Math.random().toString(36).substring(2, 7);

    return new Prng(seed);
  }

  getSeed(): string {
    return this.seed;
  }

  next(): number {
    return (this.value = this.xorshift(this.value));
  }

  bool(likelihood: number = 50): boolean {
    return this.integer(1, 100) <= likelihood;
  }

  integer(min: number, max: number): number {
    return Math.floor(
      ((this.next() - this.MIN) / (this.MAX - this.MIN)) * (max + 1 - min) +
        min,
    );
  }

  pick<T>(arr: T[], fallback?: T): T | undefined {
    if (arr.length === 0) {
      this.next();

      return fallback;
    }

    return arr[this.integer(0, arr.length - 1)];
  }

  shuffle<T>(arr: T[]): T[] {
    // Each method call should call the `next` function only once.
    // Therefore, we use a separate instance of the Prng here.
    const internalPrng = Prng.fromSeed(this.next().toString());

    // Fisher-Yates shuffle algorithm - We do not use the Array.sort method
    // because it is not stable and produces different results when used in
    // different browsers. See: https://github.com/dicebear/dicebear/issues/394
    const workingArray = [...arr];

    for (let i = workingArray.length - 1; i > 0; i--) {
      const j = internalPrng.integer(0, i);

      [workingArray[i], workingArray[j]] = [workingArray[j], workingArray[i]];
    }

    return workingArray;
  }

  string(
    length: number,
    characters: string = 'abcdefghijklmnopqrstuvwxyz1234567890',
  ): string {
    // Each method call should call the `next` function only once.
    // Therefore, we use a separate instance of the Prng here.
    const internalPrng = Prng.fromSeed(this.next().toString());

    let str = '';

    for (let i = 0; i < length; i++) {
      str += characters[internalPrng.integer(0, characters.length - 1)];
    }

    return str;
  }

  private xorshift(value: number): number {
    value ^= value << 13;
    value ^= value >> 17;
    value ^= value << 5;

    return value;
  }

  private hashSeed(seed: string): number {
    let hash = 0;

    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
      hash = this.xorshift(hash);
    }

    return hash;
  }
}

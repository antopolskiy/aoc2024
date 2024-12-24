export const toNumbersArrys = (s: string) => s.split(" ").map(Number);

export const chars = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",
  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",
  FgGray: "\x1b[90m",
  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
  BgGray: "\x1b[100m",
};

export const color = (s: string, c: keyof typeof chars) =>
  `${chars[c]}${s}${chars.Reset}`;

export const simpleArrayEquals = (a1, a2) => {
  /* WARNING: arrays must not contain {objects} or behavior may be undefined */
  return JSON.stringify(a1) == JSON.stringify(a2);
};

function* cartesianIterator<T>(items: T[][]): Generator<T[]> {
  const remainder = items.length > 1 ? cartesianIterator(items.slice(1)) : [[]];
  for (let r of remainder) for (let h of items.at(0)!) yield [h, ...r];
}

export const cartesian = <T>(items: T[][]) => [...cartesianIterator(items)];

export function generatePermutations<T>(elements: T[], length: number): T[][] {
  const results: T[][] = [];

  function generate(current: T[], depth: number): void {
    if (depth === length) {
      results.push([...current]);
      return;
    }

    for (const element of elements) {
      current.push(element);
      generate(current, depth + 1);
      current.pop();
    }
  }

  generate([], 0);
  return results;
}

import fs from "fs";

const data = fs.readFileSync("2/input.txt", "utf8").split("\n");

const isSafe = (arr: number[]) => {
  const diffs = arr.slice(1).reduce((acc, value, idx) => {
    acc = acc.concat([value - arr[idx]]);
    return acc;
  }, [] as number[]);

  let safe = 1;

  diffs.forEach((value) => {
    const absValue = Math.abs(value);
    if (absValue > 3 || absValue < 1) {
      safe = 0;
    }
  });

  if (safe) {
    const sum = diffs.reduce((acc, v) => acc + v, 0);
    const absSum = diffs.reduce((acc, v) => acc + Math.abs(v), 0);
    if (Math.abs(sum) !== absSum) {
      safe = 0;
    }
  }
  return safe;
};

const res = data.map((line) => isSafe(line.split(" ").map(Number)));

const sumSafe = res.reduce((acc, v) => acc + v, 0);

console.log(sumSafe);

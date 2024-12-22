import fs from "fs";
import { toNumbersArrys } from "../utils";

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

const res = data.map((line) => isSafe(toNumbersArrys(line)));

const sumSafeFirstPass = res.reduce((acc, v) => acc + v, 0);

// for unsafe levels, run additional simulation which will remove 1 level at a time
// and see if it becomes safe

const unsafeLevels = data.filter((_, index) => res[index] == 0);

for (let lineIndex = 0; lineIndex < data.length; lineIndex++) {
  const line = data[lineIndex];
  let safe = 0;
  const levels = toNumbersArrys(line);
  // iterate with index of the array
  for (let i = 0; i < levels.length; i++) {
    const modifiedLevelsData = [...levels];
    modifiedLevelsData.splice(i, 1);
    if (isSafe(modifiedLevelsData)) {
      safe = 1;
    }
    if (safe) {
      res[lineIndex] = 1;
      break;
    }
  }
}

const sumSafeSecondPass = res.reduce((acc, v) => acc + v, 0);

console.log("res.length", res.length);
console.log("unsafeLevels", unsafeLevels.length);
console.log("sumSafeFirstPass", sumSafeFirstPass);
console.log("sumSafeSecondPass", sumSafeSecondPass);

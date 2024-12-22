import fs from "fs";

const data = fs.readFileSync("3/input.txt", "utf8").split("\n");

const mulRegex = /mul\(\d+,\d+\)/g;

let total = 0;
for (const line of data) {
  const mulMatches = line.matchAll(mulRegex);

  for (const m of mulMatches) {
    const digitsRegex = /\d+/g;
    const digits = [...m[0].matchAll(digitsRegex)].map((a) => Number(a[0]));
    const mulResult = digits.reduce((n, acc) => acc * n, 1);
    total += mulResult;
  }
}

console.log(total);

// Notes
// - I think I'll just encode each pattern, there are just 4 permutations, but I just need 2 patterns because of the reversal already implemented
import fs from "fs";
import { chars, simpleArrayEquals } from "../utils";

// const data = fs.readFileSync("3/inputTest2.txt", "utf8").split("\n");
const data = fs.readFileSync("4/input.txt", "utf8");

const length = data.split("\n")[0].length;
// console.log(length);

const patterns = [
  new RegExp(
    `(?=(?<M1>M)\\w(?<M2>M)[\\w\n]{${length - 1}}(?<A>A)[\\w\n]{${
      length - 1
    }}(?<S1>S)\\w(?<S2>S))`,
    "gd"
  ),
  new RegExp(
    `(?=(?<M1>M)\\w(?<S1>S)[\\w\n]{${length - 1}}(?<A>A)[\\w\n]{${
      length - 1
    }}(?<M2>M)\\w(?<S2>S))`,
    "gd"
  ),
];

let totalMatches = 0;

const getIndexes = (matchIndicesGroups) =>
  Object.entries(matchIndicesGroups).map((o) => o[1]) as Array<number>[];

let matches = [] as RegExpExecArray[];

for (const pattern of patterns) {
  const currentMatches = [...data.matchAll(pattern)];
  totalMatches += currentMatches.length;
  // console.log(`Matched ${currentMatches.length} on ${pattern}`);
  matches = [...matches, ...currentMatches];
}

const indexes = matches.flatMap((m) => getIndexes(m.indices.groups));

let inverseMatches = [] as RegExpExecArray[];
const inverseData = data.split("").reverse().join("");
// console.log("inverseData");
// console.log(inverseData);
for (const pattern of patterns) {
  const currentMatches = [...inverseData.matchAll(pattern)];
  totalMatches += currentMatches.length;
  // console.log(`Matched ${currentMatches.length} on ${pattern}`);
  inverseMatches = [...inverseMatches, ...currentMatches];
}

let inverseIndexes = inverseMatches.flatMap((m) =>
  getIndexes(m.indices.groups)
);

// inverse indexes must be converted to direct indexes to have a single array;
// do to that, I need to subtract them from length of data and reverse each index array

inverseIndexes = inverseIndexes.map((arr) => [
  data.length - arr[1],
  data.length - arr[0],
]);

const allIndexes = [...indexes, ...inverseIndexes]
  .sort((a, b) => a[0] - b[0])
  // remove duplicates
  .reduce((acc, curr, index) => {
    if (simpleArrayEquals(curr, acc[acc.length - 1])) {
      return acc;
    } else {
      acc = [...acc, curr];
    }
    return acc;
  }, [] as Array<number>[]);

// console.log("allIndexes", allIndexes);

// console.log(allIndexes);

let printData = data;
let moveBy = 0;
for (const m of allIndexes) {
  printData =
    printData.slice(undefined, m[0] + moveBy) +
    chars.BgCyan +
    printData.slice(m[0] + moveBy);
  moveBy += chars.BgCyan.length;

  printData =
    printData.slice(undefined, m[1] + moveBy) +
    chars.Reset +
    printData.slice(m[1] + moveBy);
  moveBy += chars.Reset.length;
}

console.log(printData);

console.log(totalMatches);

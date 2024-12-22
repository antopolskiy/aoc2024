// Notes
// - Brute force approach would be to create string with horizontal, vertical and diagonal letter, and then look for XMAS and SAMX in them
// - Is there a smarter way to do it?
//   - Could there be a regex that would describe each occurence -- horizontal (straightforward), vertical (?) and diagonal (?)
//      - Actually I guess there could be. It would be something like X followed by any characters of length equal to length of the row (+1 when diagonal) then M then same for other letters. Actually it might be quite straightforward.
//      - There will be a caveat with diagonal because it might wrap around, so there must be at least 3 non-new-line characters after X when I am looking from top left to bottom right diagonal; and there should be at least 3 non-new-line characters before X when looking from top right to bottom left
//      - Then I'll need to reverse the string
import fs from "fs";
import { chars, simpleArrayEquals } from "../utils";

// const data = fs.readFileSync("3/inputTest2.txt", "utf8").split("\n");
const data = fs.readFileSync("4/input.txt", "utf8");

const length = data.split("\n")[0].length;
// console.log(length);

const patterns = [
  new RegExp("(?<X>X)(?<M>M)(?<A>A)(?<S>S)", "gd"),
  new RegExp(
    `(?=(?<X>X)[\\w\n]{${length}}(?<M>M)[\\w\n]{${length}}(?<A>A)[\\w\n]{${length}}(?<S>S))`,
    "gd"
  ),
  // diagonal from top left to bottom right
  new RegExp(
    `(?=(?<X>X)[\\w]{3}[\\w\n]{${length + 1 - 3}}(?<M>M)[\\w\n]{${
      length + 1
    }}(?<A>A)[\\w\n]{${length + 1}}(?<S>S))`,
    "gd"
  ),
  // diagonal from top right to bottom left
  new RegExp(
    `(?=[\\w]{${3}}(?<X>X)[\\w\n]{${length - 1}}(?<M>M)[\\w\n]{${
      length - 1
    }}(?<A>A)[\\w\n]{${length - 1}}(?<S>S))`,
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

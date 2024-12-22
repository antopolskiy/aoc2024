import fs from "fs";

// const data = fs.readFileSync("3/inputTest2.txt", "utf8").split("\n");
const data = fs.readFileSync("3/input.txt", "utf8").split("\n");

const mulRegex = /mul\(\d+,\d+\)/g;
const doRegex = /do\(\)/g;
const dontRegex = /don't\(\)/g;

let total = 0;
const line = fs.readFileSync("3/input.txt", "utf8");
// for (const line of data) {
// find indexes of dos and donts
const mulMatches = [...line.matchAll(mulRegex)];
// console.log("🚀 ~ mulMatches:", mulMatches);
const doMatches = [...line.matchAll(doRegex)];
const doInstructions = doMatches.map((m) => ({ index: m.index, on: true }));
// console.log("🚀 ~ doMatches:", doMatches);
const dontMatches = [...line.matchAll(dontRegex)];
const dontInstructions = dontMatches.map((m) => ({
  index: m.index,
  on: false,
}));
// console.log("🚀 ~ dontMatches:", dontMatches);

// create tuples where mul is enabled, e.g. [(0, 20), (59,length)]
// to do that, construct a single array with dos and donts and sort it
let instructions = [...doInstructions, ...dontInstructions].sort(
  (a, b) => a.index - b.index
);
console.log("🚀 ~ instructions:", instructions);

// remove if same instruction in a row
const instructionSignals = instructions.map((i) => Number(i.on));
// const instructionSignals = [0, 1, 1, 0, 0, 1, 0, 1];
console.log("🚀 ~ instructionSignals:", instructionSignals);
const diffs = instructionSignals.slice(1).reduce((acc, curr, idx) => {
  const diff = instructionSignals[idx] - curr;
  return [...acc, diff];
}, [] as number[]);
console.log("🚀 ~ diffs:", diffs);
let instructionsFiltered = instructions.filter(
  (value, index) => diffs[index - 1] !== 0
);
console.log("🚀 ~ instructionsFiltered:", instructionsFiltered);
// now that we have only instructions which turn on and off, we can construct
// tupples. first let's construct the array of signals.

// if first instruction is on, remove it and add 0 instead
if (instructionsFiltered[0].on) {
  instructionsFiltered = [
    { on: true, index: 0 },
    ...instructionsFiltered.slice(1),
  ];
} else {
  // otherwise, just add on at index 0
  instructionsFiltered = [{ on: true, index: 0 }, ...instructionsFiltered];
}

// if last instruction is on, add off at length of the input
if (instructionsFiltered[instructionsFiltered.length - 1].on) {
  instructionsFiltered = [
    ...instructionsFiltered,
    { on: false, index: line.length },
  ];
}
console.log("🚀 ~ instructionsFiltered:", instructionsFiltered);

// now construct tuples of indexes when on
let whenOn = instructionsFiltered.slice(1).reduce(
  (acc, value, index) => {
    // console.log("🚀 ~ acc:", acc);
    // console.log("🚀 ~ value:", value);
    // console.log("🚀 ~ index:", index);
    acc = [
      ...acc.slice(undefined, acc.length - 1),
      [...acc[acc.length - 1], value.index],
      [value.index],
    ];
    return acc;
  },
  [[instructionsFiltered[0].index]] as Array<number>[]
);
// filter out each second item (because that's where it is off)
whenOn = whenOn.filter((value, index) => index % 2 == 0);
console.log("🚀 ~ whenOn:", whenOn);

// now we have an array of indexes when on. for each mul, we will check
// if index falls within any of the ranges

for (const m of mulMatches) {
  const digitsRegex = /\d+/g;
  const digits = [...m[0].matchAll(digitsRegex)].map((a) => Number(a[0]));
  let mulIsEnabled = false;
  whenOn.forEach(([start, stop]) => {
    // console.log(`Testing ${m.index} is within ${start}, ${stop}`);
    if (m.index >= start && m.index <= stop) {
      mulIsEnabled = true;
    }
  });
  if (mulIsEnabled) {
    console.log(`mul ${m} is enabled`);
    const mulResult = digits.reduce((n, acc) => acc * n, 1);
    total += mulResult;
  } else {
    console.log(`${m} is disabled`);
  }
}
// }
console.log(total);

const second = (input: string) => {
  let result = 0;
  const regex =
    /(?<=(?:do\(\)|^)(?:[^d]|d(?!on't\(\)))*)mul\((\d{1,3}),(\d{1,3})\)/g;
  const matches = input.matchAll(regex);

  for (const match of matches) {
    result += Number(match[1]) * Number(match[2]);
  }
  return result;
};

console.log(second(fs.readFileSync("3/input.txt", "utf8")));

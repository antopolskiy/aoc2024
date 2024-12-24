import fs from "fs";

const data = fs.readFileSync("5/input.txt", "utf8");

let [_rules, _sequences] = data.split("\n\n");
const sequences = _sequences.split("\n");

const rules = _rules.split("\n");
const rulesTuples = rules.map((s) => s.split("|").map(Number));

const uniqueNs = [...new Set(rulesTuples.flatMap((s) => s))].sort(
  (a, b) => a - b
);

const numbersMap = uniqueNs
  .map((n, index) => [index, n])
  .reduce((acc, curr) => {
    acc[curr[1]] = curr[0];
    return acc;
  }, {} as Map<number, number>);

const adjacencyMatrix = new Array(uniqueNs.length)
  .fill(undefined)
  .map(() => new Array(uniqueNs.length).fill(0));

for (const pair of rulesTuples) {
  adjacencyMatrix[numbersMap[pair[0]]][numbersMap[pair[1]]] = 1;
}

// const r = new RegExp("(?=(\\d\\d).+(\\d\\d))", "dg");

const filter = sequences.map((sequence) => {
  const sequenceNumbers = sequence.split(",").map(Number);
  const pairs = sequenceNumbers.flatMap((v, i) =>
    sequenceNumbers.slice(i + 1).map((w) => [v, w])
  );

  const hasInvalid = pairs
    .map((p) => adjacencyMatrix[numbersMap[p[1]]][numbersMap[p[0]]] === 1)
    .reduce((acc, curr) => acc || curr, false);

  return !hasInvalid;
});

const validSequences = sequences.filter((s, i) => filter[i]);
const middleNumbers = validSequences
  .map((s) => s.slice(s.length / 2 - 1, s.length / 2 + 1))
  .map(Number);
console.log(middleNumbers.reduce((acc, curr) => acc + curr, 0));

// console.log(
//   adjacencyMatrix
//     .map((a) => a.slice(undefined, 10).join(","))
//     .slice(undefined, 10)
//     .join("\n")
// );

// // console.log(rules);
// // console.log(sequences);

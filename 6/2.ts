import fs from "fs";
import { cartesian, generatePermutations } from "../utils";

const data = fs.readFileSync("6/input.txt", "utf8");

const operators: { [key: string]: (a: number, b: number) => number } = {
  "+": (a: number, b: number) => a + b,
  "*": (a: number, b: number) => a * b,
  "||": (a: number, b: number) => Number(String(a) + String(b)),
};

const correct = [] as number[];

for (const datum of data.split("\n")) {
  let [targetStr, numbersStr] = datum.split(": ");
  const numbers = numbersStr.split(" ").map(Number);
  const target = Number(targetStr);
  const nOperators = numbers.length - 1;
  const lineOperators = generatePermutations(
    Object.keys(operators),
    nOperators
  );
  const results = lineOperators.map((opsArr) => {
    return numbers.slice(1).reduce((acc, curr, i) => {
      // console.log(acc, opsArr[i], curr);
      const r = operators[opsArr[i]](acc, curr);
      return r;
    }, numbers[0]);
  });
  if (results.findIndex((v) => v === target) >= 0) {
    correct.push(target);
  }
}

console.log(correct.reduce((acc, curr) => acc + curr, 0));

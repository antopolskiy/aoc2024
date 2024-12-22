import fs from "fs";

// 1. Read the input file
const data = fs.readFileSync("1/input.txt", "utf8");

// 2. Split each line into an array of numbers
const numbers = data.split("\n").map((line) => line.split("   ").map(Number));

// 3. Create 2 column arrays
const column1 = numbers.map((line) => line[0]);
const column2 = numbers.map((line) => line[1]);

// 4. Construct a map for column2 with the frequency of each number
const frequency2 = column2.reduce((acc, curr) => {
  if (!(curr in acc)) {
    acc[curr] = 0;
  }
  acc[curr] = acc[curr] + 1;
  return acc;
}, new Map<number, number>());

const products = column1.map((value) => value * (frequency2[value] || 0));

const similarity = products.reduce((acc, value) => (acc = acc + value), 0);
console.log(similarity);

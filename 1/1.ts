import fs from "fs";

// 1. Read the input file
const data = fs.readFileSync("1/input.txt", "utf8");

// 2. Split each line into an array of numbers
const numbers = data.split("\n").map((line) => line.split("   ").map(Number));

// 3. Create 2 column arrays
const column1 = numbers.map((line) => line[0]);
const column2 = numbers.map((line) => line[1]);

// 4. Sort the arrays
column1.sort((a, b) => a - b);
column2.sort((a, b) => a - b);

// 5. Find pairwise differences
const differences = column1.map((num, index) => Math.abs(column2[index] - num));

// 6. Find the sum of the differences
const sumOfDifferences = differences.reduce((acc, curr) => acc + curr, 0);

console.log(sumOfDifferences);

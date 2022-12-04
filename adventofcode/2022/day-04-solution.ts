import { readInput } from "./read-input";

const rl = readInput("./day-04-input.txt");

const generateRangeArr = ([min, max]: number[]) => {
  const arr = [];
  for (let i = min; i < max; i = i + 1) {
    arr.push(i);
  }
  arr.push(max);

  return arr;
};

const isFullyContains = (pairs: string[]) => {
  const [pairOne, pairTwo] = pairs;

  let sectionOne = pairOne.split("-").map(Number);
  let sectionTwo = pairTwo.split("-").map(Number);

  const firstRange = generateRangeArr(sectionOne);
  const lastRange = generateRangeArr(sectionTwo);
  const intersection = firstRange.filter((n) => lastRange.includes(n));

  if (intersection.length === 0) {
    return false;
  }

  const isFully =
    JSON.stringify(intersection) === JSON.stringify(firstRange) ||
    JSON.stringify(intersection) === JSON.stringify(lastRange);

  return isFully;
};

let count = 0;
rl.on("line", (line) => {
  const pairs = line.split(",");

  if (isFullyContains(pairs)) {
    count++;
  }
});

rl.on("close", () => {
  console.log({ answer: { count } });
});

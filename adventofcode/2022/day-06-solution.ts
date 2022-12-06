import { readInput } from "./read-input";

const rl = readInput("./day-06-input.txt");

const startOfMessageMarker = (line: string, size: number) => {
  return line.split("").reduce((acc, _item, index, arr) => {
    const chunck = arr.slice(index, index + size);

    const uniq = new Set(chunck);

    if (
      index + (1 % size) &&
      index <= arr.length - size &&
      uniq.size === size &&
      acc === 0
    ) {
      acc = index + size;
    }

    return acc;
  }, 0);
};

let part1: number;
rl.on("line", (line) => {
  part1 = startOfMessageMarker(line, 4);
});

let part2: number;
rl.on("line", (line) => {
  part2 = startOfMessageMarker(line, 14);
});

rl.on("close", () => {
  console.log({ answer: { part1, part2 } });
});

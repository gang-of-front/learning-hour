import { readInput } from "./read-input";

const rl = readInput("./day-06-input.txt");

let result: string[] = [];
rl.on("line", (line) => {
  result = line.split("").reduce((acc, item, index, arr) => {
    const item1 = arr[index] || "";
    const item2 = arr[index + 1] || "";
    const item3 = arr[index + 2] || "";
    const item4 = arr[index + 3] || "";

    const uniq = new Set([item1, item2, item3, item4]);

    if (
      index + (1 % 4) &&
      index <= arr.length - 4 &&
      uniq.size === 4 &&
      acc.length === 0
    ) {
      acc = [...uniq, String(index + 4)];
    }

    return acc;
  }, [] as string[]);
});

rl.on("close", () => {
  console.log({ answer: { result } });
});

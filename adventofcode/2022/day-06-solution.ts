import { readInput } from "./read-input";

const rl = readInput("./day-06-input.txt");

rl.on("line", (line) => {
  console.log(line);
});

rl.on("close", () => {
  console.log({ answer: {} });
});

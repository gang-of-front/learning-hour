import { readInput } from "./read-input";

const rl = readInput("./day-10-input.txt");

let clock = 1;

let registerX = 1;
let signalStrengths = 0;

const addX = (value: number) => {
  registerX += value;
};

rl.on("line", (line) => {
  const command = line.split(" ");

  const cycles = command[0] === "addx" ? 2 : 1;

  for (let i = 1; i <= cycles; i++) {
    if ((clock - 20) % 40 === 0) {
      signalStrengths += registerX * clock;
    }

    if (command[0] === "addx" && i === 2) {
      addX(Number(command[1]));
    }

    clock++;
  }
});

rl.on("close", () => {
  console.log({ answer: { part1: signalStrengths } });
});

import { readInput } from "./read-input";

const rl = readInput("./day-05-input.txt");

const stacks: string[][] = [[], [], [], [], [], [], [], [], []];
let createStack = true;

const addToStack = (stack: string[], value: string | undefined) => {
  if (!value || value === " ") {
    return;
  }
  stack.push(value);
};

const repeat = (count: number, fn: any) => {
  for (let i = 1; i <= count; i++) {
    fn();
  }
};

rl.on("line", (line) => {
  if (line === "") {
    createStack = false;
    return;
  }

  if (createStack) {
    addToStack(stacks[0], line.at(1));
    addToStack(stacks[1], line.at(5));
    addToStack(stacks[2], line.at(9));
    addToStack(stacks[3], line.at(13));
    addToStack(stacks[4], line.at(17));
    addToStack(stacks[5], line.at(21));
    addToStack(stacks[6], line.at(25));
    addToStack(stacks[7], line.at(29));
    addToStack(stacks[8], line.at(33));
  }

  const metcher = line.match(/move (\d+) from (\d+) to (\d+)/);

  if (!metcher) {
    return;
  }

  const [, move, from, to] = metcher;

  //PART 1
  // repeat(Number(move), () => {
  //   const fromStack = stacks[Number(from) - 1];
  //   const toStack = stacks[Number(to) - 1];

  //   const value = fromStack.shift();
  //   if (value) {
  //     toStack.unshift(value);
  //   }
  // });

  //PART 2
  const fromStack = stacks[Number(from) - 1];
  const toStack = stacks[Number(to) - 1];

  const value = fromStack.splice(0, Number(move));
  if (value) {
    toStack.splice(0, 0, ...value);
  }
});

rl.on("close", () => {
  let result = "";
  stacks.forEach((stack) => {
    result += stack[0];
  });
  console.log({ answer: JSON.stringify(stacks), result });
});

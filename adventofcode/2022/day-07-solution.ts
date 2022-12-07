import { readInput } from "./read-input";

const rl = readInput("./day-07-input.txt");

const dir = (name: string, parent: any) => {
  parent.children[name] = { type: "dir", name, size: 0, parent, children: {} };
};

const setSizeParent = (size: number, parent: any) => {
  parent.size += size;

  if (parent.parent) {
    setSizeParent(size, parent.parent);
  }
};

const file = (name: string, size: number, parent: any) => {
  parent.children[name] = { type: "file", name, size, parent };
  setSizeParent(size, parent);
};

const filesystem: any = { children: {}, size: 0 };
dir("/", filesystem);

let pwd = filesystem.children["/"];
const parseCommand = (input: string) => {
  const command = input.split(" ");

  switch (command[0]) {
    case "$":
      if (command[1] === "ls" || command[2] === "/") {
        return;
      }

      if (command[2] === "..") {
        pwd = pwd.parent;
      } else {
        pwd = pwd.children[command[2]];
      }
      break;
    case "dir":
      dir(command[1], pwd);
      break;
    default:
      file(command[1], Number(command[0]), pwd);
  }
};

rl.on("line", (line) => {
  parseCommand(line);
});

let total: number = 0;

const part1 = (object: any) => {
  Object.keys(object.children).forEach((key) => {
    const item = object.children[key];

    if (item.type === "dir") {
      if (item.size <= 100000) {
        total += item.size;
      }
      if (item.children) {
        part1(item);
      }
    }
  });
};

const diskSpace = 70000000;

const dirSizes: number[] = [];
const part2 = (object: any, manyMissing: number) => {
  Object.keys(object.children).forEach((key) => {
    const item = object.children[key];

    if (item.type === "dir") {
      if (item.size >= manyMissing) {
        dirSizes.push(item.size);
      }
      if (item.children) {
        part2(item, manyMissing);
      }
    }
  });
};

rl.on("close", () => {
  part1(filesystem.children["/"]);

  const freeDiskSpace = diskSpace - filesystem.size;
  const manyMissing = 30000000 - freeDiskSpace;

  part2(filesystem.children["/"], manyMissing);
  const resultPart2 = Math.min(...dirSizes);

  console.log({
    answer: { total, resultPart2 },
  });
});

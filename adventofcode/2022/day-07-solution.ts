import { readInput } from "./read-input";

const rl = readInput("./day-07-input.txt");

const logJson = (obj: any): string => {
  let cache: any = [];
  const result = JSON.stringify(
    obj,
    function (_key, value) {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          return;
        }
        cache.push(value);
      }
      return value;
    },
    2
  );
  cache = null;

  return result;
};

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

// const filessystem = [
//   '/': dir('/'),
//
//   {type: 'dir', name: '/', size: 0, parent: null },
//   {type: 'dir', name: 'a', size: 0, parent: '/'},
//   {type: 'file', name:'b.txt', size: 14848514, parent: '/'},
//   {type: 'file', name: 'c.dat', size: 8504156, parent: '/'},
//   {type: 'dir', name:'d', size: 0, parent: '/'},
//   {dir('e', parent: filesystem['/'])},
// ];

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
      // console.log("exec", command, pwd);
      break;
    case "dir":
      dir(command[1], pwd);
      // console.log("dir", command, pwd);
      break;
    default:
      file(command[1], Number(command[0]), pwd);
    // console.log("file", command, pwd);
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
        // console.log(item.name, item.size);
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

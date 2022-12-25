import { readInput } from "./read-input";

const rl = readInput("./day-11-input.txt");

type Monkey = {
  items: number[]
  operation: string
  divisible: number
  isTrue: number
  isFalse: number
  inspectedCount: number
}

const monkeys: Monkey[] = []

function newMonkey(): Monkey {
  return { items: [], operation: '', divisible: 0, isTrue: 0, isFalse: 0, inspectedCount: 0 }
}

let tempMonkey = newMonkey()

rl.on("line", (text) => {
  const line = text.trim()

  if (line.startsWith('Starting')) {
    tempMonkey.items = line.replace('Starting items: ', '').split(', ').map(Number)
  }

  if (line.startsWith('Operation')) {
    tempMonkey.operation = line.replace('Operation: new = ', '')
  }

  if (line.startsWith('Test')) {
    tempMonkey.divisible = Number(line.replace('Test: divisible by ', ''))
  }

  if (line.startsWith('If true')) {
    tempMonkey.isTrue = Number(line.replace('If true: throw to monkey ', ''))
  }

  if (line.startsWith('If false')) {
    tempMonkey.isFalse = Number(line.replace('If false: throw to monkey ', ''))
  }

  if (line === '') {
    monkeys.push(tempMonkey)
    tempMonkey = newMonkey()
  }
});

const lcmOf = (a: number, b: number): number => {
  const [smaller, larger] = [a, b].sort((a, b) => a - b);
  let lcm = smaller;
  while (lcm % larger !== 0) {
    lcm += smaller;
  }
  return lcm;
};

rl.on("close", () => {
  const lcm = monkeys.map(({ divisible }) => divisible).reduce(lcmOf);
  for (let rounds = 10000; rounds--;) {
    monkeys.forEach((monkey) => {
      monkey.inspectedCount += monkey.items.length
      monkey.items.forEach(item => {

        const itemWorry = eval(monkey.operation.replace(/old/g, String(item)))
        const test = itemWorry % monkey.divisible === 0

        const target = test ? monkey.isTrue : monkey.isFalse
        monkeys[target].items.push(itemWorry % lcm)
      })
      monkey.items.length = 0
    })
  }

  const [a, b] = monkeys.map(monkey => monkey.inspectedCount).sort((a, b) => a - b).reverse()


  console.log(a, b)
  console.log(a * b)
});


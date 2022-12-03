import { readInput } from './read-input'

const rl = readInput('./day-01-input.txt')

const elves: number[] = []
let sumCalories = 0

rl.on('line', calorie => {
  if (calorie === '') {
    elves.push(sumCalories)
    sumCalories = 0
  }

  sumCalories = sumCalories + Number(calorie)
})

rl.on('close', () => {
  const arr = elves.sort((a, b) => a - b).reverse()
  const elfCarryingTheMostCalories = arr.at(0)
  const topThreeElvesTotalCalories = arr.splice(0, 3).reduce((a, b) => a + b)

  console.log({ answer: { elfCarryingTheMostCalories, topThreeElvesTotalCalories } })
});

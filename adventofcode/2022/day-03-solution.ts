import { readInput } from './read-input'

const rl = readInput('./day-03-input.txt')

const priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').reduce((acc, letter, index) => {
  acc = { ...acc, [letter]: index + 1 }

  return acc
}, {})


let sumOfPriorities = 0

rl.on('line', rucksack => {

  const compartment1 = rucksack.slice(0, rucksack.length / 2).split('')
  const compartment2 = rucksack.slice(rucksack.length / 2).split('')
  const commomItem = [...new Set(compartment1.filter(item => compartment2.includes(item)))]

  const commomItemPriority = commomItem.map(item => priority[item as keyof typeof priority])[0]

  sumOfPriorities += commomItemPriority
})

rl.on('close', () => {
  console.log({ answer: { sumOfPriorities } })
});

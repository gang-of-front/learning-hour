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


let sumOfPrioritiesGroup = 0
let tempGroup: string[] = []

rl.on('line', rucksack => {
  tempGroup.push(rucksack)

  if (tempGroup.length === 3) {
    const [one, two, three] = tempGroup

    const bagOne = one.split('')
    const bagTwo = two.split('')
    const bagThree = three.split('')

    const commomOneAndTwo = bagOne.filter(item => bagTwo.includes(item))

    const commomOneTwoThree = [...new Set(bagThree.filter(item => commomOneAndTwo.includes(item)))]

    const commomItemPriority = commomOneTwoThree.map(item => priority[item as keyof typeof priority])[0]
    sumOfPrioritiesGroup += commomItemPriority
    tempGroup = []
  }
})

rl.on('close', () => {
  console.log({ answer: { sumOfPriorities, sumOfPrioritiesGroup } })
});

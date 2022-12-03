import path from 'path'
import fs from 'fs'
import readline from 'readline'

const rl = readline.createInterface({
  input: fs.createReadStream(path.resolve(__dirname, './day-02-input.txt')),
  output: process.stdout,
  terminal: false
})

enum RockPaperScissors {
  ROCK,
  PAPER,
  SCISSORS
}

const mapPlayer1 = { A: RockPaperScissors.ROCK, B: RockPaperScissors.PAPER, C: RockPaperScissors.SCISSORS }
const mapPlayer2 = { X: RockPaperScissors.ROCK, Y: RockPaperScissors.PAPER, Z: RockPaperScissors.SCISSORS }

const verify = (play1: RockPaperScissors, play2: RockPaperScissors) => {
  if (play2 === RockPaperScissors.ROCK) {
    if (play1 === RockPaperScissors.SCISSORS) {
      return 6 + 1
    } else if (play1 === RockPaperScissors.PAPER) {
      return 0 + 1
    } else {
      return 3 + 1
    }
  } else if (play2 === RockPaperScissors.PAPER) {
    if (play1 === RockPaperScissors.ROCK) {
      return 6 + 2
    } else if (play1 === RockPaperScissors.SCISSORS) {
      return 0 + 2
    } else {
      return 3 + 2
    }
  } else {
    if (play1 === RockPaperScissors.PAPER) {
      return 6 + 3
    } else if (play1 === RockPaperScissors.ROCK) {
      return 0 + 3
    } else {
      return 3 + 3
    }
  }
}

let total = 0

rl.on('line', line => {
  const [play1, play2] = line.split(' ')
  const decryptPlay1 = mapPlayer1[play1 as keyof typeof mapPlayer1]
  const decryptPlay2 = mapPlayer2[play2 as keyof typeof mapPlayer2]

  const result = verify(decryptPlay1, decryptPlay2)
  total += result
})

rl.on('close', () => {

  console.log({ answer: { total } })
});

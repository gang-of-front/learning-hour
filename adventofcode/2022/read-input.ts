
import path from 'path'
import fs from 'fs'
import readline from 'readline'

export const readInput = (filename: string) => {
  return readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, filename)),
    output: process.stdout,
    terminal: false
  })
}

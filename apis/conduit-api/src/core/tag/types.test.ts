import { isRight, isLeft } from 'fp-ts/Either'
import { tagsCodec } from './types'

it('should validate tags', () => {
  const tags = tagsCodec.decode([
    'reactjs',
    'angularjs',
  ])

  expect(isRight(tags)).toBeTruthy()
})

it('should invalidade tags', () => {
  const tags = tagsCodec.decode([123])

  expect(isLeft(tags)).toBeTruthy()
})

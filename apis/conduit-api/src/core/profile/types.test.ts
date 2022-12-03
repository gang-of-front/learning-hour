import { isRight, isLeft } from 'fp-ts/Either'
import { profileCodec } from './types'

it('should valid user', () => {
  const user = profileCodec.decode({
    username: '',
    bio: '',
    following: true,
    image: 'http://placekitten.com/200/300',
  })

  expect(isRight(user)).toBeTruthy()
})

it('should invalid user', () => {
  const user = profileCodec.decode({
    email: 'xpto',
    token: '1',
    username: 1,
  })

  expect(isLeft(user)).toBeTruthy()
})

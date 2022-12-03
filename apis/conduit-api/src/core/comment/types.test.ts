import { isRight, isLeft } from 'fp-ts/Either'
import { commentCodec, commentsCodec } from './types'

it('should validate comment', () => {
  const comment = commentCodec.decode({
    id: 1,
    createdAt: '2016-02-18T03:22:56.637Z',
    updatedAt: '2016-02-18T03:22:56.637Z',
    body: 'It takes a Jacobian',
    author: {
      username: 'jake',
      bio: 'I work at statefarm',
      image: 'https://i.stack.imgur.com/xHWG8.jpg',
      following: false,
    },
  })

  expect(isRight(comment)).toBeTruthy()
})

it('should invalidate comment', () => {
  const comment = commentCodec.decode({})

  expect(isLeft(comment)).toBeTruthy()
})

it('should validate comments', () => {
  const comments = commentsCodec.decode({
    comments: [
      {
        id: 1,
        createdAt: '2016-02-18T03:22:56.637Z',
        updatedAt: '2016-02-18T03:22:56.637Z',
        body: 'It takes a Jacobian',
        author: {
          username: 'jake',
          bio: 'I work at statefarm',
          image: 'https://i.stack.imgur.com/xHWG8.jpg',
          following: false,
        },
      },
    ],
  })

  expect(isRight(comments)).toBeTruthy()
})

it('should invalidate comments', () => {
  const comments = commentsCodec.decode({})

  expect(isLeft(comments)).toBeTruthy()
})

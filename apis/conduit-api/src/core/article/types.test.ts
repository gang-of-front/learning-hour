import { isRight, isLeft } from 'fp-ts/Either'
import { articleCodec, articlesCodec } from './types'

it('should validate article', () => {
  const article = articleCodec.decode({
    slug: 'how-to-train-your-dragon',
    title: 'How to train your dragon',
    description: 'Ever wonder how?',
    body: 'It takes a Jacobian',
    tagList: ['dragons', 'training'],
    createdAt: '2016-02-18T03:22:56.637Z',
    updatedAt: '2016-02-18T03:48:35.824Z',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: 'jake',
      bio: 'I work at statefarm',
      image: 'https://i.stack.imgur.com/xHWG8.jpg',
      following: false,
    },
  })

  expect(isRight(article)).toBeTruthy()
})

it('should invalidate article', () => {
  const user = articleCodec.decode({
    slug: 12354,
    title: 'How to train your dragon',
    description: 'Ever wonder how?',
    body: 'It takes a Jacobian',
    tagList: ['dragons', 'training'],
    createdAt: '2016-02-18T03:22:56.637Z',
    updatedAt: '2016-02-18T03:48:35.824Z',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: 'jake',
      bio: 'I work at statefarm',
      image: 'https://i.stack.imgur.com/xHWG8.jpg',
      following: false,
    },
  })

  expect(isLeft(user)).toBeTruthy()
})

it('should validate articles', () => {
  const user = articlesCodec.decode({
    articles: [
      {
        slug: 'How to train your dragon',
        title: 'How to train your dragon',
        description: 'Ever wonder how?',
        body: 'It takes a Jacobian',
        tagList: ['dragons', 'training'],
        createdAt: '2016-02-18T03:22:56.637Z',
        updatedAt: '2016-02-18T03:48:35.824Z',
        favorited: false,
        favoritesCount: 0,
        author: {
          username: 'jake',
          bio: 'I work at statefarm',
          image: 'https://i.stack.imgur.com/xHWG8.jpg',
          following: false,
        },
      },
    ],
    articlesCount: 1,
  })
  expect(isRight(user)).toBeTruthy()
})

it('should invalidate articles', () => {
  const user = articlesCodec.decode({
    articles: [
      {
        slug: 12345,
        title: 'How to train your dragon',
        description: 'Ever wonder how?',
        body: 'It takes a Jacobian',
        tagList: ['dragons', 'training'],
        createdAt: '2016-02-18T03:22:56.637Z',
        updatedAt: '2016-02-18T03:48:35.824Z',
        favorited: false,
        favoritesCount: 0,
        author: {
          username: 'jake',
          bio: 'I work at statefarm',
          image: 'https://i.stack.imgur.com/xHWG8.jpg',
          following: false,
        },
      },
    ],
    articlesCount: 1,
  })
  expect(isLeft(user)).toBeTruthy()
})

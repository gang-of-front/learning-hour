import * as t from 'io-ts'
import { profileCodec } from '../profile/types'

const commentCodec = t.type({
  id: t.number,
  createdAt: t.string,
  updatedAt: t.string,
  body: t.string,
  author: profileCodec,
})

const commentsCodec = t.type({
  comments: t.array(commentCodec),
})

export { commentCodec, commentsCodec }

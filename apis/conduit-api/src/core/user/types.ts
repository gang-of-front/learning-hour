import * as t from 'io-ts'
import { emailCodec } from '../types/email'
import { passwordCodec } from '../types/password'
import { slugCodec } from '../types/slug'
import { URLCodec } from '../types/url'

const userCodecRequired = t.type({
  email: t.string,
  token: t.string,
  username: t.string,
  bio: t.string,
})

const userCodecPartial = t.partial({
  image: t.string,
})

const userCodec = t.intersection([userCodecRequired, userCodecPartial])

type User = t.TypeOf<typeof userCodec>;

const createUserCodec = t.type({
  username: slugCodec,
  email: emailCodec,
  password: passwordCodec,
})

const updateUserCodec = t.partial({
  username: slugCodec,
  email: emailCodec,
  password: passwordCodec,
  bio: t.string,
  image: URLCodec,
})

type CreateUser = t.TypeOf<typeof createUserCodec>;
type UpdateUser = t.TypeOf<typeof updateUserCodec>;

const loginUserCodec = t.type({
  email: emailCodec,
  password: passwordCodec,
})

type LoginUser = t.TypeOf<typeof loginUserCodec>

export {
  userCodec,
  User,
  createUserCodec,
  CreateUser,
  updateUserCodec,
  UpdateUser,
  loginUserCodec,
  LoginUser,
}

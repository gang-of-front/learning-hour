import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import { unsafe } from '@/config/tests/fixtures'
import { CreateUser } from '@/core/user/types'
import { registerUser } from './register-user'

const registerOK = () => Promise.resolve('Success')
const registerFail = () => Promise.reject(new Error('Internal error'))

const userValid: CreateUser = {
  username: unsafe('jacob'),
  email: unsafe('jake@jake.jake'),
  password: unsafe('jakejake'),
}

it('should registrate user with outside ok', async () => {
  const assert = (user: any) => expect(user).toEqual('Success')

  return pipe(
    userValid,
    registerUser(registerOK),
    TE.map(assert),
    TE.mapLeft(assert),
  )()
})

it('should not registrate user when outside register fails', async () => {
  const assert = (error: Error) => expect(error).toEqual(new Error('Internal error'))

  return pipe(
    userValid,
    registerUser(registerFail),
    TE.map(assert),
    TE.mapLeft(assert),
  )()
})

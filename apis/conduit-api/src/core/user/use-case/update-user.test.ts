import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import { unsafe } from '@/config/tests/fixtures'
import { UpdateUser } from '@/core/user/types'
import { updateUser } from './update-user'

const updateOK = () => Promise.resolve('Success')
const updateFail = () => Promise.reject(new Error('Internal error'))

const userValid: UpdateUser = {
  username: unsafe('jacob'),
  email: unsafe('jake@jake.jake'),
  password: unsafe('jakejake'),
}

it('should update user with outside ok', async () => {
  const assert = (user: any) => expect(user).toEqual('Success')

  return pipe(
    userValid,
    updateUser(updateOK),
    TE.map(assert),
    TE.mapLeft(assert),
  )()
})

it('should not registrate user when outside register fails', async () => {
  const assert = (error: Error) => expect(error).toEqual(new Error('Internal error'))

  return pipe(
    userValid,
    updateUser(updateFail),
    TE.map(assert),
    TE.mapLeft(assert),
  )()
})

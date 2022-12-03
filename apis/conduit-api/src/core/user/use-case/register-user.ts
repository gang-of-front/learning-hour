import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'

import { CreateUser, createUserCodec } from '@/core/user/types'

export type OutsideRegisterUser<A> = (data: CreateUser) => Promise<A>

type RegisterUser = <A>(outsideRegister: OutsideRegisterUser<A>) =>
  (data: CreateUser) => TE.TaskEither<Error, A>

const registerUser: RegisterUser = (outsideRegisterUser) => (createUser) => {
  return pipe(
    createUser,
    createUserCodec.decode,
    TE.fromEither,
    TE.chain(() => TE.tryCatch(
      () => outsideRegisterUser(createUser),
      E.toError,
    )),
  )
}

export { registerUser }

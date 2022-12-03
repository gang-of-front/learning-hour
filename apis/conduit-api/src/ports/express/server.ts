import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import express from 'express'
import { registerUser } from '@/core/user/use-case/register-user'
import { pipe } from 'fp-ts/lib/function'
import * as jose from 'jose'
import { LoginUser, loginUserCodec } from '@/core/user/types'

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const secret = Buffer.from('asdfasdfasdfasdfasfasdfsafasdfsadfasfsdfasfasdf')
const generateJWT = async (payload: any) => {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('2h')
    .sign(secret)
}

const verifyJWT = async (token: any) => {
  return jose.jwtVerify(token, secret)
}

const memoryDB = { users: {} }

const fakeRegisterUserDB = async (user) => {
  const email = user.email
  if (memoryDB.users[email]) {
    throw new Error('user already exists')
  }
  memoryDB.users[email] = user

  return user
}

app.post('/api/users', async (req, res) => {
  return pipe(
    req.body.user,
    registerUser<any>(fakeRegisterUserDB),
    TE.map(async (result) => {
      const { id, ...response } = result
      const token = await generateJWT({ id })
      console.log(await verifyJWT(token))
      res.json({ user: { ...response, token } })
    }),
    TE.mapLeft((error) => res.json({ error: error.message })),
  )()
})

const fakeLoginInDB = async (loginUser: LoginUser) => {
  const userDB = memoryDB.users[loginUser.email]
  if (!userDB || userDB.password !== loginUser.password) {
    throw new Error('Email or password invalid.')
  }

  return loginUser
}

app.post('/api/users/login', async (req, res) => {
  return pipe(
    req.body.user,
    loginUserCodec.decode,
    TE.fromEither,
    TE.chain((user) => {
      return TE.tryCatch(() => fakeLoginInDB(user), E.toError)
    }),
    TE.chain((user) => {
      return pipe(
        TE.tryCatch(() => generateJWT({ email: user.email }), E.toError),
        TE.map((token) => {
          return { ...user, token }
        }),
      )
    }),
    TE.map((user) => {
      res.json({ user })
    }),
    TE.mapLeft((error) => {
      res.status(401).json({ error: error.message })
    }),
  )()
})

const start = () => {
  const port = 3000
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

export { start }

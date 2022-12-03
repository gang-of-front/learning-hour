import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import { emailCodec } from './email'

it('should validate email', () => {
  const assert = (value: any) => expect(value).toBe('email@valid.com')

  pipe(
    emailCodec.decode('email@valid.com'),
    E.mapLeft(assert),
    E.map(assert),
  )
})

it('should invbalid email', () => {
  const assert = (errors: any) => expect(errors[0].message).toBe('Invalid email')

  pipe(
    emailCodec.decode('email-invalid'),
    E.mapLeft(assert),
    E.map(assert),
  )
})

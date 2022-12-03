import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import { passwordCodec } from './password'

it('should validate email', () => {
  const assert = (value: any) => expect(value).toBe('valid password')

  pipe(
    passwordCodec.decode('valid password'),
    E.mapLeft(assert),
    E.map(assert),
  )
})

it('should invbalid passowrd', () => {
  const assert = (errors: any) =>
    expect(errors[0].message).toBe('Invalid Password')

  pipe(passwordCodec.decode('12'), E.mapLeft(assert), E.map(assert))
})

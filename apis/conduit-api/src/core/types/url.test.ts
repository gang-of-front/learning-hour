import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import { URLCodec } from './url'

const errorMessage = 'Invalid URL'

it('should validate url', () => {
  const validURL = 'http://www.conduit-api.com.br'
  const assert = (value: any) => expect(value).toBe(validURL)

  pipe(URLCodec.decode(validURL), E.mapLeft(assert), E.map(assert))
})

it('should invalidate url', () => {
  const invalidURL = 'abc'
  const assert = (errors: any) => expect(errors[0].message).toBe(errorMessage)

  pipe(URLCodec.decode(invalidURL), E.mapLeft(assert), E.map(assert))
})

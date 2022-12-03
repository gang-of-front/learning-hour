import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import { slugCodec } from './slug'

const errorMessage = 'Invalid slug'

it('should validate complete slug', () => {
  const validSlug = 'slug-valid'
  const assert = (value: any) => expect(value).toBe(validSlug)

  pipe(slugCodec.decode(validSlug), E.mapLeft(assert), E.map(assert))
})

it('should validate a small slug', () => {
  const validSlug = 's-v'
  const assert = (value: any) => expect(value).toBe(validSlug)

  pipe(slugCodec.decode(validSlug), E.mapLeft(assert), E.map(assert))
})

it('should invalidate slug ending with hifen', () => {
  const invalidSlug = 'slug-invalid-'
  const assert = (errors: any) => expect(errors[0].message).toBe(errorMessage)

  pipe(slugCodec.decode(invalidSlug), E.mapLeft(assert), E.map(assert))
})

it('should invalidate slug starting with number', () => {
  const invalidSlug = '2slug-invalid'
  const assert = (errors: any) => expect(errors[0].message).toBe(errorMessage)

  pipe(slugCodec.decode(invalidSlug), E.mapLeft(assert), E.map(assert))
})

it('should invalidate slug with less than 3 charaters', () => {
  const invalidSlug = 'sl'
  const assert = (errors: any) => expect(errors[0].message).toBe(errorMessage)

  pipe(slugCodec.decode(invalidSlug), E.mapLeft(assert), E.map(assert))
})

import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import * as E from 'fp-ts/Either'
import { constFalse, constTrue, pipe } from 'fp-ts/function'
import { URL } from 'url'

interface URLBrand {
  readonly URL: unique symbol;
}

const isURL = (value: string) => {
  return pipe(
    E.tryCatch(
      () => new URL(value),
      E.toError,
    ),
    E.fold(
      constFalse,
      constTrue,
    ),
  )
}

const URLCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, URLBrand> => isURL(value),
    'URL',
  ),
  () => 'Invalid URL',
)

type slug = t.TypeOf<typeof URLCodec>;

export { URLCodec, slug }

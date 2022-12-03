import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

interface SlugBrand {
  readonly Slug: unique symbol;
}

const isSlug = (value: string) => {
  return /^[a-z]+[a-z0-9-]+[a-z0-9]$/.test(value)
}

const slugCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, SlugBrand> => isSlug(value),
    'Slug',
  ),
  () => 'Invalid slug',
)

type slug = t.TypeOf<typeof slugCodec>;

export { slugCodec, slug }

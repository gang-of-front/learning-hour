import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

interface PasswordBrand {
  readonly Password: unique symbol;
}

const isPassword = (value: string) => {
  return value.length >= 3
}

const passwordCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PasswordBrand> => isPassword(value),
    'Password',
  ),
  () => 'Invalid Password',
)

type Password = t.TypeOf<typeof passwordCodec>;

export { passwordCodec, Password }

import * as t from 'io-ts'

const profileCodecRequired = t.type({
  username: t.string,
  bio: t.string,
  following: t.boolean,
})

const profileCodecPartial = t.partial({
  image: t.string,
})

const profileCodec = t.intersection([
  profileCodecRequired,
  profileCodecPartial,
])

type Profile = t.TypeOf<typeof profileCodec>;

export { Profile, profileCodec }

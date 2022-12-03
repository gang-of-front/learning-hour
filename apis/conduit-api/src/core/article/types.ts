import * as t from 'io-ts'
import { profileCodec } from '@/core/profile/types'
import { tagsCodec } from '../tag/types'

const articleCodec = t.type({
  slug: t.string,
  title: t.string,
  description: t.string,
  body: t.string,
  tagList: tagsCodec,
  createdAt: t.string,
  updatedAt: t.string,
  favorited: t.boolean,
  favoritesCount: t.number,
  author: profileCodec,
})

const articlesCodec = t.type({
  articles: t.array(articleCodec),
  articlesCount: t.number,
})

type Article = t.TypeOf<typeof articleCodec>;

type Articles = t.TypeOf<typeof articlesCodec>;

export { Article, articleCodec, Articles, articlesCodec }

import { MultipleArticles, ArticlesFilters } from "~/types";

export const articles =
  (token?: string | null) =>
  async ({
    limit = 10,
    offset = 0,
    tag = '',
  }: ArticlesFilters = {}): Promise<MultipleArticles> => {
    const authHeader = !!token && { authorization: `Token ${token}` };
    const url = new URL("https://api.realworld.io/api/articles");
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("offset", String(offset));
    if (tag.length > 0) {
      url.searchParams.set("tag", tag);
    }

    const head = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
    });

    const json = await head.json();

    return json;
  };

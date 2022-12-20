import {
  component$,
  Resource,
  useStore,
  useContextProvider,
  createContext,
} from "@builder.io/qwik";
import {
  DocumentHead,
  RequestHandler,
  useEndpoint,
  Link,
  useNavigate,
} from "@builder.io/qwik-city";
import { getToken, isAuthenticated } from "~/auth/auth";
import { articles, feed, tags } from "~/services";
import { Article as ArticleType } from "~/types";
import Article from "./home/article";
import FeedToggle from "./home/feedToggle";
import Hero from "./home/hero";

type ArticleContextProps = {
  currentTab: String;
  tag: String;
};

export const ArticleContext =
  createContext<ArticleContextProps>("article-context");

export const onGet: RequestHandler = async ({ request }) => {
  const token = getToken(request.headers.get("cookie"));
  const params = new URL(request.url).searchParams;

  const [tagsData, articlesData, articleTagData, feedData] = await Promise.all([
    tags(),
    articles(token)(),
    articles(token)({ tag: params.get("tag") || "" }),
    isAuthenticated() ? feed(token)() : [],
  ]);

  return {
    ...tagsData,
    global: articlesData,
    feeds: feedData,
    tag: articleTagData,
  };
};

export default component$(() => {
  const data = useEndpoint();
  const nav = useNavigate();
  const params = new URL(nav.path, "http://localhost").searchParams;
  const tag = params.get("tag") || "";
  const store = useStore({
    currentTab: tag === "" ? "global" : "tag",
    tag: params.get("tag") || "",
  });
  useContextProvider(ArticleContext, store);

  return (
    <div class="home-page">
      <Hero />

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <FeedToggle />

            <Resource
              value={data}
              onPending={() => <div>Loading...</div>}
              onRejected={() => <div>Error</div>}
              onResolved={(data: any) =>
                data && (
                  <>
                    {data[store.currentTab].articles.map(
                      (article: ArticleType) => (
                        <Article article={article} key={article.slug} />
                      )
                    )}
                  </>
                )
              }
            />
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <Resource
                  value={data}
                  onPending={() => <div>Loading...</div>}
                  onRejected={() => <div>Error</div>}
                  onResolved={(data: any) =>
                    data && (
                      <>
                        {data.tags.map((tagName: string) => (
                          <a
                            preventdefault:click
                            onClick$={() => {
                              store.tag = tagName;
                              store.currentTab = "tag";
                              nav.path = `?tag=${tagName}`;
                            }}
                            href=""
                            class="tag-pill tag-default"
                            key={tagName}
                          >
                            {tagName}
                          </a>
                        ))}
                      </>
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
};

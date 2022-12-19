import { component$, Resource, useStore } from "@builder.io/qwik";
import {
  DocumentHead,
  RequestHandler,
  useEndpoint,
  Link,
  useNavigate,
} from "@builder.io/qwik-city";
import { getToken, isAuthenticated } from "~/auth/auth";
import { articles, feed, tags } from "~/services";
import { Article } from "~/types";

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

  return (
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                {isAuthenticated() && (
                  <li class="nav-item">
                    <a
                      class={`nav-link ${
                        store.currentTab === "feeds" ? "active" : "disabled"
                      }`}
                      preventdefault:click
                      onClick$={() => (store.currentTab = "feeds")}
                    >
                      Your Feed
                    </a>
                  </li>
                )}
                <li class="nav-item">
                  <a
                    class={`nav-link ${
                      store.currentTab === "global" ? "active" : "disabled"
                    }`}
                    preventdefault:click
                    onClick$={() => (store.currentTab = "global")}
                  >
                    Global Feed
                  </a>
                </li>
                {store.currentTab === "tag" && (
                  <li class="nav-item">
                    <a
                      class={`nav-link ${
                        store.currentTab === "tag" ? "active" : "disabled"
                      }`}
                      preventdefault:click
                      onClick$={() => (store.currentTab = "tag")}
                    >
                      {`#${store.tag}`}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <Resource
              value={data}
              onPending={() => <div>Loading...</div>}
              onRejected={() => <div>Error</div>}
              onResolved={(data: any) =>
                data && (
                  <>
                    {data[store.currentTab].articles.map((article: Article) => (
                      <div class="article-preview" key={article.slug}>
                        <div class="article-meta">
                          <Link href="profile.html">
                            <img src={article.author.image} />
                          </Link>
                          <div class="info">
                            <Link href="" class="author">
                              {article.author.username}
                            </Link>
                            <span class="date">{article.createdAt}</span>
                          </div>
                          <button class="btn btn-outline-primary btn-sm pull-xs-right">
                            <i class="ion-heart"></i> {article.favoritesCount}
                          </button>
                        </div>
                        <Link
                          href={`/article/${article.slug}`}
                          class="preview-link"
                        >
                          <h1>{article.title}</h1>
                          <p>{article.description}</p>
                          <span>Read more...</span>
                        </Link>
                      </div>
                    ))}
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

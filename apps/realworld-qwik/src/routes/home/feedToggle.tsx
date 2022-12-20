import { component$, useContext } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { isAuthenticated } from "~/auth/auth";
import { ArticleContext } from "..";

export default component$(() => {
  const nav = useNavigate();
  const store = useContext(ArticleContext);

  return (
    <div class="feed-toggle">
      <ul class="nav nav-pills outline-active">
        {isAuthenticated() && (
          <li class="nav-item">
            <a
              class={`nav-link ${
                store.currentTab === "feeds" ? "active" : "disabled"
              }`}
              preventdefault:click
              onClick$={() => {
                store.currentTab = "feeds";
                store.tag = "";
                nav.path = "/";
              }}
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
            onClick$={() => {
              store.currentTab = "global";
              store.tag = "";
              nav.path = "/";
            }}
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
  );
});

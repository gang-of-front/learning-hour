import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Article } from "~/types";

type Props = {
  article: Article;
};

export default component$(({ article }: Props) => (
  <div class="article-preview">
    <div class="article-meta">
      <Link href="profile.html">
        <img src={article.author?.image} />
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
    <Link href={`/article/${article.slug}`} class="preview-link">
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <span>Read more...</span>
    </Link>
  </div>
));

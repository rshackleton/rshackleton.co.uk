import { Link } from 'gatsby';
import React, { FC } from 'react';

interface IArticleListProps {
  items: IArticleListItem[];
}

interface IArticleListItem {
  id: string;
  codename: string;
  slug: string;
  summary: string;
  title: string;
}

const ArticleList: FC<IArticleListProps> = ({ items = [] }) => (
  <div>
    {items
      .filter(item => !isTestItem(item))
      .map(item => (
        <article key={item.id}>
          <h2>
            <Link to={`/articles/${item.slug}`}>{item.title}</Link>
          </h2>
          <p>{item.summary}</p>
        </article>
      ))}
  </div>
);

export default ArticleList;

/** Check if node is a test node and shouldn't be shown on the website. */
function isTestItem(item: IArticleListItem): boolean {
  return !!item.codename && item.codename.indexOf('test_') === 0;
}

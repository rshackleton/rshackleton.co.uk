import { Link } from 'gatsby';
import React, { FC } from 'react';

import { IArticleListProps } from './ArticleList.types';

const ArticleList: FC<IArticleListProps> = ({ items = [] }) => (
  <div>
    {items.map(item => (
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

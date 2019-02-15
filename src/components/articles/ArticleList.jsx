import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const ArticleList = ({ items }) => (
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

ArticleList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      codename: PropTypes.string,
      slug: PropTypes.string,
      summary: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
};

ArticleList.defaultProps = {
  items: [],
};

export default ArticleList;

/** Check if node is a test node and shouldn't be shown on the website. */
function isTestItem(item) {
  return item.codename && item.codename.indexOf('test_') === 0;
}

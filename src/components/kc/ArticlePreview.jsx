import PropTypes from 'prop-types';
import React from 'react';

const ArticlePreview = ({ title, slug, summary }) => (
  <a href={`/articles/${slug}`}>
    <h3>{title}</h3>
    <p>{summary}</p>
  </a>
);

ArticlePreview.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

export default ArticlePreview;

import PropTypes from 'prop-types';
import React from 'react';

import { Container, Summary, Title } from './ArticleSummary.styles';

const ArticleSummary = ({ slug, summary, title }) => (
  <Container to={`articles/${slug}`}>
    <Title>{title}</Title>
    <Summary>{summary}</Summary>
  </Container>
);

ArticleSummary.propTypes = {
  slug: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ArticleSummary;

import PropTypes from 'prop-types';
import React from 'react';

import { Container, Summary, Title } from './ContentPageSummary.styles';

const ContentPageSummary = ({ slug, summary, title }) => (
  <Container to={`/${slug}`}>
    <Title>{title}</Title>
    <Summary>{summary}</Summary>
  </Container>
);

ContentPageSummary.propTypes = {
  slug: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ContentPageSummary;

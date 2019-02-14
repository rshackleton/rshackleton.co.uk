import PropTypes from 'prop-types';
import React from 'react';

import { Container, Title } from './ContentPageSummary.styles';

const ContentPageSummary = ({ slug, title }) => (
  <Container to={`${slug}`}>
    <Title>{title}</Title>
  </Container>
);

ContentPageSummary.propTypes = {
  slug: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ContentPageSummary;

import PropTypes from 'prop-types';
import React from 'react';

import formatDate from '@utils/formatDate';

import { Container, Meta, Title } from './ArticleHeader.styles';

const ArticleHeader = ({ date, title }) => (
  <Container>
    <Title>{title}</Title>
    <Meta>{formatDate(date)}</Meta>
  </Container>
);

ArticleHeader.propTypes = {
  date: PropTypes.instanceOf(Date),
  title: PropTypes.string,
};

export default ArticleHeader;

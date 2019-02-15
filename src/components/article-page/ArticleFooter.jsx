import orderBy from 'lodash/orderBy';
import PropTypes from 'prop-types';
import React from 'react';

import { Container, Tag } from './ArticleFooter.styles';

const ArticleFooter = ({ tags }) => (
  <Container>
    {orderBy(tags, ['name'], ['asc']).map(tag => (
      <Tag key={tag.codename}>{tag.name}</Tag>
    ))}
  </Container>
);

ArticleFooter.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      codename: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
};

ArticleFooter.defaultProps = {
  tags: [],
};

export default ArticleFooter;

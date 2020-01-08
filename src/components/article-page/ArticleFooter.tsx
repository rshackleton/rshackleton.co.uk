import orderBy from 'lodash/orderBy';
import React, { FC } from 'react';

import { Container, Tag } from './ArticleFooter.styles';

interface ArticleFooterProps {
  tags?: KontentTaxonomyItem[];
}

const ArticleFooter: FC<ArticleFooterProps> = ({ tags = [] }) => (
  <Container>
    {orderBy(tags, ['name'], ['asc']).map(tag => (
      <Tag key={tag.codename}>{tag.name}</Tag>
    ))}
  </Container>
);

export default ArticleFooter;

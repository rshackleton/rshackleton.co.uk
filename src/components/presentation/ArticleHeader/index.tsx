import React, { FC } from 'react';

import formatDate from '@utils/formatDate';

import { Container, Meta, Title } from './ArticleHeader.styles';
import { IArticleHeaderProps } from './ArticleHeader.types';

const ArticleHeader: FC<IArticleHeaderProps> = ({ date, title }) => (
  <Container>
    <Title>{title}</Title>
    <Meta>{formatDate(date)}</Meta>
  </Container>
);

export default ArticleHeader;

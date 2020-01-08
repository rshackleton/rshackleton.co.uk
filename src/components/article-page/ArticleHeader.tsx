import React, { FC } from 'react';

import formatDate from '@utils/formatDate';

import { Container, Meta, Title } from './ArticleHeader.styles';

interface ArticleHeaderProps {
  date: Date;
  title: string;
}

const ArticleHeader: FC<ArticleHeaderProps> = ({ date, title }) => (
  <Container>
    <Title>{title}</Title>
    <Meta>{formatDate(date)}</Meta>
  </Container>
);

export default ArticleHeader;

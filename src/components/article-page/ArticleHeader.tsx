import formatDate from '@utils/formatDate';
import React, { FC } from 'react';
import { Container, Meta, Title } from './ArticleHeader.styles';

interface IArticleHeaderProps {
  date: Date;
  title: string;
}

const ArticleHeader: FC<IArticleHeaderProps> = ({ date, title }) => (
  <Container>
    <Title>{title}</Title>
    <Meta>{formatDate(date)}</Meta>
  </Container>
);

export default ArticleHeader;

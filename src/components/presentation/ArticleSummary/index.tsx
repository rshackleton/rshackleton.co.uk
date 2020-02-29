import React, { FC } from 'react';

import { Container, Summary, Title } from './ArticleSummary.styles';
import { IArticleSummaryProps } from './ArticleSummary.types';

const ArticleSummary: FC<IArticleSummaryProps> = ({ slug, summary, title }) => (
  <Container to={`/articles/${slug}`}>
    <Title>{title}</Title>
    <Summary>{summary}</Summary>
  </Container>
);

export default ArticleSummary;

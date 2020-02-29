import React, { FC } from 'react';

import { Container, Summary, Title } from './ContentPageSummary.styles';
import { IContentPageSummaryProps } from './ContentPageSummary.types';

const ContentPageSummary: FC<IContentPageSummaryProps> = ({ slug, summary, title }) => (
  <Container to={`/${slug}`}>
    <Title>{title}</Title>
    <Summary>{summary}</Summary>
  </Container>
);

export default ContentPageSummary;

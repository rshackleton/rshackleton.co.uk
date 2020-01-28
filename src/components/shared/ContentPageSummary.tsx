import React, { FC } from 'react';
import { Container, Summary, Title } from './ContentPageSummary.styles';

interface IContentPageSummaryProps {
  slug: string;
  summary: string;
  title: string;
}

const ContentPageSummary: FC<IContentPageSummaryProps> = ({
  slug,
  summary,
  title,
}) => (
  <Container to={`/${slug}`}>
    <Title>{title}</Title>
    <Summary>{summary}</Summary>
  </Container>
);

export default ContentPageSummary;

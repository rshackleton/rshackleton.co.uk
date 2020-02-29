import { graphql } from 'gatsby';
import React, { FC } from 'react';

import ContentPageSummary from '@components/presentation/ContentPageSummary';

import { IContentPageProps } from './ContentPage.types';

const ContentPageComponent: FC<IContentPageProps> = ({ linkedItem }) => {
  const props = {
    slug: linkedItem.elements.slug.value || '',
    summary: linkedItem.elements.summary.value || '',
    title: linkedItem.elements.title.value || '',
  };

  return <ContentPageSummary {...props} />;
};

export default ContentPageComponent;

export const KontentItemContentPageFragment = graphql`
  fragment KontentItemContentPageFragment on KontentItemContentPage {
    system {
      codename
      type
    }
    elements {
      title {
        value
      }
      slug {
        value
      }
      summary {
        value
      }
    }
  }
`;

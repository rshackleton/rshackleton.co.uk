import { ContentPage } from 'index';

import { graphql } from 'gatsby';
import React, { FC } from 'react';

import ContentPageSummary from '@components/shared/ContentPageSummary';

interface ContentPageProps {
  linkedItem: ContentPage;
}

const ContentPageComponent: FC<ContentPageProps> = ({ linkedItem }) => {
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

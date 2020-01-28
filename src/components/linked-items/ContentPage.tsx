import ContentPageSummary from '@components/shared/ContentPageSummary';
import { graphql } from 'gatsby';
import { IContentPage } from 'index';
import React, { FC } from 'react';

interface IContentPageProps {
  linkedItem: IContentPage;
}

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

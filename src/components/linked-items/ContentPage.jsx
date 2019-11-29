import { graphql } from 'gatsby';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';

import ContentPageSummary from '@components/shared/ContentPageSummary';

const ContentPage = ({ linkedItem }) => {
  const props = {
    slug: get(linkedItem, 'elements.slug.value'),
    summary: get(linkedItem, 'elements.summary.value'),
    title: get(linkedItem, 'elements.title.value'),
  };

  return <ContentPageSummary {...props} />;
};

ContentPage.propTypes = {
  linkedItem: PropTypes.object.isRequired,
};

export default ContentPage;

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

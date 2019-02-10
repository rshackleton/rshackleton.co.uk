import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

import { rhythm } from '@utils/typography';

const Container = styled.div`
  display: block;
  max-width: ${({ theme }) => theme.container.base};
  margin: 0 auto;
  padding: 0 ${rhythm(1)};
`;

const SiteWide = ({ children, ...otherProps }) => (
  <Container {...otherProps}>{children}</Container>
);

SiteWide.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SiteWide;

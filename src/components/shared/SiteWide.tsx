import PropTypes from 'prop-types';
import React, { ReactNode, FC } from 'react';

import styled from '@utils/styled';
import { rhythm } from '@utils/typography';

const Container = styled.div`
  display: block;
  max-width: ${({ theme }) =>
    theme && theme.container ? theme.container.base : ''};
  margin: 0 auto;
  padding: 0 ${rhythm(1)};
`;

interface SiteWideProps {
  children: ReactNode;
}

const SiteWide: FC<SiteWideProps> = ({ children, ...otherProps }) => (
  <Container {...otherProps}>{children}</Container>
);

SiteWide.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SiteWide;

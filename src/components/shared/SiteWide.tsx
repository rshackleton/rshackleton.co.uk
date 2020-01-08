import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React, { ReactNode, FC } from 'react';

import { rhythm } from '@utils/typography';
import { Theme } from '@utils/theme';

const Container = styled.div`
  display: block;
  max-width: ${({ theme }: { theme: Partial<Theme> }) =>
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

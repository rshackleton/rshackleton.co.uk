import styled from '@utils/styled';
import { rhythm } from '@utils/typography';
import PropTypes from 'prop-types';
import React, { FC, ReactNode } from 'react';

const Container = styled.div`
  display: block;
  max-width: ${({ theme }) =>
    theme && theme.container ? theme.container.base : ''};
  margin: 0 auto;
  padding: 0 ${rhythm(1)};
`;

interface ISiteWideProps {
  children: ReactNode;
}

const SiteWide: FC<ISiteWideProps> = ({ children, ...otherProps }) => (
  <Container {...otherProps}>{children}</Container>
);

SiteWide.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SiteWide;

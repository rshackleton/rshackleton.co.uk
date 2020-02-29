import PropTypes from 'prop-types';
import React, { FC } from 'react';

import { Container } from './SiteWide.styles';
import { ISiteWideProps } from './SiteWide.types';

const SiteWide: FC<ISiteWideProps> = ({ children, ...otherProps }) => <Container {...otherProps}>{children}</Container>;

SiteWide.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SiteWide;

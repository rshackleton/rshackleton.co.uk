import React, { FC } from 'react';

import { ContentWrapper } from './Default.styles';
import { ILayoutProps } from './Default.types';

const Layout: FC<ILayoutProps> = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default Layout;

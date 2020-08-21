import React, { FC } from 'react';

import { ContentWrapper } from './Default.styles';
import { ILayoutProps } from './Default.types';

const Layout: FC<ILayoutProps> = ({ contentItemId, children }) => {
  return <ContentWrapper data-kontent-item-id={contentItemId}>{children}</ContentWrapper>;
};

export default Layout;

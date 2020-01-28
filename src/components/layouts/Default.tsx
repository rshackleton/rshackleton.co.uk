import React, { FC, ReactNode } from 'react';
import { ContentWrapper } from './Default.styles';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default Layout;

import theme from '@utils/theme';
import { ThemeProvider } from 'emotion-theming';
import React, { FC, ReactNode } from 'react';

interface IThemeWrapperProps {
  children: ReactNode;
}

const ThemeWrapper: FC<IThemeWrapperProps> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default ThemeWrapper;

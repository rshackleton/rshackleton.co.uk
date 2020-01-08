import { ThemeProvider } from 'emotion-theming';
import React, { ReactNode, FC } from 'react';

import theme from '@utils/theme';

interface ThemeWrapperProps {
  children: ReactNode;
}

const ThemeWrapper: FC<ThemeWrapperProps> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default ThemeWrapper;

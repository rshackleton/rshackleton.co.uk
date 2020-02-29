import { ThemeProvider } from 'emotion-theming';
import React, { FC } from 'react';

import theme from '@utils/theme';

import { IThemeWrapperProps } from './ThemeWrapper.types';

const ThemeWrapper: FC<IThemeWrapperProps> = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default ThemeWrapper;

import { ThemeProvider } from 'emotion-theming';
import PropTypes from 'prop-types';
import React from 'react';

import theme from '@utils/theme';

const ThemeWrapper = ({ children, themeName }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

ThemeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  themeName: PropTypes.string,
};

ThemeWrapper.defaultProps = {
  themeName: 'default',
};

export default ThemeWrapper;

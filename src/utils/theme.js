import { rgba } from 'polished';

const brand = {
  primary: '#466841',
  secondary: '#9ef8ef',
};

const fonts = {
  headerFontFamily: '"Raleway", sans-serif',
  bodyFontFamily: '"Roboto Slab", serif',
};

const theme = {
  brand,
  breakpoints: {
    xs: 320,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
  colors: {
    body: rgba('#000000', 0.8),
    link: brand.primary,
    linkHover: brand.primary,
    insetBackground: '#fefefe',
    siteBackground: '#fefefe',
  },
  container: {
    base: '80rem',
    text: '50rem',
  },
  dimensions: {
    banner: 18,
    header: 2,
    footer: 2,
  },
  fonts,
  layers: {
    root: -1,
    base: 1,
    content: 10,
    overlay: 100,
    priority: 1000,
  },
};

export default theme;

const brand = {
  primary: '#466841',
  secondary: '#9ef8ef',
};

const fonts = {
  headerFontFamily: '"Droid Sans", sans-serif',
  bodyFontFamily: '"Droid Serif", serif',
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
    body: '#d3d3d3',
    link: brand.primary,
    linkHover: brand.primary,
    insetBackground: '#fefefe',
    siteBackground: '#0d0d0d',
  },
  container: {
    base: '60rem',
    text: '50rem',
  },
  dimensions: {
    header: 2,
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
